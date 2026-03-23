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

    // Logos paths (Absolute paths on this Mac)
    const basePath = "/Users/adityashankar/purpledash/purple-dashboard/client_fixed/public";
    const socLogoPath = `${basePath}/soc_logo.png`;
    const isfcrLogoPath = `${basePath}/c_isfcr_logo-removebg-preview.png`;
    const pesuLogoPath = `${basePath}/logo.png`;
    const watermarkPath = `${basePath}/logoPesu.png`;
    // ================= REFINED SOC FRAME (P-B) =================
    const outerPadding = 18;
    const innerPadding = 24;
    const outerLineWidth = 2.5;
    const innerLineWidth = 1.0;

    const colors = {
      purple: "#3F2A8D", // Deep Purple for frame
      blue: "#0080FE",   // SOC Blue
      red: "#FF2829",    // SOC Red (Highlight)
      title: "#3F2A8D",
      text: "#2D2926",
      muted: "#555555"
    };

    // 1. Outer Purple Line (Thicker & Farther)
    doc.lineWidth(outerLineWidth).strokeColor(colors.purple)
      .rect(outerPadding, outerPadding, pageWidth - (outerPadding * 2), pageHeight - (outerPadding * 2))
      .stroke();

    // 2. Inner Blue Line (Thinner & Closer)
    doc.lineWidth(innerLineWidth).strokeColor(colors.blue)
      .rect(innerPadding, innerPadding, pageWidth - (innerPadding * 2), pageHeight - (innerPadding * 2))
      .stroke();

    // ================= TOP LOGOS =================
    try {
      const logoY = 45; 
      const logoWidth = 75;

      // 1. SOC Logo (Left)
      doc.image(socLogoPath, 65, logoY, { width: logoWidth });

      // 2. ISFCR Logo (Center)
      const centerLogoWidth = 85;
      doc.image(isfcrLogoPath, (pageWidth - centerLogoWidth) / 2, logoY - 5, { width: centerLogoWidth });

      // 3. PESU Logo (Right)
      doc.image(pesuLogoPath, pageWidth - 65 - logoWidth, logoY, { width: logoWidth });
    } catch (error) {
      console.error("Error loading logos:", error);
    }

    // ================= WATERMARK =================
    try {
      doc.save();
      doc.opacity(0.06); // Extremely subtle
      const wmWidth = pageWidth * 0.45;
      const wmX = (pageWidth - wmWidth) / 2;
      const wmY = (pageHeight - wmWidth) / 2;
      doc.image(watermarkPath, wmX, wmY, { width: wmWidth });
      doc.restore();
    } catch (error) {
      console.error("Error loading watermark:", error);
    }

    // ================= CERTIFICATE CONTENT =================
    doc.opacity(1.0).fillColor(colors.text); 

    doc
      .fontSize(40)
      .font("Helvetica-Bold")
      .fillColor(colors.title)
      .text("CERTIFICATE OF COMPLETION", 0, 160, {
        align: "center",
        width: pageWidth,
      });
    
    doc.strokeColor(colors.title).lineWidth(2).moveTo(150, 225).lineTo(pageWidth - 150, 225).stroke();

    doc
      .fontSize(20)
      .font("Helvetica")
      .fillColor(colors.muted)
      .text("This is to certify that", 0, 280, { align: "center", width: pageWidth });
    
    doc
      .fontSize(32)
      .font("Helvetica-Bold")
      .fillColor(colors.text)
      .text(cert.userId.name || "Unknown User", 0, 320, {
        align: "center",
        width: pageWidth,
      });
    
    doc
      .fontSize(20)
      .font("Helvetica")
      .fillColor(colors.muted)
      .text("has successfully completed the course", 0, 370, { align: "center", width: pageWidth });
    
    doc
      .fontSize(26)
      .font("Helvetica-Bold")
      .fillColor(colors.text)
      .text(cert.courseId.title || "Unknown Course", 0, 410, {
        align: "center",
        width: pageWidth,
      });

    // RED HIGHLIGHT (GRADE)
    if (cert.grade && cert.grade !== "NA") {
      doc
        .fontSize(20)
        .font("Helvetica")
        .fillColor(colors.muted)
        .text("and attained grade ", 0, 450, {
          align: "center",
          width: pageWidth,
          continued: true
        })
        .fillColor(colors.red)
        .font("Helvetica-Bold")
        .text(cert.grade);
    }

    // ================= ADMIN SIGNATURE =================
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor(colors.text)
      .text("Course Instructor", pageWidth - 250, 470, { align: "right" });

    // Certificate ID (RED Highlight if Grade is NA, otherwise Muted)
    const idColor = (cert.grade && cert.grade !== "NA") ? colors.muted : colors.red;
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor(idColor)
      .text(`Certificate ID: ${cert.certificateId}`, 50, 470, { align: "left" });

    // Issued Date
    doc
      .fontSize(12)
      .fillColor(colors.muted)
      .text(
        `Issued on: ${new Date(cert.issuedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        0, 490,
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
