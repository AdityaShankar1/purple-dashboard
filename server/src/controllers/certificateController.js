import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import QuizSubmission from "../models/QuizSubmission.js";
import { createHttpError } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import path from "path";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import { logger } from "../config/logger.js";

const generateCertificateId = () => {
  return `CERT-${Date.now()}-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;
};

// Calculate grade from quiz submissions
const calculateGrade = async (userId, courseId) => {
  try {
    const quizSubmissions = await QuizSubmission.find({
      userId,
      courseId,
      submitted: true,
    });
    if (quizSubmissions.length === 0) {
      return "NA";
    }
    let totalPercentage = 0;
    let validSubmissions = 0;
    for (const submission of quizSubmissions) {
      if (submission.totalPoints && submission.totalPoints > 0) {
        const percentage = (submission.score / submission.totalPoints) * 100;
        totalPercentage += percentage;
        validSubmissions++;
      }
    }
    if (validSubmissions === 0) {
      return "NA";
    }
    const averagePercentage = totalPercentage / validSubmissions;
    if (averagePercentage >= 90) return "S";
    if (averagePercentage >= 80) return "A";
    if (averagePercentage >= 70) return "B";
    if (averagePercentage >= 60) return "C";
    if (averagePercentage >= 50) return "D";
    if (averagePercentage >= 40) return "E";
    return "F";
  } catch (error) {
    logger.error(`Error calculating grade: ${error.message}`);
    return "NA";
  }
};

// Generate certificate
export const generateCertificate = async (userId, courseId) => {
  try {
    const existingCert = await Certificate.findOne({ userId, courseId });
    if (existingCert) return existingCert;

    const [user, course, grade] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId),
      calculateGrade(userId, courseId),
    ]);

    if (!user || !course) {
      logger.error(`User or course not found for certificate generation: user=${userId}, course=${courseId}`);
      return null;
    }

    const certificateId = generateCertificateId();
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 2);

    const certificate = new Certificate({
      userId,
      courseId,
      certificateId,
      issuedDate: new Date(),
      validUntil,
      grade,
      score: 100,
      isVerified: true,
      shareToken: crypto.randomBytes(32).toString("hex"),
    });

    await certificate.save();
    return certificate;
  } catch (error) {
    logger.error(`Error generating certificate: ${error.message}`);
    throw error;
  }
};

// GET /api/certificates/user
export const getUserCertificates = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const certs = await Certificate.find({ userId }).populate("courseId");
    const formattedCerts = certs.map((c) => ({
      ...c.toObject(),
      course: c.courseId,
    }));
    sendResponse(res, 200, "Certificates fetched", formattedCerts);
  } catch (err) {
    logger.error(`Failed to fetch user certificates: ${err.message}`);
    next(err);
  }
};

// GET /api/certificates/:id/download
export const downloadCertificate = async (req, res, next) => {
  let doc;
  try {
    const { id } = req.params;
    const cert = await Certificate.findById(id)
      .populate("courseId")
      .populate("userId");

    if (!cert) return next(createHttpError(404, "Certificate not found"));

    doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margins: { top: 100, bottom: 100, left: 100, right: 100 },
    });

    // Handle doc errors
    doc.on('error', (err) => {
      logger.error(`PDF generation error: ${err.message}`);
      if (!res.headersSent) {
        next(err);
      }
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificate-${cert.certificateId}.pdf"`
    );
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    const basePath = process.env.PUBLIC_ASSETS_PATH || path.join(process.cwd(), "..", "client_fixed", "public");

    const colors = {
      purple: "#3F2A8D",
      blue: "#0080FE",
      red: "#FF2829",
      title: "#3F2A8D",
      text: "#2D2926",
      muted: "#555555"
    };

    // Frame
    const outerPadding = 18;
    const innerPadding = 24;
    doc.lineWidth(2.5).strokeColor(colors.purple)
      .rect(outerPadding, outerPadding, pageWidth - (outerPadding * 2), pageHeight - (outerPadding * 2))
      .stroke();
    doc.lineWidth(1.0).strokeColor(colors.blue)
      .rect(innerPadding, innerPadding, pageWidth - (innerPadding * 2), pageHeight - (innerPadding * 2))
      .stroke();

    // Logos
    const logoY = 45;
    const logoWidth = 75;
    const centerLogoWidth = 85;

    const tryAddImage = (imgRotatePath, x, y, options) => {
      if (fs.existsSync(imgRotatePath)) {
        try {
          doc.image(imgRotatePath, x, y, options);
        } catch (e) {
          logger.warn(`Failed to render image ${imgRotatePath}: ${e.message}`);
        }
      } else {
        logger.warn(`Image not found: ${imgRotatePath}`);
      }
    };

    tryAddImage(`${basePath}/soc_logo.png`, 65, logoY, { width: logoWidth });
    tryAddImage(`${basePath}/c_isfcr_logo-removebg-preview.png`, (pageWidth - centerLogoWidth) / 2, logoY - 5, { width: centerLogoWidth });
    tryAddImage(`${basePath}/logo.png`, pageWidth - 65 - logoWidth, logoY, { width: logoWidth });

    // Watermark
    doc.save();
    doc.opacity(0.06);
    const wmWidth = pageWidth * 0.45;
    tryAddImage(`${basePath}/logoPesu.png`, (pageWidth - wmWidth) / 2, (pageHeight - wmWidth) / 2, { width: wmWidth });
    doc.restore();

    // Content
    doc.opacity(1.0).fillColor(colors.text);
    doc.fontSize(38).font("Helvetica-Bold").fillColor(colors.title).text("CERTIFICATE OF COMPLETION", 0, 145, { align: "center", width: pageWidth });
    doc.strokeColor(colors.title).lineWidth(2).moveTo(150, 205).lineTo(pageWidth - 150, 205).stroke();

    doc.fontSize(20).font("Helvetica").fillColor(colors.muted).text("This is to certify that", 0, 255, { align: "center", width: pageWidth });
    doc.fontSize(32).font("Helvetica-Bold").fillColor(colors.text).text(cert.userId?.name || "Unknown User", 0, 290, { align: "center", width: pageWidth });

    doc.fontSize(20).font("Helvetica").fillColor(colors.muted).text("has successfully completed the course", 0, 340, { align: "center", width: pageWidth });
    doc.fontSize(26).font("Helvetica-Bold").fillColor(colors.text).text(cert.courseId?.title || "Unknown Course", 0, 375, { align: "center", width: pageWidth });

    if (cert.grade && cert.grade !== "NA") {
      doc.fontSize(20).font("Helvetica").fillColor(colors.muted).text(`and attained grade ${cert.grade}`, 0, 415, { align: "center", width: pageWidth });
    }

    doc.fontSize(12).font("Helvetica-Bold").fillColor(colors.text).text("Course Instructor", pageWidth - 250, 450, { align: "right" });
    const idColor = (cert.grade && cert.grade !== "NA") ? colors.muted : colors.red;
    doc.fontSize(12).font("Helvetica").fillColor(idColor).text(`Certificate ID: ${cert.certificateId}`, 50, 450, { align: "left" });

    doc.fontSize(12).fillColor(colors.muted).text(`Issued on: ${new Date(cert.issuedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 0, 475, { align: "center", width: pageWidth });

    doc.end();
  } catch (err) {
    logger.error(`downloadCertificate error: ${err.message}`);
    if (doc) {
      try { doc.end(); } catch (e) { }
    }
    if (!res.headersSent) {
      next(err);
    }
  }
};

// GET /api/certificates/count
export const getCertificateCount = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const count = await Certificate.countDocuments({ userId });
    sendResponse(res, 200, "Certificate count fetched", { count });
  } catch (err) {
    logger.error(`Failed to fetch certificate count: ${err.message}`);
    next(err);
  }
};
