// server/src/models/CourseMaterial.js

import mongoose from "mongoose"

const courseMaterialSchema = new mongoose.Schema(
  {
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    viewedAt: Date,
    timeSpent: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.model("CourseMaterial", courseMaterialSchema)
