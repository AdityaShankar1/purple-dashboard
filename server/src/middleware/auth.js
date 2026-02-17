// // import jwt from "jsonwebtoken"
// // import User from "../models/User.js"
// // import { createHttpError } from "../utils/errors.js"

// // const auth = async (req, res, next) => {
// //   try {
// //     const token = req.header("Authorization")?.replace("Bearer ", "");

// //     if (!token) {
// //       return next(createHttpError(401, "Access denied. No token provided."));
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.id).select("-password");

// //     if (!user || !user.isActive) {
// //       return next(createHttpError(401, "Invalid token or user not active."));
// //     }

// //     req.user = user;
// //     next();
// //   } catch (error) {
// //     next(createHttpError(401, "Invalid token."));
// //   }
// // };

// // export default auth;









// /// server/src/middleware/auth.js

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { createHttpError } from "../utils/errors.js";

// // 🔐 Middleware: Verify JWT and attach user to request
// export const requireAuth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return next(createHttpError(401, "Access denied. No token provided."));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user || !user.isActive) {
//       return next(createHttpError(401, "Invalid token or user not active."));
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(createHttpError(401, "Invalid token."));
//   }
// };

// // 🔒 Middleware: Role-based access control
// // export const requireRole = (...roles) => {
// //   return (req, res, next) => {
// //     if (!req.user || !roles.includes(req.user.role)) {
// //       return next(createHttpError(403, "Forbidden: insufficient privileges."));
// //     }
// //     next();
// //   };
// // };

// export const rbac = (roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden: insufficient privileges." });
//     }
//     next();
//   };
// };









//server/src/middleware/auth.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createHttpError } from "../utils/errors.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return next(createHttpError(401, "Access denied. No token provided."));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return next(createHttpError(401, "Invalid token or user not found."));
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid token."));
  }
};

export const rbac = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden: insufficient privileges." });
    }

    const userRole = req.user.role.toLowerCase();
    const allowedRoles = roles.map(role => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient privileges." });
    }
    next();
  };
};
