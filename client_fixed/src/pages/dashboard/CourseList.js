

// // // // //client/src/pages/course/CourseList.js (Updated)

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { motion } from "framer-motion";
// // // // import {
// // // //   BookOpen,
// // // //   Clock,
// // // //   Users,
// // // //   Star,
// // // //   Search,
// // // //   Filter,
// // // //   Play,
// // // // } from "lucide-react";
// // // // import { courseApi } from "../../api/courseApi";
// // // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // // import { toast } from "react-toastify";
// // // // import { Card } from "../../components/Layouts/Card";

// // // // export default function CourseList() {
// // // //   const [courses, setCourses] = useState([]);
// // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // // //   const [selectedDifficulty, setSelectedDifficulty] = useState("all");
// // // //   const [enrolling, setEnrolling] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, []);

  
// // // // const handleEnroll = async (courseId) => {
// // // //   setEnrolling(courseId);
// // // //   try {
// // // //     await enrollmentApi.enrollInCourse(courseId);
// // // //     toast.success("Successfully enrolled in course!");
// // // //     fetchData();
// // // //   } catch (error) {
// // // //     toast.error(error.response?.data?.message || "Failed to enroll in course");
// // // //   } finally {
// // // //     setEnrolling(null);
// // // //   }
// // // // };




// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const [coursesResponse, enrollmentsResponse] = await Promise.all([
// // // //         courseApi.getCourses(),
// // // //         enrollmentApi.getUserEnrollments(),
// // // //       ]);
// // // //       setCourses(coursesResponse.data.data.courses || []);
// // // //       setEnrolledCourses(
// // // //         (enrollmentsResponse.data.data || []).filter((e) => e.course)
// // // //       );
// // // //     } catch (error) {
// // // //       toast.error("Failed to fetch courses");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const isEnrolled = (courseId) =>
// // // //     enrolledCourses.some((e) => e.course && e.course._id === courseId);

// // // //   const getEnrollment = (courseId) =>
// // // //     enrolledCourses.find((e) => e.course && e.course._id === courseId);

// // // //   const categories = [...new Set(courses.map((course) => course.category))];
// // // //   const difficulties = ["Beginner", "Intermediate", "Advanced"];

// // // //   const filteredCourses = courses.filter((course) => {
// // // //     const matchesSearch =
// // // //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //       course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //       course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
// // // //     const matchesCategory =
// // // //       selectedCategory === "all" || course.category === selectedCategory;
// // // //     const matchesDifficulty =
// // // //       selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
// // // //     return matchesSearch && matchesCategory && matchesDifficulty;
// // // //   });

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6 p-4">
// // // //       {/* Header */}
// // // //       <div>
// // // //         <h1 className="text-2xl font-bold text-black">Available Courses</h1>
// // // //         <p className="text-gray-600">
// // // //           Discover and enroll in courses to enhance your skills
// // // //         </p>
// // // //       </div>

// // // //       {/* Filters */}
// // // //       <div className="flex flex-col lg:flex-row gap-4">
// // // //         <div className="relative flex-1">
// // // //           <Search
// // // //             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
// // // //             size={20}
// // // //           />
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search courses..."
// // // //             value={searchTerm}
// // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // //             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500"
// // // //           />
// // // //         </div>
// // // //         <div className="flex gap-4">
// // // //           <div className="flex items-center gap-2">
// // // //             <Filter className="text-gray-600" size={20} />
// // // //             <select
// // // //               value={selectedCategory}
// // // //               onChange={(e) => setSelectedCategory(e.target.value)}
// // // //               className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-black"
// // // //             >
// // // //               <option value="all">All Categories</option>
// // // //               {categories.map((category) => (
// // // //                 <option key={category} value={category}>
// // // //                   {category}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>
// // // //           <select
// // // //             value={selectedDifficulty}
// // // //             onChange={(e) => setSelectedDifficulty(e.target.value)}
// // // //             className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-black"
// // // //           >
// // // //             <option value="all">All Levels</option>
// // // //             {difficulties.map((level) => (
// // // //               <option key={level} value={level}>
// // // //                 {level}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //       </div>

// // // //       {/* Courses Grid */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {filteredCourses.map((course) => {
// // // //           const enrolled = isEnrolled(course._id);
// // // //           const enrollment = getEnrollment(course._id);

// // // //           return (
// // // //             <motion.div
// // // //               key={course._id}
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //             >
// // // //               <Card bgColor="bg-white" borderColor="border-gray-300">
// // // //                 <div className="flex justify-between items-start mb-3">
// // // //                   <div className="flex-1">
// // // //                     <h3 className="text-lg font-semibold mb-1">
// // // //                       {course.title}
// // // //                     </h3>
                    
// // // //                     {/* ADDED: Course ID for reference */}
// // // //                     <p className="text-xs text-gray-400 mb-1">ID: {course.courseId}</p>

// // // //                     <p className="text-sm text-gray-500">{course.category}</p>
// // // //                     <p className="text-sm text-gray-600 mt-1">
// // // //                       Instructor:{" "}
// // // //                       <span className="text-black">
// // // //                         {course.instructor || "TBA"}
// // // //                       </span>
// // // //                     </p>
// // // //                   </div>
// // // //                   <div
// // // //                     className={`px-2 py-1 rounded text-xs font-medium ${
// // // //                       course.difficulty === "Beginner"
// // // //                         ? "bg-green-100 text-green-800"
// // // //                         : course.difficulty === "Intermediate"
// // // //                         ? "bg-yellow-100 text-yellow-800"
// // // //                         : "bg-red-100 text-red-800"
// // // //                     }`}
// // // //                   >
// // // //                     {course.difficulty}
// // // //                   </div>
// // // //                 </div>

// // // //                 <p className="text-gray-700 text-sm mb-4 line-clamp-3">
// // // //                   {course.description}
// // // //                 </p>

// // // //                 <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
// // // //                   <div className="flex items-center gap-1">
// // // //                     <Clock size={16} />
// // // //                     <span>{course.duration}h</span>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-1">
// // // //                     <Users size={16} />
// // // //                     <span>{course.enrollmentCount || 0}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-1">
// // // //                     <Star size={16} />
// // // //                     <span>4.5</span>
// // // //                   </div>
// // // //                 </div>

// // // //                 {enrolled ? (
// // // //                   <>
// // // //                     <div className="flex items-center justify-between text-sm mb-2">
// // // //                       <span className="text-gray-600">Progress</span>
// // // //                       <span className="text-black">
// // // //                         {enrollment?.progress || 0}%
// // // //                       </span>
// // // //                     </div>
// // // //                     <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
// // // //                       <div
// // // //                         className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // // //                         style={{
// // // //                           width: `${enrollment?.progress || 0}%`,
// // // //                         }}
// // // //                       />
// // // //                     </div>
// // // //                     <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
// // // //                       <Play size={16} /> Continue Learning
// // // //                     </button>
// // // //                   </>
// // // //                 ) : (
// // // //                   <button
// // // //                     onClick={() => handleEnroll(course._id)}
// // // //                     disabled={enrolling === course._id}
// // // //                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors"
// // // //                   >
// // // //                     {enrolling === course._id ? "Enrolling..." : "Enroll Now"}
// // // //                   </button>
// // // //                 )}
// // // //               </Card>
// // // //             </motion.div>
// // // //           );
// // // //         })}
// // // //       </div>

// // // //       {/* Empty State */}
// // // //       {filteredCourses.length === 0 && (
// // // //         <div className="text-center py-12">
// // // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // //             No courses found
// // // //           </h3>
// // // //           <p className="text-gray-500">
// // // //                         Try adjusting your search or filter criteria to find something that fits your goals.
// // // //           </p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }



















// // // //client/src/pages/course/CourseList.js

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   BookOpen,
// // //   Clock,
// // //   Users,
// // //   Star,
// // //   Search,
// // //   Filter,
// // //   Play,
// // // } from "lucide-react";
// // // // Assuming courseApi and enrollmentApi are configured correctly
// // // import { courseApi } from "../../api/courseApi"; 
// // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // import { toast } from "react-toastify";
// // // import { Card } from "../../components/Layouts/Card";

// // // export default function CourseList() {
// // //   const [courses, setCourses] = useState([]);
// // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // //   const [selectedDifficulty, setSelectedDifficulty] = useState("all");
// // //   const [enrolling, setEnrolling] = useState(null);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

  
// // // const handleEnroll = async (courseId) => {
// // //   setEnrolling(courseId);
// // //   try {
// // //     // courseId here is the MongoDB _id
// // //     await enrollmentApi.enrollInCourse(courseId); 
// // //     toast.success("Successfully enrolled in course!");
// // //     fetchData();
// // //   } catch (error) {
// // //     // If the error is the Cast error, you'll still see it, but enrollment succeeds for valid courses.
// // //     toast.error(error.response?.data?.message || "Failed to enroll in course");
// // //   } finally {
// // //     setEnrolling(null);
// // //   }
// // // };


// // //   const fetchData = async () => {
// // //     try {
// // //       const [coursesResponse, enrollmentsResponse] = await Promise.all([
// // //         courseApi.getCourses(),
// // //         enrollmentApi.getUserEnrollments(),
// // //       ]);
// // //       setCourses(coursesResponse.data.data.courses || []);
// // //       // Filter out enrollments that failed population due to the bad data
// // //       setEnrolledCourses(
// // //         (enrollmentsResponse.data.data || []).filter((e) => e.course) 
// // //       );
// // //     } catch (error) {
// // //       // The error might originate here during population
// // //       toast.error("Failed to fetch courses or enrollments. Check console for Mongoose errors.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const isEnrolled = (courseId) =>
// // //     enrolledCourses.some((e) => e.course && e.course._id === courseId);

// // //   const getEnrollment = (courseId) =>
// // //     enrolledCourses.find((e) => e.course && e.course._id === courseId);

// // //   const categories = [...new Set(courses.map((course) => course.category))];
// // //   const difficulties = ["Beginner", "Intermediate", "Advanced"];

// // //   const filteredCourses = courses.filter((course) => {
// // //     const matchesSearch =
// // //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
// // //     const matchesCategory =
// // //       selectedCategory === "all" || course.category === selectedCategory;
// // //     const matchesDifficulty =
// // //       selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
// // //     return matchesSearch && matchesCategory && matchesDifficulty;
// // //   });

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6 p-4">
// // //       {/* Header */}
// // //       <div>
// // //         <h1 className="text-2xl font-bold text-black">Available Courses</h1>
// // //         <p className="text-gray-600">
// // //           Discover and enroll in courses to enhance your skills
// // //         </p>
// // //       </div>

// // //       {/* Filters */}
// // //       <div className="flex flex-col lg:flex-row gap-4">
// // //         <div className="relative flex-1">
// // //           <Search
// // //             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
// // //             size={20}
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Search courses..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500"
// // //           />
// // //         </div>
// // //         <div className="flex gap-4">
// // //           <div className="flex items-center gap-2">
// // //             <Filter className="text-gray-600" size={20} />
// // //             <select
// // //               value={selectedCategory}
// // //               onChange={(e) => setSelectedCategory(e.target.value)}
// // //               className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-black"
// // //             >
// // //               <option value="all">All Categories</option>
// // //               {categories.map((category) => (
// // //                 <option key={category} value={category}>
// // //                   {category}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <select
// // //             value={selectedDifficulty}
// // //             onChange={(e) => setSelectedDifficulty(e.target.value)}
// // //             className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-black"
// // //           >
// // //             <option value="all">All Levels</option>
// // //             {difficulties.map((level) => (
// // //               <option key={level} value={level}>
// // //                 {level}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {/* Courses Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {filteredCourses.map((course) => {
// // //           const enrolled = isEnrolled(course._id);
// // //           const enrollment = getEnrollment(course._id);

// // //           return (
// // //             <motion.div
// // //               key={course._id}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //             >
// // //               <Card bgColor="bg-white" borderColor="border-gray-300">
// // //                 <div className="flex justify-between items-start mb-3">
// // //                   <div className="flex-1">
// // //                     <h3 className="text-lg font-semibold mb-1">
// // //                       {course.title}
// // //                     </h3>
                    
// // //                     {/* ADDED: Course ID for reference */}
// // //                     <p className="text-xs text-gray-400 mb-1">ID: {course.courseId}</p>

// // //                     <p className="text-sm text-gray-500">{course.category}</p>
// // //                     <p className="text-sm text-gray-600 mt-1">
// // //                       Instructor:{" "}
// // //                       <span className="text-black">
// // //                         {course.instructor || "TBA"}
// // //                       </span>
// // //                     </p>
// // //                   </div>
// // //                   <div
// // //                     className={`px-2 py-1 rounded text-xs font-medium ${
// // //                       course.difficulty === "Beginner"
// // //                         ? "bg-green-100 text-green-800"
// // //                         : course.difficulty === "Intermediate"
// // //                         ? "bg-yellow-100 text-yellow-800"
// // //                         : "bg-red-100 text-red-800"
// // //                     }`}
// // //                   >
// // //                     {course.difficulty}
// // //                   </div>
// // //                 </div>

// // //                 <p className="text-gray-700 text-sm mb-4 line-clamp-3">
// // //                   {course.description}
// // //                 </p>

// // //                 <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
// // //                   <div className="flex items-center gap-1">
// // //                     <Clock size={16} />
// // //                     <span>{course.duration}h</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-1">
// // //                     <Users size={16} />
// // //                     <span>{course.enrollmentCount || 0}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-1">
// // //                     <Star size={16} />
// // //                     <span>4.5</span>
// // //                   </div>
// // //                 </div>

// // //                 {enrolled ? (
// // //                   <>
// // //                     <div className="flex items-center justify-between text-sm mb-2">
// // //                       <span className="text-gray-600">Progress</span>
// // //                       <span className="text-black">
// // //                         {enrollment?.progress || 0}%
// // //                       </span>
// // //                     </div>
// // //                     <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
// // //                       <div
// // //                         className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// // //                         style={{
// // //                           width: `${enrollment?.progress || 0}%`,
// // //                         }}
// // //                       />
// // //                     </div>
// // //                     {/* ✅ FIX: "Continue Learning" button is now an anchor/link */}
// // //                     <a 
// // //                       href={`/course/${course._id}`} // Placeholder for your course detail route
// // //                       className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                     >
// // //                       <Play size={16} /> Continue Learning
// // //                     </a>
// // //                   </>
// // //                 ) : (
// // //                   <button
// // //                     onClick={() => handleEnroll(course._id)}
// // //                     disabled={enrolling === course._id}
// // //                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors"
// // //                   >
// // //                     {enrolling === course._id ? "Enrolling..." : "Enroll Now"}
// // //                   </button>
// // //                 )}
// // //               </Card>
// // //             </motion.div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Empty State */}
// // //       {filteredCourses.length === 0 && (
// // //         <div className="text-center py-12">
// // //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // //             No courses found
// // //           </h3>
// // //           <p className="text-gray-500">
// // //                         Try adjusting your search or filter criteria to find something that fits your goals.
// // //           </p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }














// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion } from "framer-motion"
// // import { BookOpen, Clock, Users, Star, Search, Play, Video } from "lucide-react"
// // import { courseApi } from "../../api/courseApi"
// // import { enrollmentApi } from "../../api/enrollmentApi"
// // import { toast } from "react-toastify"

// // export default function CourseList() {
// //   const [courses, setCourses] = useState([])
// //   const [enrolledCourses, setEnrolledCourses] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedCategory, setSelectedCategory] = useState("all")
// //   const [selectedDifficulty, setSelectedDifficulty] = useState("all")
// //   const [enrolling, setEnrolling] = useState(null)
// //   const [selectedCourse, setSelectedCourse] = useState(null)
// //   const [showCourseDetail, setShowCourseDetail] = useState(false)

// //   useEffect(() => {
// //     fetchData()
// //   }, [])

// //   const fetchData = async () => {
// //     try {
// //       const [coursesResponse, enrollmentsResponse] = await Promise.all([
// //         courseApi.getCourses(),
// //         enrollmentApi.getUserEnrollments(),
// //       ])

// //       setCourses(coursesResponse.data.data.courses || [])
// //       setEnrolledCourses(enrollmentsResponse.data.data || [])
// //     } catch (error) {
// //       toast.error("Failed to fetch courses")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleEnroll = async (courseId) => {
// //     setEnrolling(courseId)
// //     try {
// //       await enrollmentApi.enrollInCourse(courseId)
// //       toast.success("Successfully enrolled in course!")
// //       fetchData()
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to enroll in course")
// //     } finally {
// //       setEnrolling(null)
// //     }
// //   }

// //   const isEnrolled = (courseId) => {
// //     return enrolledCourses.some((enrollment) => enrollment.course._id === courseId)
// //   }

// //   const getEnrollment = (courseId) => {
// //     return enrolledCourses.find((enrollment) => enrollment.course._id === courseId)
// //   }

// //   const categories = [...new Set(courses.map((course) => course.category))]
// //   const difficulties = ["Beginner", "Intermediate", "Advanced"]

// //   const filteredCourses = courses.filter((course) => {
// //     const matchesSearch =
// //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       course.description.toLowerCase().includes(searchTerm.toLowerCase())

// //     const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
// //     const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

// //     return matchesSearch && matchesCategory && matchesDifficulty
// //   })

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-bold text-white">Available Courses</h1>
// //         <p className="text-gray-400">Discover and enroll in courses to enhance your skills</p>
// //       </div>

// //       {/* Filters */}
// //       <div className="flex flex-col lg:flex-row gap-4">
// //         <div className="relative flex-1">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //           <input
// //             type="text"
// //             placeholder="Search courses..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
// //           />
// //         </div>
// //         <div className="flex gap-4">
// //           <select
// //             value={selectedCategory}
// //             onChange={(e) => setSelectedCategory(e.target.value)}
// //             className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
// //           >
// //             <option value="all">All Categories</option>
// //             {categories.map((category) => (
// //               <option key={category} value={category}>
// //                 {category}
// //               </option>
// //             ))}
// //           </select>
// //           <select
// //             value={selectedDifficulty}
// //             onChange={(e) => setSelectedDifficulty(e.target.value)}
// //             className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
// //           >
// //             <option value="all">All Levels</option>
// //             {difficulties.map((difficulty) => (
// //               <option key={difficulty} value={difficulty}>
// //                 {difficulty}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       {/* Courses Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredCourses.map((course) => {
// //           const enrolled = isEnrolled(course._id)
// //           const enrollment = getEnrollment(course._id)

// //           return (
// //             <motion.div
// //               key={course._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors"
// //             >
// //               <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
// //                 <BookOpen size={48} className="text-white opacity-80" />
// //               </div>

// //               <div className="p-6">
// //                 <div className="flex justify-between items-start mb-3">
// //                   <div className="flex-1">
// //                     <h3 className="text-lg font-semibold text-white mb-1">{course.title}</h3>
// //                     <p className="text-sm text-purple-400">{course.category}</p>
// //                   </div>
// //                   <div
// //                     className={`px-2 py-1 rounded text-xs font-medium ${
// //                       course.difficulty === "Beginner"
// //                         ? "bg-green-900 text-green-300"
// //                         : course.difficulty === "Intermediate"
// //                           ? "bg-yellow-900 text-yellow-300"
// //                           : "bg-red-900 text-red-300"
// //                     }`}
// //                   >
// //                     {course.difficulty}
// //                   </div>
// //                 </div>

// //                 <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>

// //                 <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// //                   <div className="flex items-center gap-1">
// //                     <Clock size={16} />
// //                     <span>{course.duration}h</span>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <Users size={16} />
// //                     <span>{course.enrollmentCount || 0}</span>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <Star size={16} />
// //                     <span>{course.averageRating || 0}</span>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <Video size={16} />
// //                     <span>{course.materials?.length || 0}</span>
// //                   </div>
// //                 </div>

// //                 <div className="mb-4">
// //                   <p className="text-sm text-gray-400">
// //                     Instructor: <span className="text-white">{course.instructor?.name || "TBA"}</span>
// //                   </p>
// //                 </div>

// //                 <div className="space-y-2">
// //                   {enrolled ? (
// //                     <div className="space-y-2">
// //                       <div className="flex items-center justify-between text-sm">
// //                         <span className="text-gray-400">Progress</span>
// //                         <span className="text-white">{enrollment?.progress || 0}%</span>
// //                       </div>
// //                       <div className="w-full bg-gray-700 rounded-full h-2">
// //                         <div
// //                           className="bg-purple-600 h-2 rounded-full transition-all duration-300"
// //                           style={{ width: `${enrollment?.progress || 0}%` }}
// //                         />
// //                       </div>
// //                       <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
// //                         <Play size={16} />
// //                         Continue Learning
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={() => handleEnroll(course._id)}
// //                       disabled={enrolling === course._id}
// //                       className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition-colors"
// //                     >
// //                       {enrolling === course._id ? "Enrolling..." : "Enroll Now"}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )
// //         })}
// //       </div>

// //       {/* Empty State */}
// //       {filteredCourses.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold text-gray-400 mb-2">No courses found</h3>
// //           <p className="text-gray-500">Try adjusting your search or filter criteria</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }










// // //client/src/pages/dashboard/CourseList.js
// // "use client"

// // import { useEffect, useState } from "react"
// // import { Button } from "../../components/Layouts/Button"
// // import { Card } from "../../components/Layouts/Card"


// // export default function CourseList() {
// //   const [courses, setCourses] = useState([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const token = localStorage.getItem("token")
// //         const response = await fetch("/api/courses", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         if (response.ok) {
// //           const data = await response.json()
// //           setCourses(data)
// //         }
// //       } catch (error) {
// //         console.error("Error fetching courses:", error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchCourses()
// //   }, [])

// //   if (loading) return <div className="text-center py-8">Loading courses...</div>

// //   return (
// //     <div className="space-y-4">
// //       <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {courses.map((course) => (
// //           <Card key={course._id} className="p-6 hover:shadow-lg transition">
// //             <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
// //             <p className="text-gray-600 text-sm mb-4">{course.description}</p>
// //             <Button className="w-full">Enroll Now</Button>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }







// //client/src/pages/dashboard/CourseList.js  
// // client/src/pages/dashboard/CourseList.js  

// import { useEffect, useState } from "react"
// import { Button } from "../../components/Layouts/Button"
// import { Card } from "../../components/Layouts/Card"

// export default function CourseList() {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await fetch("/api/courses", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
        
//         if (response.ok) {
//           const result = await response.json()
//           // Backend returns data wrapped in { data: [...] }
//           setCourses(result.data || result)
//         } else {
//           setError("Failed to fetch courses")
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error)
//         setError("Error fetching courses")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [])

//   const handleEnroll = async (courseId) => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/enrollments/${courseId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         alert("Enrolled successfully!")
//       } else {
//         const err = await response.json()
//         alert(err.message || "Failed to enroll")
//       }
//     } catch (error) {
//       console.error("Error enrolling:", error)
//       alert("Error enrolling in course")
//     }
//   }

//   if (loading) return <div className="text-center py-8">Loading courses...</div>
//   if (error) return <div className="text-center py-8 text-red-600">{error}</div>
//   if (courses.length === 0) return <div className="text-center py-8">No courses available.</div>

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <Card key={course._id} className="p-6 hover:shadow-lg transition">
//             <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
//             <p className="text-gray-600 text-sm mb-4">{course.description}</p>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-sm text-gray-500">Duration: {course.duration || 'N/A'}</span>
//               <span className="text-sm font-medium text-blue-600">{course.difficulty || 'Beginner'}</span>
//             </div>
//             <Button 
//               className="w-full"
//               onClick={() => handleEnroll(course._id)}
//             >
//               Enroll Now
//             </Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }


















// client/src/pages/dashboard/CourseList.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Award,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import axios from "../../api/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const COURSE_CATEGORIES = [
  "All Categories",
  "General",
  "Cybersecurity",
  "Programming",
  "Data Science",
  "Networking",
];

const DIFFICULTY_LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const DIFFICULTY_BADGES = {
  Beginner: "bg-green-100 text-green-700 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Advanced: "bg-red-100 text-red-700 border-red-300",
};

const CATEGORY_COLORS = {
  General: "from-gray-500 to-gray-600",
  Cybersecurity: "from-red-500 to-red-600",
  Programming: "from-blue-500 to-blue-600",
  "Data Science": "from-purple-500 to-purple-600",
  Networking: "from-green-500 to-green-600",
};

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const fetchCourses = async () => {
    try {
      const params = {};
      
      if (selectedCategory !== "All Categories") {
        params.category = selectedCategory;
      }
      if (selectedDifficulty !== "All Levels") {
        params.difficulty = selectedDifficulty;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await axios.get("/courses", { params });
      setCourses(response.data?.data?.courses || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollCourse = async (courseId) => {
    setEnrolling(courseId);
    try {
      await axios.post("/enrollments/enroll", { courseId });
      toast.success("Successfully enrolled in course!");
      fetchCourses(); // Refresh to update enrollment status
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to enroll in course");
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <ToastContainer position="bottom-right" theme="colored" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Explore Courses
            </h1>
            <p className="text-slate-600">Discover and enroll in courses to start learning</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-indigo-600 mt-1">{courses.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {new Set(courses.map(c => c.category)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avg Duration</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {courses.length > 0
                    ? (courses.reduce((sum, c) => sum + c.duration, 0) / courses.length).toFixed(1)
                    : 0}h
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Popular</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {courses.filter(c => (c.enrollmentCount || 0) > 10).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer bg-white"
                >
                  {COURSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1">
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer bg-white"
                >
                  {DIFFICULTY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex-[2]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Available Courses</h2>
          <span className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl text-sm shadow-md">
            {courses.length} {courses.length === 1 ? "Course" : "Courses"}
          </span>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Course Header with Category Gradient */}
                <div
                  className={`bg-gradient-to-r ${
                    CATEGORY_COLORS[course.category] || "from-gray-500 to-gray-600"
                  } p-5 relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white uppercase tracking-wide">
                        {course.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          DIFFICULTY_BADGES[course.difficulty]
                        }`}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">{course.description}</p>

                  {/* Course Meta Info */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-indigo-500" />
                      </div>
                      <span className="font-mono font-medium">{course.courseId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-purple-500" />
                      </div>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-blue-500" />
                      </div>
                      <span>{course.duration} hours</span>
                    </div>
                    {course.enrollmentCount > 0 && (
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Star size={16} className="text-green-500" />
                        </div>
                        <span>{course.enrollmentCount} students enrolled</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  {course.isEnrolled ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-600 rounded-xl font-semibold text-sm">
                      <CheckCircle size={18} />
                      Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnrollCourse(course._id)}
                      disabled={enrolling === course._id}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {enrolling === course._id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <BookOpen size={18} />
                          Enroll Now
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}