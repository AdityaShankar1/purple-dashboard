import User from "../models/User.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"
import { sendEmail } from "../config/mailer.js"
import { logger } from "../config/logger.js"

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Register user
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "user" } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(createHttpError(400, "User already exists with this email"))
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    })

    // Generate token
    const token = generateToken(user._id)

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Purple Platform",
        html: `
          <h1>Welcome ${name}!</h1>
          <p>Thank you for joining our Learning Management System.</p>
          <p>You can now access all available courses and start your learning journey.</p>
        `,
      })
    } catch (emailError) {
      logger.error("Failed to send welcome email:", emailError)
    }

    logger.info(`New user registered: ${email}`)

    sendResponse(res, 201, "User registered successfully", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if user exists and get password
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.comparePassword(password))) {
      return next(createHttpError(401, "Invalid email or password"))
    }

    if (!user.isActive) {
      return next(createHttpError(401, "Account is deactivated"))
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    logger.info(`User logged in: ${email}`)

    sendResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get current user
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    sendResponse(res, 200, "User profile fetched successfully", user)
  } catch (error) {
    next(error)
  }
}

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body

    const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true })

    sendResponse(res, 200, "Profile updated successfully", user)
  } catch (error) {
    next(error)
  }
}

// Forgot password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return next(createHttpError(404, "User not found with this email"))
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 minutes
    await user.save()

    // Send reset email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    try {
      await sendEmail({
        to: email,
        subject: "Password Reset Request",
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      })

      sendResponse(res, 200, "Password reset email sent")
    } catch (emailError) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()

      return next(createHttpError(500, "Email could not be sent"))
    }
  } catch (error) {
    next(error)
  }
}

// Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // Hash token and find user
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return next(createHttpError(400, "Invalid or expired reset token"))
    }

    // Set new password
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    // Generate new token
    const jwtToken = generateToken(user._id)

    sendResponse(res, 200, "Password reset successful", {
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get all users (Admin only)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    sendResponse(res, 200, "Users fetched successfully", users)
  } catch (error) {
    next(error)
  }
}