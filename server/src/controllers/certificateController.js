import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import QuizSubmission from "../models/QuizSubmission.js";
import { createHttpError } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import crypto from "crypto";
import PDFDocument from "pdfkit";

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
    console.error("Error calculating grade:", error);
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
      console.error("User or course not found for certificate generation");
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
    console.error("Error generating certificate:", error);
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
    next(err);
  }
};

// GET /api/certificates/:id/download
export const downloadCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = await Certificate.findById(id)
      .populate("courseId")
      .populate("userId");

    if (!cert) return next(createHttpError(404, "Certificate not found"));

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margins: { top: 100, bottom: 100, left: 100, right: 100 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificate-${cert.certificateId}.pdf"`
    );
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Logos paths
    const logoPath =
      "/home/soc-pc2/Downloads/purple-dashboard-main/client_fixed/public/soc_logo.png";
    const isfcrLogoPath =
      "/home/soc-pc2/Downloads/purple-dashboard-main/client_fixed/public/c_isfcr_logo-removebg-preview.png";
    const pesuLogoPath =
      "/home/soc-pc2/Downloads/purple-dashboard-main/client_fixed/public/logo.png"; // top-right small logo
    const watermarkPath =
      "/home/soc-pc2/Downloads/purple-dashboard-main/client_fixed/public/logo.png"; // watermark

    // ================= TOP-LEFT & TOP-RIGHT LOGOS =================
    try {
      doc.image(logoPath, 30, 30, { width: 100 });
      const topRightWidth = 100;
      const topRightSpacing = 20;
      const topRightX = pageWidth - 30 - topRightWidth;
      doc.image(isfcrLogoPath, topRightX, 30, { width: topRightWidth });
      doc.image(
        pesuLogoPath,
        topRightX - topRightWidth - topRightSpacing,
        30,
        { width: topRightWidth }
      );
    } catch (error) {
      console.error("Error loading logos:", error);
    }

    // ================= WATERMARK =================
    try {
      doc.save();
      doc.opacity(0.15);
      const wmWidth = pageWidth * 0.55;
      const wmX = (pageWidth - wmWidth) / 2;
      const wmY = (pageHeight - wmWidth) / 2;
      doc.image(watermarkPath, wmX, wmY, { width: wmWidth });
      doc.restore();
    } catch (error) {
      console.error("Error loading watermark:", error);
    }

    // ================= CERTIFICATE CONTENT =================
    doc
      .fontSize(36)
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF COMPLETION", 0, 150, {
        align: "center",
        width: pageWidth,
      });
    doc.moveTo(150, 220).lineTo(pageWidth - 150, 220).stroke();

    doc
      .fontSize(18)
      .font("Helvetica")
      .text("This is to certify that", 0, 280, { align: "center", width: pageWidth });
    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(cert.userId.name || "Unknown User", 0, 330, {
        align: "center",
        width: pageWidth,
      });
    doc
      .fontSize(18)
      .font("Helvetica")
      .text("has completed the course", 0, 380, { align: "center", width: pageWidth });
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(cert.courseId.title || "Unknown Course", 0, 420, {
        align: "center",
        width: pageWidth,
      });

    if (cert.grade && cert.grade !== "NA") {
      doc
        .fontSize(18)
        .font("Helvetica")
        .text(`and attained grade ${cert.grade}`, 0, 450, {
          align: "center",
          width: pageWidth,
        });
    }

// ================= ADMIN SIGNATURE =================
const adminName = cert.courseId.instructor || "Unknown Admin";
const adminDesignation = "Course Instructor";
doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .text("Course Instructor", pageWidth - 250, 470, { align: "right" });

// Certificate ID
doc
  .fontSize(12)
  .font("Helvetica")
  .text(`Certificate ID: ${cert.certificateId}`, 50, 460, { align: "left" });

// Issued Date
doc
  .fontSize(12)
  .text(
    `Issued on: ${new Date(cert.issuedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    0, 480,
    { align: "center", width: pageWidth }
  );

    // ================= END FOOTER & ADMIN =================
    doc.end();
  } catch (err) {
    next(err);
  }
};

// GET /api/certificates/count
export const getCertificateCount = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const count = await Certificate.countDocuments({ userId });
    sendResponse(res, 200, "Certificate count fetched", { count });
  } catch (err) {
    next(err);
  }
};
