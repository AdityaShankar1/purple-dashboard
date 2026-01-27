import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }, // admin/user
  action: { type: String, required: true, index: true }, // e.g., COURSE_CREATE, COURSE_UPDATE, ENROLL, PROGRESS_UPDATE
  targetType: { type: String },       // Course, User, Enrollment, etc.
  targetId: { type: String },         // id string
  details: { type: Object, default: {} },
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now, index: true },
}, { versionKey: false });

export default mongoose.model("ActivityLog", activityLogSchema);
