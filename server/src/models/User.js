// // // // //server/src/models/User.js
// // // // import mongoose from "mongoose"
// // // // import bcrypt from "bcryptjs"

// // // // const userSchema = new mongoose.Schema(
// // // //   {
// // // //     name: {
// // // //       type: String,
// // // //       required: [true, "Name is required"],
// // // //       trim: true,
// // // //       maxlength: [50, "Name cannot exceed 50 characters"],
// // // //     },
// // // //     email: {
// // // //       type: String,
// // // //       required: [true, "Email is required"],
// // // //       unique: true,
// // // //       lowercase: true,
// // // //       match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
// // // //     },
// // // //     password: {
// // // //       type: String,
// // // //       required: [true, "Password is required"],
// // // //       minlength: [6, "Password must be at least 6 characters"],
// // // //       select: false,
// // // //     },
// // // //     role: {
// // // //       type: String,
// // // //       enum: ["user", "admin"],
// // // //       default: "user",
// // // //     },
// // // //     isEmailVerified: {
// // // //       type: Boolean,
// // // //       default: false,
// // // //     },
// // // //     resetPasswordToken: String,
// // // //     resetPasswordExpire: Date,
// // // //     emailVerificationToken: String,
// // // //     emailVerificationExpire: Date,
// // // //     lastLogin: Date,
// // // //     isActive: {
// // // //       type: Boolean,
// // // //       default: true,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   },
// // // // )

// // // // // Hash password before saving
// // // // userSchema.pre("save", async function (next) {
// // // //   if (!this.isModified("password")) return next()
// // // //   this.password = await bcrypt.hash(this.password, 12)
// // // //   next()
// // // // })

// // // // // Compare password method
// // // // userSchema.methods.comparePassword = async function (candidatePassword) {
// // // //   return await bcrypt.compare(candidatePassword, this.password)
// // // // }

// // // // export default mongoose.model("User", userSchema)









// // // import mongoose from "mongoose";
// // // import bcrypt from "bcryptjs";

// // // const userSchema = new mongoose.Schema(
// // //   {
// // //     // Basic identity
// // //     name: {
// // //       type: String,
// // //       trim: true,
// // //       maxlength: [50, "Name cannot exceed 50 characters"],
// // //     },
// // //     username: {
// // //       type: String,
// // //       unique: true,
// // //       sparse: true, // allow either name or username
// // //       trim: true,
// // //     },
// // //     email: {
// // //       type: String,
// // //       required: [true, "Email is required"],
// // //       unique: true,
// // //       lowercase: true,
// // //       match: [
// // //         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
// // //         "Please enter a valid email",
// // //       ],
// // //     },

// // //     // Auth
// // //     password: {
// // //       type: String,
// // //       required: [true, "Password is required"],
// // //       minlength: [6, "Password must be at least 6 characters"],
// // //       select: false,
// // //     },

// // //     // Role-based access
// // //     role: {
// // //       type: String,
// // //       enum: ["Admin", "Student", "user", "admin"], // support both sets
// // //       default: "Student",
// // //     },

// // //     // Course enrollment (for students)
// // //     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

// // //     // Account status
// // //     isEmailVerified: { type: Boolean, default: false },
// // //     isActive: { type: Boolean, default: true },
// // //     lastLogin: Date,

// // //     // Tokens
// // //     resetPasswordToken: String,
// // //     resetPasswordExpire: Date,
// // //     emailVerificationToken: String,
// // //     emailVerificationExpire: Date,
// // //   },
// // //   { timestamps: true }
// // // );

// // // // ✅ Hash password before saving
// // // userSchema.pre("save", async function (next) {
// // //   if (!this.isModified("password")) return next();
// // //   this.password = await bcrypt.hash(this.password, 12);
// // //   next();
// // // });

// // // // ✅ Compare password method
// // // userSchema.methods.comparePassword = async function (candidatePassword) {
// // //   return await bcrypt.compare(candidatePassword, this.password);
// // // };

// // // // ✅ Guard against OverwriteModelError
// // // export default mongoose.models.User || mongoose.model("User", userSchema);





// // //server/src/models/User
// // // server/src/models/User.js

// // import mongoose from "mongoose";
// // import bcrypt from "bcryptjs";

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //   },

// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true,
// //   },

// //   password: {
// //     type: String,
// //     required: true,
// //     select: false, // ✅ Needed for .select("+password") to work
// //   },

// //   role: {
// //     type: String,
// //     enum: ["user", "admin", "instructor"],
// //     default: "user",
// //   },

// //   enrolledCourses: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //     },
// //   ],

// //   isActive: {
// //     type: Boolean,
// //     default: true, // ✅ Needed for login check
// //   },

// //   lastLogin: {
// //     type: Date, // ✅ Needed for login update
// //   },

// //   resetPasswordToken: {
// //     type: String,
// //   },

// //   resetPasswordExpire: {
// //     type: Date,
// //   },
// // }, { timestamps: true });

// // // 🔐 Hash password before saving
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // 🔍 Add comparePassword method
// // userSchema.methods.comparePassword = async function (candidatePassword) {
// //   return bcrypt.compare(candidatePassword, this.password);
// // };

// // const User = mongoose.model("User", userSchema);
// // export default User;





// const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     profileImage: String,
//     bio: String,
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true },
// )

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next()
//   try {
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }

// module.exports = mongoose.model("User", userSchema)
// export default User;








import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profileImage: String,
  bio: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
