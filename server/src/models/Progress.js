// // // import mongoose from "mongoose"

// // // const progressSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     course: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Course",
// // //       required: true,
// // //     },
// // //     enrollment: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Enrollment",
// // //       required: true,
// // //     },
// // //     completedSections: [
// // //       {
// // //         sectionId: String,
// // //         completedAt: {
// // //           type: Date,
// // //           default: Date.now,
// // //         },
// // //       },
// // //     ],
// // //     totalSections: {
// // //       type: Number,
// // //       required: true,
// // //       default: 1,
// // //     },
// // //     progressPercentage: {
// // //       type: Number,
// // //       default: 0,
// // //       min: 0,
// // //       max: 100,
// // //     },
// // //     timeSpent: {
// // //       type: Number,
// // //       default: 0, // in minutes
// // //     },
// // //     lastUpdated: {
// // //       type: Date,
// // //       default: Date.now,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   },
// // // )

// // // // Update progress percentage before saving
// // // progressSchema.pre("save", function (next) {
// // //   if (this.totalSections > 0) {
// // //     this.progressPercentage = Math.round((this.completedSections.length / this.totalSections) * 100)
// // //   }
// // //   this.lastUpdated = new Date()
// // //   next()
// // // })

// // // export default mongoose.model("Progress", progressSchema)





// // ///above is working code ///// 16/10/25 Below is new claude code



// // // server/src/models/Progress.js
// // import mongoose from "mongoose";

// // const progressSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     course: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //       required: true,
// //     },
// //     assignmentsCompleted: {
// //       type: Number,
// //       default: 0,
// //     },
// //     quizzesCompleted: {
// //       type: Number,
// //       default: 0,
// //     },
// //     overallProgress: {
// //       type: Number,
// //       default: 0,
// //       min: 0,
// //       max: 100,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // progressSchema.index({ user: 1, course: 1 }, { unique: true });

// // export default mongoose.model("Progress", progressSchema);











// import mongoose from "mongoose"

// const progressSchema = new mongoose.Schema(
//   {
//     enrollment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Enrollment",
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     course: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     materialsCompleted: {
//       type: Number,
//       default: 0,
//     },
//     totalMaterials: {
//       type: Number,
//       default: 0,
//     },
//     quizzesCompleted: {
//       type: Number,
//       default: 0,
//     },
//     totalQuizzes: {
//       type: Number,
//       default: 0,
//     },
//     assignmentsCompleted: {
//       type: Number,
//       default: 0,
//     },
//     totalAssignments: {
//       type: Number,
//       default: 0,
//     },
//     overallProgress: {
//       type: Number,
//       default: 0,
//     },
//     lastAccessedAt: Date,
//     completedAt: Date,
//     certificateGenerated: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// )

// export default mongoose.model("Progress", progressSchema)







// server/src/models/Progress.js
// server/src/models/Progress.js
import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  materialsCompleted: {
    type: Number,
    default: 0
  },
  quizzesCompleted: {
    type: Number,
    default: 0
  },
  assignmentsCompleted: {
    type: Number,
    default: 0
  },
  totalMaterials: {
    type: Number,
    default: 0
  },
  totalQuizzes: {
    type: Number,
    default: 0
  },
  totalAssignments: {
    type: Number,
    default: 0
  },
  completedMaterials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  completedQuizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  completedAssignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  certificateGenerated: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Compound index to ensure one progress record per user per course
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true })

const Progress = mongoose.model('Progress', progressSchema)
export default Progress
