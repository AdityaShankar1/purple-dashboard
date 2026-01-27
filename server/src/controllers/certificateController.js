// // // // // import Certificate from "../models/Certificate.js"
// // // // // import { createHttpError } from "../utils/errors.js"
// // // // // import { sendResponse } from "../utils/response.js"

// // // // // // Get user certificates
// // // // // export const getUserCertificates = async (req, res, next) => {
// // // // //   try {
// // // // //     const certificates = await Certificate.find({ user: req.user.id })
// // // // //       .populate("course", "title description category instructor")
// // // // //       .populate("enrollment", "completedAt")
// // // // //       .sort({ issuedAt: -1 })

// // // // //     sendResponse(res, 200, "Certificates fetched successfully", certificates)
// // // // //   } catch (error) {
// // // // //     next(error)
// // // // //   }
// // // // // }

// // // // // // Get single certificate
// // // // // export const getCertificate = async (req, res, next) => {
// // // // //   try {
// // // // //     const certificate = await Certificate.findOne({
// // // // //       _id: req.params.id,
// // // // //       user: req.user.id,
// // // // //     }).populate([
// // // // //       { path: "course", populate: { path: "instructor", select: "name" } },
// // // // //       { path: "user", select: "name email" },
// // // // //       { path: "enrollment", select: "completedAt" },
// // // // //     ])

// // // // //     if (!certificate) {
// // // // //       return next(createHttpError(404, "Certificate not found"))
// // // // //     }

// // // // //     sendResponse(res, 200, "Certificate fetched successfully", certificate)
// // // // //   } catch (error) {
// // // // //     next(error)
// // // // //   }
// // // // // }

// // // // // // Verify certificate (public endpoint)
// // // // // export const verifyCertificate = async (req, res, next) => {
// // // // //   try {
// // // // //     const { certificateId } = req.params

// // // // //     const certificate = await Certificate.findOne({ certificateId })
// // // // //       .populate("user", "name")
// // // // //       .populate("course", "title instructor")
// // // // //       .populate("enrollment", "completedAt")

// // // // //     if (!certificate) {
// // // // //       return next(createHttpError(404, "Certificate not found"))
// // // // //     }

// // // // //     if (!certificate.isVerified) {
// // // // //       return next(createHttpError(400, "Certificate is not verified"))
// // // // //     }

// // // // //     sendResponse(res, 200, "Certificate verified successfully", {
// // // // //       isValid: true,
// // // // //       certificate: {
// // // // //         id: certificate.certificateId,
// // // // //         studentName: certificate.user.name,
// // // // //         courseName: certificate.course.title,
// // // // //         completedAt: certificate.enrollment.completedAt,
// // // // //         issuedAt: certificate.issuedAt,
// // // // //         grade: certificate.grade,
// // // // //       },
// // // // //     })
// // // // //   } catch (error) {
// // // // //     next(error)
// // // // //   }
// // // // // }

// // // // // // Download certificate
// // // // // export const downloadCertificate = async (req, res, next) => {
// // // // //   try {
// // // // //     const certificate = await Certificate.findOne({
// // // // //       _id: req.params.id,
// // // // //       user: req.user.id,
// // // // //     }).populate([
// // // // //       { path: "course", populate: { path: "instructor", select: "name" } },
// // // // //       { path: "user", select: "name email" },
// // // // //     ])

// // // // //     if (!certificate) {
// // // // //       return next(createHttpError(404, "Certificate not found"))
// // // // //     }

// // // // //     // Here you would generate and return the PDF certificate
// // // // //     // For now, we'll return the certificate data
// // // // //     sendResponse(res, 200, "Certificate ready for download", certificate)
// // // // //   } catch (error) {
// // // // //     next(error)
// // // // //   }
// // // // // }





// // // // /////above is working code ///// 16/10/25 Below is new claude code




// // // // // ============================================
// // // // // server/src/controllers/certificateController.js
// // // // import Certificate from "../models/Certificate.js";
// // // // import Course from "../models/Course.js";
// // // // import User from "../models/User.js";
// // // // import Enrollment from "../models/Enrollment.js";
// // // // import { createHttpError } from "../utils/errors.js";
// // // // import { successResponse } from "../utils/response.js";
// // // // import notificationService from "../services/notificationService.js";
// // // // import { createCanvas, loadImage } from "canvas";

// // // // // Generate certificate (called automatically on course completion)
// // // // export async function generateCertificate(userId, courseId) {
// // // //   try {
// // // //     const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // //     if (existing) return existing;

// // // //     const user = await User.findById(userId).select("name email");
// // // //     const course = await Course.findById(courseId).select("title instructor");

// // // //     if (!user || !course) {
// // // //       throw new Error("User or course not found");
// // // //     }

// // // //     // Generate unique certificate ID
// // // //     const certificateId = `CERT-${Date.now()}-${userId.toString().slice(-6).toUpperCase()}`;

// // // //     // Create certificate image
// // // //     const canvas = createCanvas(1200, 800);
// // // //     const ctx = canvas.getContext("2d");

// // // //     // Background gradient
// // // //     const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
// // // //     gradient.addColorStop(0, "#667eea");
// // // //     gradient.addColorStop(1, "#764ba2");
// // // //     ctx.fillStyle = gradient;
// // // //     ctx.fillRect(0, 0, 1200, 800);

// // // //     // Border
// // // //     ctx.strokeStyle = "#ffffff";
// // // //     ctx.lineWidth = 10;
// // // //     ctx.strokeRect(40, 40, 1120, 720);

// // // //     // Inner border
// // // //     ctx.lineWidth = 2;
// // // //     ctx.strokeRect(60, 60, 1080, 680);

// // // //     // Certificate text
// // // //     ctx.fillStyle = "#ffffff";
// // // //     ctx.textAlign = "center";

// // // //     // Title
// // // //     ctx.font = "bold 60px Arial";
// // // //     ctx.fillText("CERTIFICATE", 600, 150);
// // // //     ctx.font = "30px Arial";
// // // //     ctx.fillText("OF COMPLETION", 600, 190);

// // // //     // Presented to
// // // //     ctx.font = "italic 24px Arial";
// // // //     ctx.fillText("This certificate is proudly presented to", 600, 280);

// // // //     // Student name
// // // //     ctx.font = "bold 48px Arial";
// // // //     ctx.fillText(user.name, 600, 360);

// // // //     // For completing
// // // //     ctx.font = "italic 22px Arial";
// // // //     ctx.fillText("For successfully completing the course", 600, 430);

// // // //     // Course title
// // // //     ctx.font = "bold 36px Arial";
// // // //     ctx.fillText(course.title, 600, 490);

// // // //     // Date and instructor
// // // //     ctx.font = "20px Arial";
// // // //     const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
// // // //     ctx.fillText(`Date: ${date}`, 600, 580);
// // // //     ctx.fillText(`Instructor: ${course.instructor}`, 600, 620);

// // // //     // Certificate ID
// // // //     ctx.font = "16px Arial";
// // // //     ctx.fillText(`Certificate ID: ${certificateId}`, 600, 700);

// // // //     // Convert to base64
// // // //     const imageData = canvas.toDataURL("image/png");

// // // //     const certificate = await Certificate.create({
// // // //       user: userId,
// // // //       course: courseId,
// // // //       certificateId,
// // // //       imageData,
// // // //     });

// // // //     // Notify user
// // // //     await notificationService.createNotification({
// // // //       users: [userId],
// // // //       type: "certificate_issued",
// // // //       title: "Certificate Issued!",
// // // //       message: `Congratulations! Your certificate for "${course.title}" is ready`,
// // // //       data: { certificateId: certificate._id },
// // // //     });

// // // //     return certificate;
// // // //   } catch (error) {
// // // //     console.error("Certificate generation error:", error);
// // // //     throw error;
// // // //   }
// // // // }

// // // // // Get user certificates
// // // // export const getUserCertificates = async (req, res, next) => {
// // // //   try {
// // // //     const certificates = await Certificate.find({ user: req.user._id })
// // // //       .populate("course", "title instructor")
// // // //       .sort({ issuedAt: -1 })
// // // //       .lean();

// // // //     res.json(successResponse(certificates, "Certificates fetched"));
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // };

// // // // // Get single certificate
// // // // export const getCertificate = async (req, res, next) => {
// // // //   try {
// // // //     const { id } = req.params;

// // // //     const certificate = await Certificate.findById(id)
// // // //       .populate("user", "name email")
// // // //       .populate("course", "title instructor")
// // // //       .lean();

// // // //     if (!certificate) {
// // // //       return next(createHttpError(404, "Certificate not found"));
// // // //     }

// // // //     // Check if user owns this certificate or is admin
// // // //     if (certificate.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
// // // //       return next(createHttpError(403, "Access denied"));
// // // //     }

// // // //     res.json(successResponse(certificate, "Certificate fetched"));
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // };

// // // // // Download certificate
// // // // export const downloadCertificate = async (req, res, next) => {
// // // //   try {
// // // //     const { id } = req.params;

// // // //     const certificate = await Certificate.findById(id).populate("user course");

// // // //     if (!certificate) {
// // // //       return next(createHttpError(404, "Certificate not found"));
// // // //     }

// // // //     if (certificate.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
// // // //       return next(createHttpError(403, "Access denied"));
// // // //     }

// // // //     // Send image data
// // // //     const base64Data = certificate.imageData.replace(/^data:image\/png;base64,/, "");
// // // //     const imgBuffer = Buffer.from(base64Data, "base64");

// // // //     res.setHeader("Content-Type", "image/png");
// // // //     res.setHeader("Content-Disposition", `attachment; filename="certificate-${certificate.certificateId}.png"`);
// // // //     res.send(imgBuffer);
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // };











// // // import Certificate from "../models/Certificate.js"
// // // import { createHttpError } from "../utils/errors.js"
// // // import { sendResponse } from "../utils/response.js"

// // // // Get user certificates
// // // export const getUserCertificates = async (req, res, next) => {
// // //   try {
// // //     const certificates = await Certificate.find({ user: req.user.id })
// // //       .populate("course", "title description category instructor")
// // //       .populate("enrollment", "completedAt")
// // //       .sort({ issuedAt: -1 })

// // //     sendResponse(res, 200, "Certificates fetched successfully", certificates)
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Get single certificate
// // // export const getCertificate = async (req, res, next) => {
// // //   try {
// // //     const certificate = await Certificate.findOne({
// // //       _id: req.params.id,
// // //       user: req.user.id,
// // //     }).populate([
// // //       { path: "course", populate: { path: "instructor", select: "name" } },
// // //       { path: "user", select: "name email" },
// // //       { path: "enrollment", select: "completedAt" },
// // //     ])

// // //     if (!certificate) {
// // //       return next(createHttpError(404, "Certificate not found"))
// // //     }

// // //     sendResponse(res, 200, "Certificate fetched successfully", certificate)
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Verify certificate (public endpoint)
// // // export const verifyCertificate = async (req, res, next) => {
// // //   try {
// // //     const { certificateId } = req.params

// // //     const certificate = await Certificate.findOne({ certificateId })
// // //       .populate("user", "name")
// // //       .populate("course", "title instructor")
// // //       .populate("enrollment", "completedAt")

// // //     if (!certificate) {
// // //       return next(createHttpError(404, "Certificate not found"))
// // //     }

// // //     if (!certificate.isVerified) {
// // //       return next(createHttpError(400, "Certificate is not verified"))
// // //     }

// // //     sendResponse(res, 200, "Certificate verified successfully", {
// // //       isValid: true,
// // //       certificate: {
// // //         id: certificate.certificateId,
// // //         studentName: certificate.user.name,
// // //         courseName: certificate.course.title,
// // //         completedAt: certificate.enrollment.completedAt,
// // //         issuedAt: certificate.issuedAt,
// // //         grade: certificate.grade,
// // //       },
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Download certificate
// // // export const downloadCertificate = async (req, res, next) => {
// // //   try {
// // //     const certificate = await Certificate.findOne({
// // //       _id: req.params.id,
// // //       user: req.user.id,
// // //     }).populate([
// // //       { path: "course", populate: { path: "instructor", select: "name" } },
// // //       { path: "user", select: "name email" },
// // //     ])

// // //     if (!certificate) {
// // //       return next(createHttpError(404, "Certificate not found"))
// // //     }

// // //     // Here you would generate and return the PDF certificate
// // //     // For now, we'll return the certificate data
// // //     sendResponse(res, 200, "Certificate ready for download", certificate)
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

















// // import Certificate from "../models/Certificate.js"
// // import Enrollment from "../models/Enrollment.js"
// // import { createHttpError } from "../utils/errors.js"
// // import crypto from "crypto"

// // const generateCertificateId = () => {
// //   return `CERT-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
// // }

// // export const generateCertificate = async (enrollmentId) => {
// //   try {
// //     const enrollment = await Enrollment.findById(enrollmentId).populate("user").populate("course")

// //     if (!enrollment) return

// //     // Check if certificate already exists
// //     const existingCert = await Certificate.findOne({ enrollment: enrollmentId })
// //     if (existingCert) return existingCert

// //     const certificateId = generateCertificateId()
// //     const validUntil = new Date()
// //     validUntil.setFullYear(validUntil.getFullYear() + 2)

// //     const certificate = new Certificate({
// //       user: enrollment.user._id,
// //       course: enrollment.course._id,
// //       enrollment: enrollmentId,
// //       certificateId,
// //       issuedAt: new Date(),
// //       validUntil,
// //       grade: "A",
// //       score: 100,
// //       isVerified: true,
// //       shareToken: crypto.randomBytes(32).toString("hex"),
// //     })

// //     await certificate.save()

// //     // Notify user
// //     const notificationController = require("./notificationController")
// //     await notificationController.createNotification({
// //       userId: enrollment.user._id,
// //       type: "certificate",
// //       title: "Certificate Earned!",
// //       message: `Congratulations! You have earned a certificate for ${enrollment.course.title}`,
// //       courseId: enrollment.course._id,
// //     })

// //     return certificate
// //   } catch (error) {
// //     console.error("Error generating certificate:", error)
// //   }
// // }

// // export const getUserCertificates = async (req, res, next) => {
// //   try {
// //     const userId = req.user._id

// //     const certificates = await Certificate.find({ user: userId })
// //       .populate("course", "title")
// //       .populate("user", "name email")
// //       .sort({ issuedAt: -1 })

// //     res.json({
// //       success: true,
// //       data: certificates,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const getCertificate = async (req, res, next) => {
// //   try {
// //     const { certificateId } = req.params

// //     const certificate = await Certificate.findById(certificateId).populate("course").populate("user", "name email")

// //     if (!certificate) {
// //       return next(createHttpError(404, "Certificate not found"))
// //     }

// //     res.json({
// //       success: true,
// //       data: certificate,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const downloadCertificate = async (req, res, next) => {
// //   try {
// //     const { certificateId } = req.params

// //     const certificate = await Certificate.findById(certificateId).populate("course").populate("user", "name email")

// //     if (!certificate) {
// //       return next(createHttpError(404, "Certificate not found"))
// //     }

// //     // Generate PDF (you would use a library like pdfkit or html2pdf)
// //     res.json({
// //       success: true,
// //       message: "Certificate ready for download",
// //       data: certificate,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const verifyCertificate = async (req, res, next) => {
// //   try {
// //     const { shareToken } = req.params

// //     const certificate = await Certificate.findOne({ shareToken }).populate("course").populate("user", "name email")

// //     if (!certificate) {
// //       return next(createHttpError(404, "Certificate not found"))
// //     }

// //     res.json({
// //       success: true,
// //       data: certificate,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }






// import Certificate from "../models/Certificate.js"
// import Enrollment from "../models/Enrollment.js"
// import { createHttpError } from "../utils/errors.js"
// import crypto from "crypto"

// const generateCertificateId = () => {
//   return `CERT-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
// }

// export const generateCertificate = async (enrollmentId) => {
//   try {
//     const enrollment = await Enrollment.findById(enrollmentId).populate("user").populate("course")

//     if (!enrollment) return

//     // Check if certificate already exists
//     const existingCert = await Certificate.findOne({ enrollment: enrollmentId })
//     if (existingCert) return existingCert

//     const certificateId = generateCertificateId()
//     const validUntil = new Date()
//     validUntil.setFullYear(validUntil.getFullYear() + 2)

//     const certificate = new Certificate({
//       user: enrollment.user._id,
//       course: enrollment.course._id,
//       enrollment: enrollmentId,
//       certificateId,
//       issuedAt: new Date(),
//       validUntil,
//       grade: "A",
//       score: 100,
//       isVerified: true,
//       shareToken: crypto.randomBytes(32).toString("hex"),
//     })

//     await certificate.save()

//     // Notify user
//     const notificationController = require("./notificationController")
//     await notificationController.createNotification({
//       userId: enrollment.user._id,
//       type: "certificate",
//       title: "Certificate Earned!",
//       message: `Congratulations! You have earned a certificate for ${enrollment.course.title}`,
//       courseId: enrollment.course._id,
//     })

//     return certificate
//   } catch (error) {
//     console.error("Error generating certificate:", error)
//   }
// }

// export const getUserCertificates = async (req, res, next) => {
//   try {
//     const userId = req.user._id

//     const certificates = await Certificate.find({ user: userId })
//       .populate("course", "title")
//       .populate("user", "name email")
//       .sort({ issuedAt: -1 })

//     res.json({
//       success: true,
//       data: certificates,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getCertificate = async (req, res, next) => {
//   try {
//     const { certificateId } = req.params

//     const certificate = await Certificate.findById(certificateId).populate("course").populate("user", "name email")

//     if (!certificate) {
//       return next(createHttpError(404, "Certificate not found"))
//     }

//     res.json({
//       success: true,
//       data: certificate,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const downloadCertificate = async (req, res, next) => {
//   try {
//     const { certificateId } = req.params

//     const certificate = await Certificate.findById(certificateId).populate("course").populate("user", "name email")

//     if (!certificate) {
//       return next(createHttpError(404, "Certificate not found"))
//     }

//     // Generate PDF (you would use a library like pdfkit or html2pdf)
//     res.json({
//       success: true,
//       message: "Certificate ready for download",
//       data: certificate,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const verifyCertificate = async (req, res, next) => {
//   try {
//     const { shareToken } = req.params

//     const certificate = await Certificate.findOne({ shareToken }).populate("course").populate("user", "name email")

//     if (!certificate) {
//       return next(createHttpError(404, "Certificate not found"))
//     }

//     res.json({
//       success: true,
//       data: certificate,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getAdminCertificates = async (req, res, next) => {
//   try {
//     const { courseId } = req.params

//     const certificates = await Certificate.find()
//       .populate("course", "title")
//       .populate("user", "name email")
//       .sort({ issuedAt: -1 })

//     if (courseId) {
//       const filtered = certificates.filter((cert) => cert.course._id.toString() === courseId)
//       return res.json({
//         success: true,
//         data: filtered,
//       })
//     }

//     res.json({
//       success: true,
//       data: certificates,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getCertificateForAdmin = async (req, res, next) => {
//   try {
//     const { certificateId } = req.params

//     const certificate = await Certificate.findById(certificateId).populate("course").populate("user", "name email")

//     if (!certificate) {
//       return next(createHttpError(404, "Certificate not found"))
//     }

//     res.json({
//       success: true,
//       data: certificate,
//     })
//   } catch (error) {
//     next(error)
//   }
// }








import Certificate from "../models/Certificate.js"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"
import path from "path"
import fs from "fs"

// GET /api/certificates/user
export const getUserCertificates = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const certs = await Certificate.find({ userId }).populate("course")
    sendResponse(res, 200, "Certificates fetched", certs)
  } catch (err) {
    next(err)
  }
}

// GET /api/certificates/:id/download
export const downloadCertificate = async (req, res, next) => {
  try {
    const { id } = req.params
    const cert = await Certificate.findById(id)
    if (!cert) return next(createHttpError(404, "Certificate not found"))

    // Example: assume cert.filePath stores PDF path
    const filePath = cert.filePath || path.join("certificates", `${id}.pdf`)
    if (!fs.existsSync(filePath)) {
      return next(createHttpError(404, "Certificate file not found"))
    }

    res.download(filePath, `certificate-${id}.pdf`)
  } catch (err) {
    next(err)
  }
}
