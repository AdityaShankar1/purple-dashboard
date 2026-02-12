// // // // // // "use client"

// // // // // // import { useState, useEffect } from "react"
// // // // // // import { motion } from "framer-motion"
// // // // // // import { BookOpen, Clock, Play, Calendar, BarChart3 } from "lucide-react"
// // // // // // import { enrollmentApi } from "../../api/enrollmentApi"
// // // // // // import { progressApi } from "../../api/progressApi"
// // // // // // import { toast } from "react-toastify"

// // // // // // export default function OngoingCourses() {
// // // // // //   const [enrollments, setEnrollments] = useState([])
// // // // // //   const [loading, setLoading] = useState(true)
// // // // // //   const [selectedCourse, setSelectedCourse] = useState(null)
// // // // // //   const [courseProgress, setCourseProgress] = useState(null)

// // // // // //   useEffect(() => {
// // // // // //     fetchOngoingCourses()
// // // // // //   }, [])

// // // // // //   const fetchOngoingCourses = async () => {
// // // // // //     try {
// // // // // //       const response = await enrollmentApi.getUserEnrollments("active")
// // // // // //       setEnrollments(response.data.data || [])
// // // // // //     } catch (error) {
// // // // // //       toast.error("Failed to fetch ongoing courses")
// // // // // //     } finally {
// // // // // //       setLoading(false)
// // // // // //     }
// // // // // //   }

// // // // // //   const handleViewProgress = async (enrollment) => {
// // // // // //     try {
// // // // // //       const response = await progressApi.getProgress(enrollment._id)
// // // // // //       setCourseProgress(response.data.data)
// // // // // //       setSelectedCourse(enrollment)
// // // // // //     } catch (error) {
// // // // // //       toast.error("Failed to fetch course progress")
// // // // // //     }
// // // // // //   }

// // // // // //   const updateProgress = async (enrollmentId, sectionId) => {
// // // // // //     try {
// // // // // //       await progressApi.updateProgress({
// // // // // //         enrollmentId,
// // // // // //         sectionId,
// // // // // //         timeSpent: 30, // Mock time spent
// // // // // //       })
// // // // // //       toast.success("Progress updated!")
// // // // // //       fetchOngoingCourses() // Refresh data
// // // // // //     } catch (error) {
// // // // // //       toast.error("Failed to update progress")
// // // // // //     }
// // // // // //   }

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex items-center justify-center h-64">
// // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // // // // //       </div>
// // // // // //     )
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       {/* Header */}
// // // // // //       <div>
// // // // // //         <h1 className="text-2xl font-bold text-white">Ongoing Courses</h1>
// // // // // //         <p className="text-gray-400">Continue your learning journey</p>
// // // // // //       </div>

// // // // // //       {/* Ongoing Courses */}
// // // // // //       {enrollments.length > 0 ? (
// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // // //           {enrollments.map((enrollment) => (
// // // // // //             <motion.div
// // // // // //               key={enrollment._id}
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // // // // //             >
// // // // // //               {/* Course Header */}
// // // // // //               <div className="flex items-start justify-between mb-4">
// // // // // //                 <div className="flex-1">
// // // // // //                   <h3 className="text-lg font-semibold text-white mb-1">{enrollment.course.title}</h3>
// // // // // //                   <p className="text-sm text-purple-400">{enrollment.course.category}</p>
// // // // // //                 </div>
// // // // // //                 <div
// // // // // //                   className={`px-2 py-1 rounded text-xs font-medium ${
// // // // // //                     enrollment.course.difficulty === "Beginner"
// // // // // //                       ? "bg-green-900 text-green-300"
// // // // // //                       : enrollment.course.difficulty === "Intermediate"
// // // // // //                         ? "bg-yellow-900 text-yellow-300"
// // // // // //                         : "bg-red-900 text-red-300"
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   {enrollment.course.difficulty}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Course Description */}
// // // // // //               <p className="text-gray-400 text-sm mb-4 line-clamp-2">{enrollment.course.description}</p>

// // // // // //               {/* Progress Bar */}
// // // // // //               <div className="mb-4">
// // // // // //                 <div className="flex items-center justify-between text-sm mb-2">
// // // // // //                   <span className="text-gray-400">Progress</span>
// // // // // //                   <span className="text-white">{enrollment.progress}%</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-700 rounded-full h-2">
// // // // // //                   <div
// // // // // //                     className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // // // // //                     style={{ width: `${enrollment.progress}%` }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Course Stats */}
// // // // // //               <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// // // // // //                 <div className="flex items-center gap-1">
// // // // // //                   <Clock size={16} />
// // // // // //                   <span>{enrollment.course.duration}h</span>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center gap-1">
// // // // // //                   <Calendar size={16} />
// // // // // //                   <span>Started {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Action Buttons */}
// // // // // //               <div className="flex gap-2">
// // // // // //                 <button
// // // // // //                   onClick={() => updateProgress(enrollment._id, `section-${Date.now()}`)}
// // // // // //                   className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // // // // //                 >
// // // // // //                   <Play size={16} />
// // // // // //                   Continue
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={() => handleViewProgress(enrollment)}
// // // // // //                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // // // // //                 >
// // // // // //                   <BarChart3 size={16} />
// // // // // //                   Progress
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </motion.div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <div className="text-center py-12">
// // // // // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // // // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">No ongoing courses</h3>
// // // // // //           <p className="text-gray-500">Enroll in a course to start learning</p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Progress Modal */}
// // // // // //       {selectedCourse && courseProgress && (
// // // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //           <motion.div
// // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // // // // //           >
// // // // // //             <div className="flex justify-between items-center mb-6">
// // // // // //               <h2 className="text-xl font-bold text-white">Course Progress: {selectedCourse.course.title}</h2>
// // // // // //               <button onClick={() => setSelectedCourse(null)} className="text-gray-400 hover:text-white">
// // // // // //                 ✕
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* Progress Overview */}
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // // //                 <p className="text-2xl font-bold text-purple-400">{courseProgress.progressPercentage}%</p>
// // // // // //                 <p className="text-gray-400 text-sm">Completed</p>
// // // // // //               </div>
// // // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // // //                 <p className="text-2xl font-bold text-blue-400">{courseProgress.completedSections.length}</p>
// // // // // //                 <p className="text-gray-400 text-sm">Sections Done</p>
// // // // // //               </div>
// // // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // // //                 <p className="text-2xl font-bold text-green-400">{Math.round(courseProgress.timeSpent / 60)}h</p>
// // // // // //                 <p className="text-gray-400 text-sm">Time Spent</p>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Sections Progress */}
// // // // // //             <div className="space-y-3">
// // // // // //               <h3 className="text-lg font-semibold text-white">Section Progress</h3>
// // // // // //               {Array.from({ length: courseProgress.totalSections }, (_, index) => {
// // // // // //                 const sectionId = `section-${index + 1}`
// // // // // //                 const isCompleted = courseProgress.completedSections.some((s) => s.sectionId === sectionId)

// // // // // //                 return (
// // // // // //                   <div key={sectionId} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
// // // // // //                     <div className="flex items-center gap-3">
// // // // // //                       <div
// // // // // //                         className={`w-6 h-6 rounded-full flex items-center justify-center ${
// // // // // //                           isCompleted ? "bg-green-600" : "bg-gray-600"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {isCompleted && <span className="text-white text-sm">✓</span>}
// // // // // //                       </div>
// // // // // //                       <span className="text-white">Section {index + 1}</span>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center gap-2">
// // // // // //                       {isCompleted ? (
// // // // // //                         <span className="text-green-400 text-sm">Completed</span>
// // // // // //                       ) : (
// // // // // //                         <button
// // // // // //                           onClick={() => {
// // // // // //                             updateProgress(selectedCourse._id, sectionId)
// // // // // //                             setSelectedCourse(null)
// // // // // //                           }}
// // // // // //                           className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
// // // // // //                         >
// // // // // //                           Mark Complete
// // // // // //                         </button>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 )
// // // // // //               })}
// // // // // //             </div>
// // // // // //           </motion.div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   )
// // // // // // }








// // // // // // client/src/pages/dashboard/OngoingCourses.js

// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { motion } from "framer-motion";
// // // // // import { BookOpen, Clock, Play, Calendar, BarChart3 } from "lucide-react";
// // // // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // // // import { progressApi } from "../../api/progressApi";
// // // // // import { toast } from "react-toastify";

// // // // // export default function OngoingCourses() {
// // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [selectedCourse, setSelectedCourse] = useState(null);
// // // // //   const [courseProgress, setCourseProgress] = useState(null);
// // // // //   const [updatingSection, setUpdatingSection] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetchOngoingCourses();
// // // // //   }, []);

// // // // //   const fetchOngoingCourses = async () => {
// // // // //     try {
// // // // //       const response = await enrollmentApi.getUserEnrollments("active");
// // // // //       setEnrollments(response.data?.data || []);
// // // // //     } catch (error) {
// // // // //       toast.error("Failed to fetch ongoing courses");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleViewProgress = async (enrollment) => {
// // // // //     try {
// // // // //       const response = await progressApi.getProgress(enrollment._id);
// // // // //       setCourseProgress(response.data?.data);
// // // // //       setSelectedCourse(enrollment);
// // // // //     } catch (error) {
// // // // //       toast.error("Failed to fetch course progress");
// // // // //     }
// // // // //   };

// // // // //   const updateProgress = async (enrollmentId, sectionId) => {
// // // // //     setUpdatingSection(sectionId);
// // // // //     try {
// // // // //       await progressApi.updateProgress({
// // // // //         enrollmentId,
// // // // //         sectionId,
// // // // //         timeSpent: 30, // Mock time spent
// // // // //       });
// // // // //       toast.success("Progress updated!");
// // // // //       fetchOngoingCourses();
// // // // //       if (selectedCourse && selectedCourse._id === enrollmentId) {
// // // // //         handleViewProgress(selectedCourse);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Failed to update progress");
// // // // //     } finally {
// // // // //       setUpdatingSection(null);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center h-64">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       <div>
// // // // //         <h1 className="text-2xl font-bold text-white">Ongoing Courses</h1>
// // // // //         <p className="text-gray-400">Continue your learning journey</p>
// // // // //       </div>

// // // // //       {enrollments.length > 0 ? (
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //           {enrollments.map((enrollment) => (
// // // // //             <motion.div
// // // // //               key={enrollment._id}
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // // // //             >
// // // // //               <div className="flex items-start justify-between mb-4">
// // // // //                 <div className="flex-1">
// // // // //                   <h3 className="text-lg font-semibold text-white mb-1">
// // // // //                     {enrollment.course?.title || "Untitled Course"}
// // // // //                   </h3>
// // // // //                   <p className="text-sm text-purple-400">
// // // // //                     {enrollment.course?.category || "Uncategorized"}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div
// // // // //                   className={`px-2 py-1 rounded text-xs font-medium ${
// // // // //                     enrollment.course?.difficulty === "Beginner"
// // // // //                       ? "bg-green-900 text-green-300"
// // // // //                       : enrollment.course?.difficulty === "Intermediate"
// // // // //                       ? "bg-yellow-900 text-yellow-300"
// // // // //                       : "bg-red-900 text-red-300"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {enrollment.course?.difficulty || "N/A"}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <p className="text-gray-400 text-sm mb-4 line-clamp-2">
// // // // //                 {enrollment.course?.description || "No description"}
// // // // //               </p>

// // // // //               <div className="mb-4">
// // // // //                 <div className="flex items-center justify-between text-sm mb-2">
// // // // //                   <span className="text-gray-400">Progress</span>
// // // // //                   <span className="text-white">{enrollment.progress || 0}%</span>
// // // // //                 </div>
// // // // //                 <div className="w-full bg-gray-700 rounded-full h-2">
// // // // //                   <div
// // // // //                     className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // // // //                     style={{ width: `${enrollment.progress || 0}%` }}
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// // // // //                 <div className="flex items-center gap-1">
// // // // //                   <Clock size={16} />
// // // // //                   <span>{enrollment.course?.duration || 0}h</span>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-1">
// // // // //                   <Calendar size={16} />
// // // // //                   <span>
// // // // //                     Started {new Date(enrollment.enrolledAt).toLocaleDateString()}
// // // // //                   </span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="flex gap-2">
// // // // //                 <button
// // // // //                   onClick={() =>
// // // // //                     updateProgress(enrollment._id, `section-${Date.now()}`)
// // // // //                   }
// // // // //                   disabled={updatingSection !== null}
// // // // //                   className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
// // // // //                 >
// // // // //                   <Play size={16} />
// // // // //                   Continue
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => handleViewProgress(enrollment)}
// // // // //                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // // // //                 >
// // // // //                   <BarChart3 size={16} />
// // // // //                   Progress
// // // // //                 </button>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           ))}
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="text-center py-12">
// // // // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // // //             No ongoing courses
// // // // //           </h3>
// // // // //           <p className="text-gray-500">Enroll in a course to start learning</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {selectedCourse && courseProgress && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // // // //           >
// // // // //             <div className="flex justify-between items-center mb-6">
// // // // //               <h2 className="text-xl font-bold text-white">
// // // // //                 Course Progress: {selectedCourse.course?.title || "Untitled Course"}
// // // // //               </h2>
// // // // //               <button
// // // // //                 onClick={() => setSelectedCourse(null)}
// // // // //                 className="text-gray-400 hover:text-white"
// // // // //               >
// // // // //                 ✕
// // // // //               </button>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // //                 <p className="text-2xl font-bold text-purple-400">
// // // // //                   {courseProgress.progressPercentage || 0}%
// // // // //                 </p>
// // // // //                 <p className="text-gray-400 text-sm">Completed</p>
// // // // //               </div>
// // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // //                 <p className="text-2xl font-bold text-blue-400">
// // // // //                   {courseProgress.completedSections?.length || 0}
// // // // //                 </p>
// // // // //                 <p className="text-gray-400 text-sm">Sections Done</p>
// // // // //               </div>
// // // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // // //                 <p className="text-2xl font-bold text-green-400">
// // // // //                   {Math.round((courseProgress.timeSpent || 0) / 60)}h
// // // // //                 </p>
// // // // //                 <p className="text-gray-400 text-sm">Time Spent</p>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="space-y-3">
// // // // //               <h3 className="text-lg font-semibold text-white">Section Progress</h3>
// // // // //               {Array.from({ length: courseProgress.totalSections || 0 }, (_, index) => {
// // // // //                 const sectionId = `section-${index + 1}`;
// // // // //                 const isCompleted = courseProgress.completedSections?.some(
// // // // //                   (s) => s.sectionId === sectionId
// // // // //                 );

// // // // //                 return (
// // // // //                   <div
// // // // //                     key={sectionId}
// // // // //                     className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
// // // // //                   >
// // // // //                     <div className="flex items-center gap-3">
// // // // //                       <div
// // // // //                         className={`w-6 h-6 rounded-full flex items-center justify-center ${
// // // // //                           isCompleted ? "bg-green-600" : "bg-gray-600"
// // // // //                         }`}
// // // // //                       >
// // // // //                         {isCompleted && <span className="text-white text-sm">✓</span>}
// // // // //                       </div>
// // // // //                       <span className="text-white">Section {index + 1}</span>
// // // // //                     </div>
// // // // //                     {!isCompleted ? (
// // // // //                       <button
// // // // //                         onClick={() => updateProgress(selectedCourse._id, sectionId)}
// // // // //                         disabled={updatingSection === sectionId}
// // // // //                         className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
// // // // //                       >
// // // // //                         Mark Complete
// // // // //                       </button>
// // // // //                     ) : (
// // // // //                       <span className="text-green-400 text-sm">Completed</span>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 );
// // // // //               })}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { motion } from "framer-motion";
// // // // import { BookOpen, Clock, Play, Calendar, BarChart3 } from "lucide-react";
// // // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // // import { progressApi } from "../../api/progressApi";
// // // // import { toast } from "react-toastify";
// // // // import { Link } from "react-router-dom";

// // // // export default function OngoingCourses() {
// // // //   const [enrollments, setEnrollments] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedCourse, setSelectedCourse] = useState(null);
// // // //   const [courseProgress, setCourseProgress] = useState(null);
// // // //   const [updatingSection, setUpdatingSection] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchOngoingCourses();
// // // //   }, []);

// // // //   const fetchOngoingCourses = async () => {
// // // //     try {
// // // //       const response = await enrollmentApi.getUserEnrollments("active");
// // // //       setEnrollments(response.data?.data || []);
// // // //     } catch (error) {
// // // //       toast.error("Failed to fetch ongoing courses");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleViewProgress = async (enrollment) => {
// // // //     try {
// // // //       const response = await progressApi.getProgress(enrollment._id);
// // // //       setCourseProgress(response.data?.data);
// // // //       setSelectedCourse(enrollment);
// // // //     } catch (error) {
// // // //       toast.error("Failed to fetch course progress");
// // // //     }
// // // //   };

// // // //   const updateProgress = async (enrollmentId, sectionId) => {
// // // //     setUpdatingSection(sectionId);
// // // //     try {
// // // //       await progressApi.updateProgress({
// // // //         enrollmentId,
// // // //         sectionId,
// // // //         timeSpent: 30,
// // // //       });
// // // //       toast.success("Progress updated!");
// // // //       fetchOngoingCourses();
// // // //       if (selectedCourse && selectedCourse._id === enrollmentId) {
// // // //         handleViewProgress(selectedCourse);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Failed to update progress");
// // // //     } finally {
// // // //       setUpdatingSection(null);
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div>
// // // //         <h1 className="text-2xl font-bold text-white">Ongoing Courses</h1>
// // // //         <p className="text-gray-400">Continue your learning journey</p>
// // // //       </div>

// // // //       {enrollments.length > 0 ? (
// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //           {enrollments.map((enrollment) => (
// // // //             <motion.div
// // // //               key={enrollment._id}
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // // //             >
// // // //               <div className="flex items-start justify-between mb-4">
// // // //                 <div className="flex-1">
// // // //                   <h3 className="text-lg font-semibold text-white mb-1">
// // // //                     {enrollment.course?.title || "Untitled Course"}
// // // //                   </h3>
// // // //                   <p className="text-sm text-purple-400">
// // // //                     {enrollment.course?.category || "Uncategorized"}
// // // //                   </p>
// // // //                 </div>
// // // //                 <div
// // // //                   className={`px-2 py-1 rounded text-xs font-medium ${
// // // //                     enrollment.course?.difficulty === "Beginner"
// // // //                       ? "bg-green-900 text-green-300"
// // // //                       : enrollment.course?.difficulty === "Intermediate"
// // // //                       ? "bg-yellow-900 text-yellow-300"
// // // //                       : "bg-red-900 text-red-300"
// // // //                   }`}
// // // //                 >
// // // //                   {enrollment.course?.difficulty || "N/A"}
// // // //                 </div>
// // // //               </div>

// // // //               <p className="text-gray-400 text-sm mb-4 line-clamp-2">
// // // //                 {enrollment.course?.description || "No description"}
// // // //               </p>

// // // //               <div className="mb-4">
// // // //                 <div className="flex items-center justify-between text-sm mb-2">
// // // //                   <span className="text-gray-400">Progress</span>
// // // //                   <span className="text-white">{enrollment.progress || 0}%</span>
// // // //                 </div>
// // // //                 <div className="w-full bg-gray-700 rounded-full h-2">
// // // //                   <div
// // // //                     className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // // //                     style={{ width: `${enrollment.progress || 0}%` }}
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// // // //                 <div className="flex items-center gap-1">
// // // //                   <Clock size={16} />
// // // //                   <span>{enrollment.course?.duration || 0}h</span>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-1">
// // // //                   <Calendar size={16} />
// // // //                   <span>
// // // //                     Started {new Date(enrollment.enrolledAt).toLocaleDateString()}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="flex gap-2">
// // // //                 <button
// // // //                   onClick={() =>
// // // //                     updateProgress(enrollment._id, `section-${Date.now()}`)
// // // //                   }
// // // //                   disabled={updatingSection !== null}
// // // //                   className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
// // // //                 >
// // // //                   <Play size={16} />
// // // //                   Continue
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={() => handleViewProgress(enrollment)}
// // // //                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // // //                 >
// // // //                   <BarChart3 size={16} />
// // // //                   Progress
// // // //                 </button>

// // // //                 <Link
// // // //                   to={`/user/quizzes/${enrollment.course?.courseId}`}
// // // //                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // // //                 >
// // // //                   📝 Quiz
// // // //                 </Link>
// // // //               </div>
// // // //             </motion.div>
// // // //           ))}
// // // //         </div>
// // // //       ) : (
// // // //         <div className="text-center py-12">
// // // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // //             No ongoing courses
// // // //           </h3>
// // // //           <p className="text-gray-500">Enroll in a course to start learning</p>
// // // //         </div>
// // // //       )}

// // // //       {selectedCourse && courseProgress && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <motion.div
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // // //           >
// // // //             <div className="flex justify-between items-center mb-6">
// // // //               <h2 className="text-xl font-bold text-white">
// // // //                 Course Progress: {selectedCourse.course?.title || "Untitled Course"}
// // // //               </h2>
// // // //               <button
// // // //                 onClick={() => setSelectedCourse(null)}
// // // //                 className="text-gray-400 hover:text-white"
// // // //               >
// // // //                 ✕
// // // //               </button>
// // // //             </div>

// // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // //                 <p className="text-2xl font-bold text-purple-400">
// // // //                   {courseProgress.progressPercentage || 0}%
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-sm">Completed</p>
// // // //               </div>
// // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // //                 <p className="text-2xl font-bold text-blue-400">
// // // //                   {courseProgress.completedSections?.length || 0}
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-sm">Sections Done</p>
// // // //               </div>
// // // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // // //                 <p className="text-2xl font-bold text-green-400">
// // // //                   {Math.round((courseProgress.timeSpent || 0) / 60)}h
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-sm">Time Spent</p>
// // // //               </div>
// // // //             </div>

// // // //                      <div className="space-y-3">
// // // //               <h3 className="text-lg font-semibold text-white">Section Progress</h3>
// // // //               {Array.from({ length: courseProgress.totalSections || 0 }, (_, index) => {
// // // //                 const sectionId = `section-${index + 1}`;
// // // //                 const isCompleted = courseProgress.completedSections?.some(
// // // //                   (s) => s.sectionId === sectionId
// // // //                 );

// // // //                 return (
// // // //                   <div
// // // //                     key={sectionId}
// // // //                     className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
// // // //                   >
// // // //                     <div className="flex items-center gap-3">
// // // //                       <div
// // // //                         className={`w-6 h-6 rounded-full flex items-center justify-center ${
// // // //                           isCompleted ? "bg-green-600" : "bg-gray-600"
// // // //                         }`}
// // // //                       >
// // // //                         {isCompleted && <span className="text-white text-sm">✓</span>}
// // // //                       </div>
// // // //                       <span className="text-white">Section {index + 1}</span>
// // // //                     </div>
// // // //                     {!isCompleted ? (
// // // //                       <button
// // // //                         onClick={() => updateProgress(selectedCourse._id, sectionId)}
// // // //                         disabled={updatingSection === sectionId}
// // // //                         className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
// // // //                       >
// // // //                         Mark Complete
// // // //                       </button>
// // // //                     ) : (
// // // //                       <span className="text-green-400 text-sm">Completed</span>
// // // //                     )}
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
















// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useNavigate } from "react-router-dom"
// // // import { motion } from "framer-motion"
// // // import { BookOpen, Clock, Calendar, BarChart3 } from "lucide-react"
// // // import { enrollmentApi } from "../../api/enrollmentApi"
// // // import { progressApi } from "../../api/progressApi"
// // // import { toast } from "react-toastify"
// // // import { sessionManager } from "../../utils/sessionManager"

// // // export default function OngoingCourses() {
// // //   const navigate = useNavigate()
// // //   const [enrollments, setEnrollments] = useState([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [selectedCourse, setSelectedCourse] = useState(null)
// // //   const [courseProgress, setCourseProgress] = useState(null)

// // //   useEffect(() => {
// // //     fetchOngoingCourses()
// // //   }, [])

// // //   const handleViewProgress = async (enrollment) => {
// // //     try {
// // //       const response = await progressApi.getCourseProgress(enrollment.course._id)
// // //       setCourseProgress(response.data?.data)
// // //       setSelectedCourse(enrollment)

// // //       // Save to session
// // //       sessionManager.updateCurrentPage("/user/ongoing-courses", {
// // //         selectedCourseId: enrollment.course._id,
// // //         enrollmentId: enrollment._id,
// // //       })
// // //     } catch (error) {
// // //       toast.error("Failed to fetch course progress")
// // //     }
// // //   }

// // //   const handleNavigateToQuiz = (courseId) => {
// // //     sessionManager.updateCurrentPage(`/user/quizzes/${courseId}`, {
// // //       courseId,
// // //     })
// // //     navigate(`/user/quizzes/${courseId}`)
// // //   }

// // //   const handleNavigateToAssignment = (assignmentId) => {
// // //     sessionManager.updateCurrentPage(`/user/assignments/${assignmentId}`, {
// // //       assignmentId,
// // //     })
// // //     navigate(`/user/assignments/${assignmentId}`)
// // //   }

// // //   const fetchOngoingCourses = async () => {
// // //     try {
// // //       const response = await enrollmentApi.getUserEnrollments("active")
// // //       setEnrollments(response.data?.data || [])

// // //       // Restore selected course from session if available
// // //       const session = sessionManager.getSession()
// // //       if (session?.selectedCourseId) {
// // //         const course = response.data?.data?.find((e) => e.course._id === session.selectedCourseId)
// // //         if (course) {
// // //           handleViewProgress(course)
// // //         }
// // //       }
// // //     } catch (error) {
// // //       toast.error("Failed to fetch ongoing courses")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div>
// // //         <h1 className="text-2xl font-bold text-white">Ongoing Courses</h1>
// // //         <p className="text-gray-400">Continue your learning journey</p>
// // //       </div>

// // //       {enrollments.length > 0 ? (
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           {enrollments.map((enrollment) => (
// // //             <motion.div
// // //               key={enrollment._id}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //             >
// // //               <div className="flex items-start justify-between mb-4">
// // //                 <div className="flex-1">
// // //                   <h3 className="text-lg font-semibold text-white mb-1">
// // //                     {enrollment.course?.title || "Untitled Course"}
// // //                   </h3>
// // //                   <p className="text-sm text-purple-400">{enrollment.course?.category || "Uncategorized"}</p>
// // //                 </div>
// // //                 <div
// // //                   className={`px-2 py-1 rounded text-xs font-medium ${
// // //                     enrollment.course?.difficulty === "Beginner"
// // //                       ? "bg-green-900 text-green-300"
// // //                       : enrollment.course?.difficulty === "Intermediate"
// // //                         ? "bg-yellow-900 text-yellow-300"
// // //                         : "bg-red-900 text-red-300"
// // //                   }`}
// // //                 >
// // //                   {enrollment.course?.difficulty || "N/A"}
// // //                 </div>
// // //               </div>

// // //               <p className="text-gray-400 text-sm mb-4 line-clamp-2">
// // //                 {enrollment.course?.description || "No description"}
// // //               </p>

// // //               <div className="mb-4">
// // //                 <div className="flex items-center justify-between text-sm mb-2">
// // //                   <span className="text-gray-400">Progress</span>
// // //                   <span className="text-white">{enrollment.progress || 0}%</span>
// // //                 </div>
// // //                 <div className="w-full bg-gray-700 rounded-full h-2">
// // //                   <div
// // //                     className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // //                     style={{ width: `${enrollment.progress || 0}%` }}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// // //                 <div className="flex items-center gap-1">
// // //                   <Clock size={16} />
// // //                   <span>{enrollment.course?.duration || 0}h</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-1">
// // //                   <Calendar size={16} />
// // //                   <span>Started {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
// // //                 </div>
// // //               </div>

// // //               <div className="flex gap-2 flex-wrap">
// // //                 <button
// // //                   onClick={() => handleViewProgress(enrollment)}
// // //                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                 >
// // //                   <BarChart3 size={16} />
// // //                   Progress
// // //                 </button>

// // //                 <button
// // //                   onClick={() => handleNavigateToQuiz(enrollment.course._id)}
// // //                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                 >
// // //                   📝 Quiz
// // //                 </button>

// // //                 <button
// // //                   onClick={() => handleNavigateToAssignment(enrollment._id)}
// // //                   className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                 >
// // //                   📋 Assignment
// // //                 </button>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">No ongoing courses</h3>
// // //           <p className="text-gray-500">Enroll in a course to start learning</p>
// // //         </div>
// // //       )}

// // //       {/* Progress Modal */}
// // //       {selectedCourse && courseProgress && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // //           >
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-white">Course Progress: {selectedCourse.course?.title}</h2>
// // //               <button
// // //                 onClick={() => {
// // //                   setSelectedCourse(null)
// // //                   sessionManager.updateCurrentPage("/user/ongoing-courses")
// // //                 }}
// // //                 className="text-gray-400 hover:text-white"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // //                 <p className="text-2xl font-bold text-purple-400">{courseProgress.overallProgress || 0}%</p>
// // //                 <p className="text-gray-400 text-sm">Completed</p>
// // //               </div>
// // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // //                 <p className="text-2xl font-bold text-blue-400">
// // //                   {courseProgress.materialsCompleted || 0}/{courseProgress.totalMaterials || 0}
// // //                 </p>
// // //                 <p className="text-gray-400 text-sm">Materials</p>
// // //               </div>
// // //               <div className="bg-gray-700 rounded-lg p-4 text-center">
// // //                 <p className="text-2xl font-bold text-green-400">
// // //                   {courseProgress.quizzesCompleted || 0}/{courseProgress.totalQuizzes || 0}
// // //                 </p>
// // //                 <p className="text-gray-400 text-sm">Quizzes</p>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }












// // //client/src/pages/dashboard/OngoingCourses.js
// // "use client"

// // import { useEffect, useState } from "react"
// // import { Card } from "../../components/Layouts/Card"
// // import { Button } from "../../components/Layouts/Button"
// // import { Progress } from "../../components/Layouts/progress"

// // export default function OngoingCourses({
// //   courses: initialCourses = [],
// //   loading: initialLoading = false,
// //   onSelectCourseForQuizzes,
// //   onSelectCourseForAssignments,
// // }) {
// //   const [courses, setCourses] = useState(initialCourses)
// //   const [loading, setLoading] = useState(initialLoading)

// //   useEffect(() => {
// //     if (initialCourses.length === 0) {
// //       const fetchOngoingCourses = async () => {
// //         try {
// //           const token = localStorage.getItem("token")
// //           const response = await fetch("/api/enrollments/ongoing", {
// //             headers: { Authorization: `Bearer ${token}` },
// //           })
// //           if (response.ok) {
// //             const data = await response.json()
// //             setCourses(data)
// //           }
// //         } catch (error) {
// //           console.error("Error fetching ongoing courses:", error)
// //         } finally {
// //           setLoading(false)
// //         }
// //       }

// //       fetchOngoingCourses()
// //     }
// //   }, [initialCourses])

// //   if (loading) return <div className="text-center py-8">Loading...</div>

// //   return (
// //     <div className="space-y-4">
// //       <h2 className="text-2xl font-bold mb-6">Ongoing Courses</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {courses.map((course) => (
// //           <Card key={course._id} className="p-6">
// //             <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
// //             <p className="text-gray-600 text-sm mb-4">{course.description}</p>
// //             <div className="mb-4">
// //               <div className="flex justify-between text-sm mb-2">
// //                 <span>Progress</span>
// //                 <span>{course.progress || 0}%</span>
// //               </div>
// //               <Progress value={course.progress || 0} className="h-2" />
// //             </div>
// //             <div className="flex gap-2">
// //               <Button size="sm" variant="outline" onClick={() => onSelectCourseForQuizzes?.(course._id)}>
// //                 Quizzes
// //               </Button>
// //               <Button size="sm" variant="outline" onClick={() => onSelectCourseForAssignments?.(course._id)}>
// //                 Assignments
// //               </Button>
// //             </div>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }










// //client/src/pages/dashboard/OngoingCourses.js
// import { useEffect, useState } from "react"
// import { Button } from "../../components/Layouts/Button"
// import { Card } from "../../components/Layouts/Card"
// import { Progress } from "../../components/Layouts/progress"

// export default function OngoingCourses({
//   courses: initialCourses = [],
//   loading: initialLoading = false,
//   onSelectCourseForQuizzes,
//   onSelectCourseForAssignments,
// }) {
//   const [courses, setCourses] = useState(initialCourses)
//   const [loading, setLoading] = useState(initialLoading)

//   useEffect(() => {
//     if (initialCourses.length === 0) {
//       const fetchOngoingCourses = async () => {
//         try {
//           const token = localStorage.getItem("token")
//           const response = await fetch("/api/enrollments/ongoing", {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//           if (response.ok) {
//             const result = await response.json()
//             setCourses(result.data || result)
//           }
//         } catch (error) {
//           console.error("Error fetching ongoing courses:", error)
//         } finally {
//           setLoading(false)
//         }
//       }

//       fetchOngoingCourses()
//     }
//   }, [initialCourses])

//   if (loading) return <div className="text-center py-8">Loading...</div>

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-6">Ongoing Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {courses.map((course) => (
//           <Card key={course._id} className="p-6">
//             <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
//             <p className="text-gray-600 text-sm mb-4">{course.description}</p>
//             <div className="mb-4">
//               <div className="flex justify-between text-sm mb-2">
//                 <span>Progress</span>
//                 <span>{course.progress || 0}%</span>
//               </div>
//               <Progress value={course.progress || 0} className="h-2" />
//             </div>
//             <div className="flex gap-2">
//               <Button 
//                 size="sm" 
//                 variant="outline" 
//                 onClick={() => onSelectCourseForQuizzes && onSelectCourseForQuizzes(course._id)}
//               >
//                 Quizzes
//               </Button>
//               <Button 
//                 size="sm" 
//                 variant="outline" 
//                 onClick={() => onSelectCourseForAssignments && onSelectCourseForAssignments(course._id)}
//               >
//                 Assignments
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }









// client/src/pages/dashboard/OngoingCourses.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Link as LinkIcon,
  Clock,
  CheckCircle,
  Play,
  Download,
  X,
  Eye,
  TrendingUp,
  Award,
  File,
  FileQuestion,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OngoingCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    fetchOngoingCourses();
    fetchCertCount();
  }, []);

  const fetchCertCount = async () => {
    try {
      const response = await axios.get("/certificates/count");
      setCertCount(response.data?.data?.count || 0);
    } catch (error) {
      console.error("Failed to fetch certificate count", error);
    }
  };

  const fetchOngoingCourses = async () => {
    try {
      const response = await axios.get("/enrollments/ongoing");
      setCourses(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Failed to fetch ongoing courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseMaterials = async (courseId) => {
    setLoadingMaterials(true);
    try {
      const [materialsRes, progressRes] = await Promise.all([
        axios.get(`/api/materials/course/${courseId}`),
        axios.get(`/progress/course/${courseId}`),
      ]);

      setCourseMaterials(materialsRes.data?.data || []);
      setCourseProgress(progressRes.data?.data || null);
    } catch (error) {
      toast.error("Failed to fetch course materials");
    } finally {
      setLoadingMaterials(false);
    }
  };

  const handleViewMaterials = async (course) => {
    setSelectedCourse(course);
    setShowMaterialsModal(true);
    await fetchCourseMaterials(course._id);
  };

  const handleMarkMaterialViewed = async (materialId) => {
    if (!selectedCourse) return;

    try {
      await axios.post("/materials/view", {
        courseId: selectedCourse._id,
        materialId,
        duration: 0,
      });

      await fetchCourseMaterials(selectedCourse._id);
      await fetchOngoingCourses();
      toast.success("Material marked as viewed!");
    } catch (error) {
      toast.error("Failed to mark material as viewed");
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video size={20} className="text-blue-500" />;
      case "pdf":
      case "document":
        return <FileText size={20} className="text-red-500" />;
      case "link":
        return <LinkIcon size={20} className="text-green-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      General: "from-gray-500 to-gray-600",
      Cybersecurity: "from-red-500 to-red-600",
      Programming: "from-blue-500 to-blue-600",
      "Data Science": "from-purple-500 to-purple-600",
      Networking: "from-green-500 to-green-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <ToastContainer />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              My Ongoing Courses
            </h1>
            <p className="text-slate-600">Continue your learning journey</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{courses.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Average Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avg Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {courses.length > 0
                    ? Math.round(
                      courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length
                    )
                    : 0}
                  %
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Certificates</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {certCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No ongoing courses</h3>
            <p className="text-slate-600 mb-6">Enroll in courses to start learning</p>
            <button
              onClick={() => (window.location.href = "/dashboard/courses")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Course Header */}
                <div
                  className={`bg-gradient-to-r ${getCategoryColor(
                    course.category
                  )} p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 inline-block">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold line-clamp-2 mb-2">{course.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{course.description}</p>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Progress</span>
                      <span className="text-sm font-bold text-purple-600">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress || 0}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} className="text-blue-500" />
                      <span>{course.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Award size={16} className="text-yellow-500" />
                      <span className="capitalize">{course.difficulty}</span>
                    </div>
                    {course.instructor && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">
                            {course.instructor.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span>{course.instructor}</span>
                      </div>
                    )}
                  </div>

                  {/* View Materials Button */}
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewMaterials(course)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <Play size={18} />
                      Materials
                    </button>
                    <button
                      onClick={() => navigate(`/user/quizzes/${course._id}`)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all border border-gray-600"
                    >
                      <FileQuestion size={18} />
                      Quizzes
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Materials Modal */}
      <AnimatePresence>
        {showMaterialsModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div
                className={`bg-gradient-to-r ${getCategoryColor(
                  selectedCourse.category
                )} text-white p-6`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
                    <p className="text-white/80 text-sm">{selectedCourse.description}</p>
                    {courseProgress && (
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Video size={16} />
                          <span className="text-sm">
                            {courseProgress.materialsCompleted}/{courseProgress.totalMaterials}{" "}
                            Materials
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} />
                          <span className="text-sm">{courseProgress.overallProgress}% Complete</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowMaterialsModal(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {loadingMaterials ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  </div>
                ) : courseMaterials.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No materials available yet
                    </h3>
                    <p className="text-slate-600">
                      The instructor hasn't added any materials to this course yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courseMaterials.map((material, index) => (
                      <motion.div
                        key={material._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-slate-50 rounded-xl p-5 border-2 transition-all ${material.viewed
                          ? "border-green-300 bg-green-50"
                          : "border-slate-200 hover:border-purple-300"
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${material.viewed ? "bg-green-100" : "bg-white"
                              }`}
                          >
                            {material.viewed ? (
                              <CheckCircle className="text-green-600" size={24} />
                            ) : (
                              getTypeIcon(material.type)
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="font-bold text-slate-900 text-lg">
                                {material.title}
                              </h4>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 capitalize ${material.viewed
                                  ? "bg-green-200 text-green-700"
                                  : "bg-purple-100 text-purple-700"
                                  }`}
                              >
                                {material.type}
                              </span>
                            </div>

                            {material.description && (
                              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                {material.description}
                              </p>
                            )}

                            <div className="flex items-center gap-4 mb-3">
                              {material.duration > 0 && (
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                  <Clock size={14} />
                                  <span>{Math.round(material.duration / 60)} minutes</span>
                                </div>
                              )}
                              {material.viewed && (
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                  <CheckCircle size={14} />
                                  Completed
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 flex-wrap">
                              {material.url && (
                                <a
                                  href={material.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                                >
                                  <Eye size={16} />
                                  Open Material
                                </a>
                              )}
                              {material.fileUrl && (
                                <a
                                  href={material.fileUrl}
                                  download
                                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                                >
                                  <Download size={16} />
                                  Download
                                </a>
                              )}
                              {!material.viewed && (
                                <button
                                  onClick={() => handleMarkMaterialViewed(material._id)}
                                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                                >
                                  <CheckCircle size={16} />
                                  Mark as Complete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {courseProgress && (
                <div className="border-t border-slate-200 p-6 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Overall Course Progress</p>
                      <div className="flex items-center gap-3">
                        <div className="w-48 bg-slate-200 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${courseProgress.overallProgress}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {courseProgress.overallProgress}%
                        </span>
                      </div>
                    </div>
                    {courseProgress.certificateGenerated && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-semibold shadow-lg">
                        <Award size={20} />
                        <span>Certificate Earned!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
