// // // // // // // // // // server/src/models/Course.js


// // // // // // // // import mongoose from 'mongoose';

// // // // // // // // const courseSchema = new mongoose.Schema({
// // // // // // // //   title: { type: String, required: true, trim: true },
// // // // // // // //   description: { type: String, required: true, trim: true },
// // // // // // // //   content: { type: String, required: true, trim: true },
// // // // // // // //   duration: { type: Number, required: true, min: 1 },
// // // // // // // //   difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
// // // // // // // //   category: { type: String, enum: ['General', 'Cybersecurity', 'Programming', 'Data Science', 'Networking'], default: 'General' },
// // // // // // // //   instructor: { type: String, required: true, trim: true }, // ✅ NEW FIELD
// // // // // // // //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // // // // // // //   isPublished: { type: Boolean, default: true },
// // // // // // // // }, { timestamps: true });


// // // // // // // // export default mongoose.model('Course', courseSchema);






// // // // // // // // // // server/src/models/Course.js

// // // // // // // import mongoose from "mongoose";

// // // // // // // const courseSchema = new mongoose.Schema({
// // // // // // //   courseId: { type: String, required: true, unique: true, trim: true },
// // // // // // //   title: { type: String, required: true, trim: true },
// // // // // // //   description: { type: String, required: true },
// // // // // // //   content: { type: String },
// // // // // // //   duration: { type: Number, default: 1 },
// // // // // // //   difficulty: {
// // // // // // //     type: String,
// // // // // // //     enum: ["Beginner", "Intermediate", "Advanced"],
// // // // // // //     default: "Beginner",
// // // // // // //   },
// // // // // // //   category: {
// // // // // // //     type: String,
// // // // // // //     enum: ["General", "Cybersecurity", "Programming", "Data Science", "Networking"],
// // // // // // //     default: "General",
// // // // // // //   },
// // // // // // //   instructor: { type: String, required: true, trim: true },
// // // // // // // }, { timestamps: true });

// // // // // // // export default mongoose.model("Course", courseSchema);




// // // // // // // /// above working code 16/10/25///// Below is new claude  code








// // // // // // // ============================================
// // // // // // // SERVER MODELS
// // // // // // // ============================================

// // // // // // // server/src/models/Course.js
// // // // // // import mongoose from "mongoose";

// // // // // // const courseSchema = new mongoose.Schema(
// // // // // //   {
// // // // // //     courseId: {
// // // // // //       type: String,
// // // // // //       required: true,
// // // // // //       unique: true,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     title: {
// // // // // //       type: String,
// // // // // //       required: true,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     description: {
// // // // // //       type: String,
// // // // // //       required: true,
// // // // // //     },
// // // // // //     content: {
// // // // // //       type: String,
// // // // // //     },
// // // // // //     category: {
// // // // // //       type: String,
// // // // // //       enum: ["General", "Cybersecurity", "Programming", "Data Science", "Networking"],
// // // // // //       default: "General",
// // // // // //     },
// // // // // //     difficulty: {
// // // // // //       type: String,
// // // // // //       enum: ["Beginner", "Intermediate", "Advanced"],
// // // // // //       default: "Beginner",
// // // // // //     },
// // // // // //     duration: {
// // // // // //       type: Number,
// // // // // //       default: 1,
// // // // // //     },
// // // // // //     instructor: {
// // // // // //       type: String,
// // // // // //       required: true,
// // // // // //     },
// // // // // //     createdBy: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "User",
// // // // // //     },
// // // // // //     isPublished: {
// // // // // //       type: Boolean,
// // // // // //       default: true,
// // // // // //     },
// // // // // //   },
// // // // // //   {
// // // // // //     timestamps: true,
// // // // // //   }
// // // // // // );

// // // // // // courseSchema.index({ courseId: 1, title: 1 });

// // // // // // export default mongoose.model("Course", courseSchema);


























// // // // // import mongoose from "mongoose"

// // // // // const courseSchema = new mongoose.Schema(
// // // // //   {
// // // // //     title: {
// // // // //       type: String,
// // // // //       required: [true, "Course title is required"],
// // // // //       trim: true,
// // // // //       maxlength: [100, "Title cannot exceed 100 characters"],
// // // // //     },
// // // // //     description: {
// // // // //       type: String,
// // // // //       required: [true, "Course description is required"],
// // // // //       maxlength: [1000, "Description cannot exceed 1000 characters"],
// // // // //     },
// // // // //     content: {
// // // // //       type: String,
// // // // //       required: [true, "Course content is required"],
// // // // //     },
// // // // //     duration: {
// // // // //       type: Number,
// // // // //       required: [true, "Course duration is required"],
// // // // //       min: [1, "Duration must be at least 1 hour"],
// // // // //     },
// // // // //     difficulty: {
// // // // //       type: String,
// // // // //       enum: ["Beginner", "Intermediate", "Advanced"],
// // // // //       default: "Beginner",
// // // // //     },
// // // // //     category: {
// // // // //       type: String,
// // // // //       required: [true, "Course category is required"],
// // // // //       trim: true,
// // // // //     },
// // // // //     instructor: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: "User",
// // // // //       required: true,
// // // // //     },
// // // // //     isPublished: {
// // // // //       type: Boolean,
// // // // //       default: true,
// // // // //     },
// // // // //     enrollmentCount: {
// // // // //       type: Number,
// // // // //       default: 0,
// // // // //     },
// // // // //     completionCount: {
// // // // //       type: Number,
// // // // //       default: 0,
// // // // //     },
// // // // //     thumbnail: {
// // // // //       type: String,
// // // // //       default: "",
// // // // //     },
// // // // //     tags: [
// // // // //       {
// // // // //         type: String,
// // // // //         trim: true,
// // // // //       },
// // // // //     ],
// // // // //     courseId: {
// // // // //       type: String,
// // // // //       required: [true, "Course ID is required"],
// // // // //       unique: true,
// // // // //       trim: true,
// // // // //       uppercase: true,
// // // // //       maxlength: [50, "Course ID cannot exceed 50 characters"],
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     timestamps: true,
// // // // //   },
// // // // // )

// // // // // // Index for search functionality
// // // // // courseSchema.index({ title: "text", description: "text", category: "text" })

// // // // // export default mongoose.model("Course", courseSchema)



















// // // // import mongoose from "mongoose"

// // // // const courseSchema = new mongoose.Schema(
// // // //   {
// // // //     title: {
// // // //       type: String,
// // // //       required: [true, "Course title is required"],
// // // //       trim: true,
// // // //       maxlength: [100, "Title cannot exceed 100 characters"],
// // // //     },
// // // //     description: {
// // // //       type: String,
// // // //       required: [true, "Course description is required"],
// // // //       maxlength: [1000, "Description cannot exceed 1000 characters"],
// // // //     },
// // // //     content: {
// // // //       type: String,
// // // //       required: [true, "Course content is required"],
// // // //     },
// // // //     duration: {
// // // //       type: Number,
// // // //       required: [true, "Course duration is required"],
// // // //       min: [1, "Duration must be at least 1 hour"],
// // // //     },
// // // //     difficulty: {
// // // //       type: String,
// // // //       enum: ["Beginner", "Intermediate", "Advanced"],
// // // //       default: "Beginner",
// // // //     },
// // // //     category: {
// // // //       type: String,
// // // //       required: [true, "Course category is required"],
// // // //       trim: true,
// // // //     },
// // // //     instructor: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     isPublished: {
// // // //       type: Boolean,
// // // //       default: true,
// // // //     },
// // // //     enrollmentCount: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },
// // // //     completionCount: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },
// // // //     thumbnail: {
// // // //       type: String,
// // // //       default: "",
// // // //     },
// // // //     tags: [
// // // //       {
// // // //         type: String,
// // // //         trim: true,
// // // //       },
// // // //     ],
// // // //     courseId: {
// // // //       type: String,
// // // //       required: [true, "Course ID is required"],
// // // //       unique: true,
// // // //       trim: true,
// // // //       uppercase: true,
// // // //       maxlength: [50, "Course ID cannot exceed 50 characters"],
// // // //     },
// // // //     materials: [
// // // //       {
// // // //         _id: mongoose.Schema.Types.ObjectId,
// // // //         title: String,
// // // //         description: String,
// // // //         type: {
// // // //           type: String,
// // // //           enum: ["video", "document", "link"],
// // // //           default: "video",
// // // //         },
// // // //         url: String,
// // // //         duration: Number, // in minutes for videos
// // // //         order: Number,
// // // //         createdAt: {
// // // //           type: Date,
// // // //           default: Date.now,
// // // //         },
// // // //       },
// // // //     ],
// // // //     liveSessions: [
// // // //       {
// // // //         _id: mongoose.Schema.Types.ObjectId,
// // // //         title: String,
// // // //         description: String,
// // // //         startTime: Date,
// // // //         endTime: Date,
// // // //         meetingLink: String,
// // // //         isLive: {
// // // //           type: Boolean,
// // // //           default: false,
// // // //         },
// // // //         recordingUrl: String,
// // // //         createdAt: {
// // // //           type: Date,
// // // //           default: Date.now,
// // // //         },
// // // //       },
// // // //     ],
// // // //     ratings: [
// // // //       {
// // // //         user: {
// // // //           type: mongoose.Schema.Types.ObjectId,
// // // //           ref: "User",
// // // //         },
// // // //         rating: {
// // // //           type: Number,
// // // //           min: 1,
// // // //           max: 5,
// // // //         },
// // // //         review: String,
// // // //         createdAt: {
// // // //           type: Date,
// // // //           default: Date.now,
// // // //         },
// // // //       },
// // // //     ],
// // // //     averageRating: {
// // // //       type: Number,
// // // //       default: 0,
// // // //       min: 0,
// // // //       max: 5,
// // // //     },
// // // //     totalRatings: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   },
// // // // )

// // // // // Index for search functionality
// // // // courseSchema.index({ title: "text", description: "text", category: "text" })

// // // // export default mongoose.model("Course", courseSchema)










// // // const mongoose = require("mongoose")

// // // const courseSchema = new mongoose.Schema(
// // //   {
// // //     title: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     description: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     instructor: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     category: String,
// // //     level: {
// // //       type: String,
// // //       enum: ["beginner", "intermediate", "advanced"],
// // //       default: "beginner",
// // //     },
// // //     duration: Number, // in hours
// // //     thumbnail: String,
// // //     materials: [
// // //       {
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: "Material",
// // //       },
// // //     ],
// // //     quizzes: [
// // //       {
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: "Quiz",
// // //       },
// // //     ],
// // //     assignments: [
// // //       {
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: "Assignment",
// // //       },
// // //     ],
// // //     enrollmentCount: {
// // //       type: Number,
// // //       default: 0,
// // //     },
// // //     isPublished: {
// // //       type: Boolean,
// // //       default: false,
// // //     },
// // //   },
// // //   { timestamps: true },
// // // )

// // // module.exports = mongoose.model("Course", courseSchema)
// // // export default Course;






// // // server/src/models/Course.js

// // import mongoose from "mongoose";

// // const courseSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     description: { type: String, required: true },
// //     instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     category: String,
// //     level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
// //     duration: Number, // in hours
// //     thumbnail: String,
// //     materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
// //     quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
// //     assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
// //     enrollmentCount: { type: Number, default: 0 },
// //     isPublished: { type: Boolean, default: false },
// //   },
// //   { timestamps: true }
// // );

// // const Course = mongoose.model("Course", courseSchema);
// // export default Course;








// // server/src/models/Course.js
// // server/src/models/Course.js
// import mongoose from 'mongoose'

// const courseSchema = new mongoose.Schema({
//   courseId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     default: ''
//   },
//   duration: {
//     type: Number,
//     default: 1,
//     min: 1
//   },
//   difficulty: {
//     type: String,
//     enum: ['Beginner', 'Intermediate', 'Advanced'],
//     default: 'Beginner'
//   },
//   category: {
//     type: String,
//     enum: ['General', 'Cybersecurity', 'Programming', 'Data Science', 'Networking'],
//     default: 'General'
//   },
//   instructor: {
//     type: String,
//     required: true
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   updatedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// })

// // Indexes for better query performance
// courseSchema.index({ courseId: 1 })
// courseSchema.index({ category: 1 })
// courseSchema.index({ difficulty: 1 })
// courseSchema.index({ title: 'text', description: 'text' })

// const Course = mongoose.model('Course', courseSchema)
// export default Course








import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 1,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: {
    type: String,
    enum: ['General', 'Cybersecurity', 'Programming', 'Data Science', 'Networking'],
    default: 'General'
  },
  instructor: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // optional arrays (if you later add materials/live/rating flows)
  materials: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
        type: {
          type: String,
          enum: ['video', 'pdf', 'document', 'link', 'other']
        },
        url: String,
        duration: Number,
        order: Number
      }
    ],
    default: []
  },
  liveSessions: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
        startTime: Date,
        endTime: Date,
        meetingLink: String,
        isLive: Boolean
      }
    ],
    default: []
  },
  ratings: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        review: String
      }
    ],
    default: []
  },
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
}, {
  timestamps: true
})

courseSchema.index({ courseId: 1 })
courseSchema.index({ category: 1 })
courseSchema.index({ difficulty: 1 })
courseSchema.index({ title: 'text', description: 'text' })

const Course = mongoose.model('Course', courseSchema)
export default Course
