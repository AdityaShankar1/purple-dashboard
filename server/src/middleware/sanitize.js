//server/src/middleware/sanitize.js
import xss from "xss"

export const sanitize = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }

  // Sanitize query parameters
  if (req.query) {
    // req.query = sanitizeObject(req.query)
    Object.assign(req.query, sanitizeObject(req.query)); // Safe mutation
  }

  next()
}

const sanitizeObject = (obj) => {
  if (typeof obj === "string") {
    return xss(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject)
  }

  if (obj && typeof obj === "object") {
    const sanitized = {}
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key])
    }
    return sanitized
  }

  return obj
}
