export const createHttpError = (status, message) => {
  const error = new Error(message)
  error.status = status
  return error
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
