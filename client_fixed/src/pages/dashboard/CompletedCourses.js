// // //client/src/pages/dashboard/CompletedCourses.js

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import { Award, Calendar, Download, Star, BookOpen } from "lucide-react";
// // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // import { certificateApi } from "../../api/certificateApi";
// // // import { toast } from "react-toastify";
// // // import Layout from "../../components/Layouts/Layouts";
// // // import { useTheme } from "../../context/ThemeContext";

// // // export default function CompletedCourses() {
// // //   const [completedEnrollments, setCompletedEnrollments] = useState([]);
// // //   const [certificates, setCertificates] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const theme = useTheme(); // for gradient background

// // //   useEffect(() => {
// // //     fetchCompletedCourses();
// // //   }, []);

// // //   const fetchCompletedCourses = async () => {
// // //     try {
// // //       const [enrollmentsResponse, certificatesResponse] = await Promise.all([
// // //         enrollmentApi.getUserEnrollments("completed"),
// // //         certificateApi.getUserCertificates(),
// // //       ]);

// // //       setCompletedEnrollments(enrollmentsResponse.data.data || []);
// // //       setCertificates(certificatesResponse.data.data || []);
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Failed to fetch completed courses");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getCertificate = (courseId) =>
// // //     certificates.find((cert) => cert.course._id === courseId);

// // //   const handleDownloadCertificate = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.downloadCertificate(certificateId, {
// // //         responseType: "blob",
// // //       });

// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement("a");
// // //       link.href = url;
// // //       link.setAttribute("download", `certificate_${certificateId}.pdf`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();

// // //       toast.success("Certificate downloaded successfully!");
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Failed to download certificate");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Layout>
// // //         <div className="flex items-center justify-center flex-1 h-screen bg-gray-900">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   return (
// // //     <Layout>
// // //       <div
// // //         className="flex flex-col flex-1 space-y-6 p-4 md:p-6 min-h-screen"
// // //         style={{ background: theme.background.gradient }}
// // //       >
// // //         {/* Header */}
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-white">Completed Courses</h1>
// // //           <p className="text-gray-200">
// // //             Celebrate your achievements and download certificates
// // //           </p>
// // //         </div>

// // //         {/* Stats */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //           >
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-400 text-sm">Courses Completed</p>
// // //                 <p className="text-2xl font-bold text-white">
// // //                   {completedEnrollments.length}
// // //                 </p>
// // //               </div>
// // //               <BookOpen className="text-green-500" size={24} />
// // //             </div>
// // //           </motion.div>

// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.1 }}
// // //             className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //           >
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-400 text-sm">Certificates Earned</p>
// // //                 <p className="text-2xl font-bold text-white">{certificates.length}</p>
// // //               </div>
// // //               <Award className="text-yellow-500" size={24} />
// // //             </div>
// // //           </motion.div>

// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.2 }}
// // //             className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //           >
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-400 text-sm">Average Rating</p>
// // //                 <p className="text-2xl font-bold text-white">4.8</p>
// // //               </div>
// // //               <Star className="text-purple-500" size={24} />
// // //             </div>
// // //           </motion.div>
// // //         </div>

// // //         {/* Completed Courses */}
// // //         {completedEnrollments.length > 0 ? (
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //             {completedEnrollments.map((enrollment) => {
// // //               const certificate = getCertificate(enrollment.course._id);
// // //               return (
// // //                 <motion.div
// // //                   key={enrollment._id}
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //                 >
// // //                   {/* Course Header */}
// // //                   <div className="flex items-start justify-between mb-4">
// // //                     <div className="flex-1">
// // //                       <h3 className="text-lg font-semibold text-white mb-1">
// // //                         {enrollment.course.title}
// // //                       </h3>
// // //                       <p className="text-sm text-purple-400">
// // //                         {enrollment.course.category}
// // //                       </p>
// // //                     </div>
// // //                     <div className="flex items-center gap-1 text-green-400">
// // //                       <Award size={16} />
// // //                       <span className="text-xs font-medium">Completed</span>
// // //                     </div>
// // //                   </div>

// // //                   {/* Course Description */}
// // //                   <p className="text-gray-400 text-sm mb-4 line-clamp-2">
// // //                     {enrollment.course.description}
// // //                   </p>

// // //                   {/* Completion Info */}
// // //                   <div className="space-y-3 mb-4">
// // //                     <div className="flex items-center justify-between text-sm">
// // //                       <span className="text-gray-400">Progress</span>
// // //                       <span className="text-green-400 font-medium">100% Complete</span>
// // //                     </div>
// // //                     <div className="w-full bg-gray-700 rounded-full h-2">
// // //                       <div className="bg-green-600 h-2 rounded-full w-full" />
// // //                     </div>
// // //                   </div>

// // //                   {/* Course Stats */}
// // //                   <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
// // //                     <div className="flex items-center gap-1">
// // //                       <Calendar size={16} />
// // //                       <span>
// // //                         Completed {new Date(enrollment.completedAt).toLocaleDateString()}
// // //                       </span>
// // //                     </div>
// // //                   </div>

// // //                   {/* Certificate Section */}
// // //                   {certificate ? (
// // //                     <div className="bg-gray-700 rounded-lg p-4 mb-4">
// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="text-white font-medium">Certificate Available</p>
// // //                           <p className="text-gray-400 text-sm">ID: {certificate.certificateId}</p>
// // //                         </div>
// // //                         <button
// // //                           onClick={() => handleDownloadCertificate(certificate._id)}
// // //                           className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                           aria-label="Download Certificate"
// // //                         >
// // //                           <Download size={16} />
// // //                           Download
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="bg-gray-700 rounded-lg p-4 mb-4">
// // //                       <p className="text-gray-400 text-sm">
// // //                         Certificate is being generated...
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* Rating Section */}
// // //                   <div className="flex items-center justify-between">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-gray-400 text-sm">Rate this course:</span>
// // //                       <div className="flex gap-1">
// // //                         {[1, 2, 3, 4, 5].map((star) => (
// // //                           <button
// // //                             key={star}
// // //                             className="text-yellow-500 hover:text-yellow-400"
// // //                             aria-label={`Rate ${star} stars`}
// // //                           >
// // //                             <Star size={16} fill="currentColor" />
// // //                           </button>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               );
// // //             })}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-12">
// // //             <Award size={48} className="text-gray-600 mx-auto mb-4" />
// // //             <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // //               No completed courses yet
// // //             </h3>
// // //             <p className="text-gray-500">
// // //               Complete a course to earn your first certificate
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Layout>
// // //   );
// // // }













// // // //client/src/pages/dashboard/CompletedCourses.js
// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import { Award, Calendar, Download, Star, BookOpen } from "lucide-react";
// // // import { enrollmentApi } from "../../api/enrollmentApi";
// // // import { certificateApi } from "../../api/certificateApi";
// // // import { toast } from "react-toastify";
// // // import { useTheme } from "../../context/ThemeContext";

// // // export default function CompletedCourses() {
// // //   const [completedEnrollments, setCompletedEnrollments] = useState([]);
// // //   const [certificates, setCertificates] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const theme = useTheme();

// // //   useEffect(() => {
// // //     fetchCompletedCourses();
// // //   }, []);

// // //   const fetchCompletedCourses = async () => {
// // //     try {
// // //       const [enrollmentsResponse, certificatesResponse] = await Promise.all([
// // //         enrollmentApi.getUserEnrollments("completed"),
// // //         certificateApi.getUserCertificates(),
// // //       ]);

// // //       setCompletedEnrollments(enrollmentsResponse.data.data || []);
// // //       setCertificates(certificatesResponse.data.data || []);
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Failed to fetch completed courses");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getCertificate = (courseId) =>
// // //     certificates.find((cert) => cert.course._id === courseId);

// // //   const handleDownloadCertificate = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.downloadCertificate(certificateId, {
// // //         responseType: "blob",
// // //       });

// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement("a");
// // //       link.href = url;
// // //       link.setAttribute("download", `certificate_${certificateId}.pdf`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();

// // //       toast.success("Certificate downloaded successfully!");
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Failed to download certificate");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center flex-1 h-screen bg-gray-900">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div
// // //       className="flex flex-col flex-1 space-y-6 p-4 md:p-6 min-h-screen"
// // //       style={{ background: theme.background.gradient }}
// // //     >
// // //       {/* Header */}
// // //       <div>
// // //         <h1 className="text-2xl font-bold text-black">Completed Courses</h1>
// // //         <p className="text-gray-700">
// // //           Celebrate your achievements and download certificates
// // //         </p>
// // //       </div>

// // //       {/* Stats Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
// // //           <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-600 text-sm">Courses Completed</p>
// // //                 <p className="text-2xl font-bold text-black">{completedEnrollments.length}</p>
// // //               </div>
// // //               <BookOpen className="text-green-500" size={24} />
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
// // //           <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-600 text-sm">Certificates Earned</p>
// // //                 <p className="text-2xl font-bold text-black">{certificates.length}</p>
// // //               </div>
// // //               <Award className="text-yellow-500" size={24} />
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
// // //           <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-gray-600 text-sm">Average Rating</p>
// // //                 <p className="text-2xl font-bold text-black">4.8</p>
// // //               </div>
// // //               <Star className="text-purple-500" size={24} />
// // //             </div>
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Completed Courses List */}
// // //       {completedEnrollments.length > 0 ? (
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //           {completedEnrollments.map((enrollment) => {
// // //             const certificate = getCertificate(enrollment.course._id);

// // //             return (
// // //               <motion.div
// // //                 key={enrollment._id}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //               >
// // //                 <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
// // //                   <h2 className="text-lg font-bold text-black mb-2">
// // //                     {enrollment.course.title}
// // //                   </h2>
// // //                   <p className="text-sm text-purple-500 mb-2">
// // //                     {enrollment.course.category}
// // //                   </p>
// // //                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// // //                     {enrollment.course.description}
// // //                   </p>

// // //                   {/* Completion Info */}
// // //                   <div className="space-y-3 mb-4">
// // //                     <div className="flex items-center justify-between text-sm">
// // //                       <span className="text-gray-600">Progress</span>
// // //                       <span className="text-green-500 font-medium">100% Complete</span>
// // //                     </div>
// // //                     <div className="w-full bg-gray-200 rounded-full h-2">
// // //                       <div className="bg-green-500 h-2 rounded-full w-full" />
// // //                     </div>
// // //                   </div>

// // //                   {/* Course Stats */}
// // //                   <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
// // //                     <Calendar size={16} />
// // //                     <span>
// // //                       Completed {new Date(enrollment.completedAt).toLocaleDateString()}
// // //                     </span>
// // //                   </div>

// // //                   {/* Certificate Section */}
// // //                   {certificate ? (
// // //                     <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center">
// // //                       <div>
// // //                         <p className="text-black font-medium">Certificate Available</p>
// // //                         <p className="text-gray-600 text-sm">
// // //                           ID: {certificate.certificateId}
// // //                         </p>
// // //                       </div>
// // //                       <button
// // //                         onClick={() => handleDownloadCertificate(certificate._id)}
// // //                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                       >
// // //                         <Download size={16} />
// // //                         Download
// // //                       </button>
// // //                     </div>
// // //                   ) : (
// // //                     <p className="text-gray-600 text-sm mb-4">
// // //                       Certificate is being generated...
// // //                     </p>
// // //                   )}

// // //                   {/* Rating Section */}
// // //                   <div className="flex items-center justify-between">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-gray-600 text-sm">Rate this course:</span>
// // //                       <div className="flex gap-1">
// // //                         {[1, 2, 3, 4, 5].map((star) => (
// // //                           <button
// // //                             key={star}
// // //                             className="text-yellow-500 hover:text-yellow-400"
// // //                             aria-label={`Rate ${star} stars`}
// // //                           >
// // //                             <Star size={16} fill="currentColor" />
// // //                           </button>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             );
// // //           })}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <Award size={48} className="text-gray-600 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-600 mb-2">
// // //             No completed courses yet
// // //           </h3>
// // //           <p className="text-gray-500">
// // //             Complete a course to earn your first certificate
// // //           </p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }








// // //client/src/pages/dashborad/CompletedCourses.js

// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Award, Calendar, Download, Star, BookOpen } from "lucide-react";
// // import { enrollmentApi } from "../../api/enrollmentApi";
// // import { certificateApi } from "../../api/certificateApi";
// // import { toast } from "react-toastify";
// // import { Card } from "../../components/Layouts/Card";

// // export default function CompletedCourses() {
// //   const [completedEnrollments, setCompletedEnrollments] = useState([]);
// //   const [certificates, setCertificates] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchCompletedCourses();
// //   }, []);

// //   const fetchCompletedCourses = async () => {
// //     try {
// //       const [enrollmentsResponse, certificatesResponse] = await Promise.all([
// //         enrollmentApi.getUserEnrollments("completed"),
// //         certificateApi.getUserCertificates(),
// //       ]);

// //       setCompletedEnrollments(enrollmentsResponse.data.data || []);
// //       setCertificates(certificatesResponse.data.data || []);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to fetch completed courses");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getCertificate = (courseId) =>
// //     certificates.find((cert) => cert.course._id === courseId);

// //   const handleDownloadCertificate = async (certificateId) => {
// //     try {
// //       const response = await certificateApi.downloadCertificate(certificateId, {
// //         responseType: "blob",
// //       });

// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.setAttribute("download", `certificate_${certificateId}.pdf`);
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();

// //       toast.success("Certificate downloaded successfully!");
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to download certificate");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col space-y-6 p-4 md:p-6">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-bold text-black">Completed Courses</h1>
// //         <p className="text-gray-700">
// //           Celebrate your achievements and download certificates
// //         </p>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
// //           <Card>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">Courses Completed</p>
// //                 <p className="text-2xl font-bold text-black">{completedEnrollments.length}</p>
// //               </div>
// //               <BookOpen className="text-green-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>

// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
// //           <Card>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">Certificates Earned</p>
// //                 <p className="text-2xl font-bold text-black">{certificates.length}</p>
// //               </div>
// //               <Award className="text-yellow-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>

// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
// //           <Card>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">Average Rating</p>
// //                 <p className="text-2xl font-bold text-black">4.8</p>
// //               </div>
// //               <Star className="text-purple-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>
// //       </div>

// //       {/* Completed Courses List */}
// //       {completedEnrollments.length > 0 ? (
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {completedEnrollments
// //   .filter((enrollment) => enrollment.course) // ✅ skip null courses
// //   .map((enrollment) => {
// //             const certificate = getCertificate(enrollment.course._id);

// //             return (
// //               <motion.div
// //                 key={enrollment._id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //               >
// //                 <Card>
// //                   <h2 className="text-lg font-bold text-black mb-2">
// //                     {enrollment.course.title}
// //                   </h2>
// //                   <p className="text-sm text-purple-500 mb-2">
// //                     {enrollment.course.category}
// //                   </p>
// //                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// //                     {enrollment.course.description}
// //                   </p>

// //                   {/* Completion Info */}
// //                   <div className="space-y-3 mb-4">
// //                     <div className="flex items-center justify-between text-sm">
// //                       <span className="text-gray-600">Progress</span>
// //                       <span className="text-green-500 font-medium">100% Complete</span>
// //                     </div>
// //                     <div className="w-full bg-gray-200 rounded-full h-2">
// //                       <div className="bg-green-500 h-2 rounded-full w-full" />
// //                     </div>
// //                   </div>

// //                   {/* Course Stats */}
// //                   <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
// //                     <Calendar size={16} />
// //                     <span>
// //                       Completed {new Date(enrollment.completedAt).toLocaleDateString()}
// //                     </span>
// //                   </div>

// //                   {/* Certificate Section */}
// //                   {certificate ? (
// //                     <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center">
// //                       <div>
// //                         <p className="text-black font-medium">Certificate Available</p>
// //                         <p className="text-gray-600 text-sm">
// //                           ID: {certificate.certificateId}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={() => handleDownloadCertificate(certificate._id)}
// //                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// //                       >
// //                         <Download size={16} />
// //                         Download
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <p className="text-gray-600 text-sm mb-4">
// //                       Certificate is being generated...
// //                     </p>
// //                   )}

// //                   {/* Rating Section */}
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-gray-600 text-sm">Rate this course:</span>
// //                       <div className="flex gap-1">
// //                         {[1, 2, 3, 4, 5].map((star) => (
// //                           <button
// //                             key={star}
// //                             className="text-yellow-500 hover:text-yellow-400"
// //                             aria-label={`Rate ${star} stars`}
// //                           >
// //                             <Star size={16} fill="currentColor" />
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Card>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       ) : (
// //         <div className="text-center py-12">
// //           <Award size={48} className="text-gray-600 mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold text-gray-600 mb-2">
// //             No completed courses yet
// //           </h3>
// //           <p className="text-gray-500">
// //             Complete a course to earn your first certificate
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }






// //client/src/pages/dashboard/CompletedCourses.js

// "use client"

// import { useEffect, useState } from "react"
// import { Card } from "../../components/Layouts/Card"
// import { CheckCircle } from "lucide-react"

// export default function CompletedCourses() {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchCompletedCourses = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await fetch("/api/enrollments/completed", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setCourses(data)
//         }
//       } catch (error) {
//         console.error("Error fetching completed courses:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCompletedCourses()
//   }, [])

//   if (loading) return <div className="text-center py-8">Loading...</div>

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-6">Completed Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {courses.map((course) => (
//           <Card key={course._id} className="p-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
//                 <p className="text-gray-600 text-sm">
//                   Completed on {new Date(course.completedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <CheckCircle className="text-green-500" size={24} />
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }












//client/src/pages/dashboard/CompletedCourses.js
import { useEffect, useState } from "react"
import { Card } from "../../components/Layouts/Card"
import { CheckCircle } from "lucide-react"

export default function CompletedCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/enrollments/completed", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          const result = await response.json()
          setCourses(result.data || result)
        }
      } catch (error) {
        console.error("Error fetching completed courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompletedCourses()
  }, [])

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Completed Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course._id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                <p className="text-sm text-gray-500">
                  Completed on {new Date(course.completedAt || course.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
