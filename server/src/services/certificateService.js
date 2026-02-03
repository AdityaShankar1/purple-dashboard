import Certificate from "../models/Certificate.js"
import Course from "../models/Course.js"
import User from "../models/User.js"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"

export const generateCertificate = async (userId, courseId, enrollmentId) => {
  try {
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      user: userId,
      course: courseId,
      enrollment: enrollmentId,
    })

    if (existingCertificate) {
      return existingCertificate
    }

    // Get course and user details
    const course = await Course.findById(courseId).populate("instructor", "name")
    const user = await User.findById(userId)

    if (!course || !user) {
      throw new Error("Course or user not found")
    }

    // Create certificate
    const certificate = await Certificate.create({
      user: userId,
      course: courseId,
      enrollment: enrollmentId,
      grade: "Pass", // Default grade, can be calculated based on performance
    })

    // Generate PDF certificate
    const pdfBuffer = await generateCertificatePDF(certificate, user, course)

    // Save PDF to file system (in production, you'd use cloud storage)
    const certificatesDir = path.join(process.cwd(), "certificates")
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true })
    }

    const filename = `certificate-${certificate.certificateId}.pdf`
    const filepath = path.join(certificatesDir, filename)
    fs.writeFileSync(filepath, pdfBuffer)

    certificate.certificateUrl = `/certificates/${filename}`
    await certificate.save()

    return certificate
  } catch (error) {
    throw error
  }
}

// Function to generate PDF certificate
export const generateCertificatePDF = async (certificate, user, course) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      })

      const chunks = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))

      // Certificate background
      doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f8f9fa")

      // Border
      doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke("#7c3aed", 3)

      // Inner border
      doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80).stroke("#a855f7", 1)

      // Header
      doc
        .fontSize(36)
        .fillColor("#7c3aed")
        .font("Helvetica-Bold")
        .text("CERTIFICATE OF COMPLETION", 0, 100, { align: "center" })

      // Decorative line
      doc
        .moveTo(200, 150)
        .lineTo(doc.page.width - 200, 150)
        .stroke("#a855f7", 2)

      // Main text
      doc
        .fontSize(18)
        .fillColor("#374151")
        .font("Helvetica")
        .text("This is to certify that", 0, 200, { align: "center" })

      // Student name
      doc.fontSize(32).fillColor("#1f2937").font("Helvetica-Bold").text(user.name, 0, 240, { align: "center" })

      // Course completion text
      doc
        .fontSize(18)
        .fillColor("#374151")
        .font("Helvetica")
        .text("has successfully completed the course", 0, 300, { align: "center" })

      // Course name
      doc.fontSize(24).fillColor("#7c3aed").font("Helvetica-Bold").text(course.title, 0, 340, { align: "center" })

      // Course details
      doc
        .fontSize(14)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text(`Duration: ${course.duration} hours | Difficulty: ${course.difficulty}`, 0, 380, { align: "center" })

      // Bottom section
      const bottomY = doc.page.height - 150

      // Date
      doc.fontSize(12).fillColor("#374151").font("Helvetica").text("Date of Completion", 100, bottomY)

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(new Date(certificate.issuedAt).toLocaleDateString(), 100, bottomY + 20)

      // Certificate ID
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Certificate ID", doc.page.width / 2 - 50, bottomY, { align: "center" })

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(certificate.certificateId, doc.page.width / 2 - 100, bottomY + 20, {
          align: "center",
          width: 200,
        })

      // Instructor signature
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Instructor", doc.page.width - 200, bottomY)

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(course.instructor?.name || "LMS Platform", doc.page.width - 200, bottomY + 20)

      // Grade
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Grade", doc.page.width - 200, bottomY + 50)

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor("#059669")
        .text(certificate.grade, doc.page.width - 200, bottomY + 70)

      // Verification URL
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text(`Verify at: ${process.env.CLIENT_URL}/verify/${certificate.certificateId}`, 0, doc.page.height - 40, {
          align: "center",
        })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// Function to verify certificate
export const verifyCertificateById = async (certificateId) => {
  try {
    const certificate = await Certificate.findOne({ certificateId })
      .populate("user", "name")
      .populate("course", "title instructor")
      .populate("enrollment", "completedAt")

    if (!certificate || !certificate.isVerified) {
      return null
    }

    return {
      isValid: true,
      certificate: {
        id: certificate.certificateId,
        studentName: certificate.user.name,
        courseName: certificate.course.title,
        completedAt: certificate.enrollment.completedAt,
        issuedAt: certificate.issuedAt,
        grade: certificate.grade,
        validUntil: certificate.validUntil,
      },
    }
  } catch (error) {
    throw error
  }
}
