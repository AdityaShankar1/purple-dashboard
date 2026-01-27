//server/src/config/mailer.js
import nodemailer from "nodemailer"
import { logger } from "./logger.js"

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export default transporter

// Send email function
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"LMS Platform" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }

    const info = await transporter.sendMail(mailOptions)
    logger.info(`Email sent: ${info.messageId}`)
    return info
  } catch (error) {
    logger.error("Email sending failed:", error)
    throw error
  }
}

// Send notification email
export const sendNotificationEmail = async (user, notification) => {
  try {
    await sendEmail({
      to: user.email,
      subject: notification.title,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This is an automated notification from LMS Platform.
            </p>
          </div>
        </div>
      `,
    })
  } catch (error) {
    logger.error("Failed to send notification email:", error)
  }
}
