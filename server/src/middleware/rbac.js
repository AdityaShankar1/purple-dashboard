//server/src/middleware/rbac.js

import { createHttpError } from "../utils/errors.js"

export const rbac = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, "Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(createHttpError(403, "Access denied. Insufficient permissions."));
    }

    next();
  };
};
