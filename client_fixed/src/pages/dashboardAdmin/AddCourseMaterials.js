// // client/src/pages/dashboardAdmin/AddMaterialCourse.js
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Plus, Trash2, Users, Calendar, BookOpen, Video, Star } from "lucide-react"
// import axios from "../../api/axiosConfig"
// import { toast } from "react-toastify"

// export default function AddMaterialCourse() {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCourse, setSelectedCourse] = useState(null)
//   const [showMaterialModal, setShowMaterialModal] = useState(false)
//   const [newMaterial, setNewMaterial] = useState({
//     title: "",
//     description: "",
//     type: "video",
//     url: "",
//     duration: 0,
//   })

//   useEffect(() => {
//     fetchCourses()
//   }, [])

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("/courses/admin/all")
//       // ✅ ensure we always set an array
//       setCourses(response.data?.data?.courses || [])
//     } catch (error) {
//       console.error("Error fetching courses:", error)
//       toast.error("Failed to fetch courses")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddMaterial = async (e) => {
//     e.preventDefault()
//     try {
//       if (!newMaterial.title || !newMaterial.url) {
//         toast.error("Please fill in required fields")
//         return
//       }

//       const response = await axios.post(`/courses/${selectedCourse._id}/materials`, newMaterial)
//       setCourses(courses.map((c) => (c._id === selectedCourse._id ? response.data.data : c)))
//       setNewMaterial({
//         title: "",
//         description: "",
//         type: "video",
//         url: "",
//         duration: 0,
//       })
//       setShowMaterialModal(false)
//       toast.success("Material added successfully!")
//     } catch (error) {
//       console.error("Error adding material:", error)
//       toast.error(error.response?.data?.message || "Failed to add material")
//     }
//   }

//   const handleDeleteCourse = async (courseId) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) {
//       return
//     }

//     try {
//       await axios.delete(`/courses/${courseId}`)
//       setCourses(courses.filter((c) => c._id !== courseId))
//       toast.success("Course deleted successfully!")
//     } catch (error) {
//       console.error("Error deleting course:", error)
//       toast.error(error.response?.data?.message || "Failed to delete course")
//     }
//   }

//   const togglePublishStatus = async (course) => {
//     try {
//       const response = await axios.put(`/courses/${course._id}`, {
//         isPublished: !course.isPublished,
//       })
//       setCourses(courses.map((c) => (c._id === course._id ? response.data.data : c)))
//       toast.success(`Course ${course.isPublished ? "unpublished" : "published"} successfully!`)
//     } catch (error) {
//       console.error("Error updating course status:", error)
//       toast.error(error.response?.data?.message || "Failed to update course status")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-white">Manage Course Materials</h1>
//           <p className="text-gray-400">Add and manage materials for existing courses</p>
//         </div>
//       </div>

//       {/* Courses Grid */}
//       {courses.length === 0 ? (
//         <div className="text-center py-12">
//           <BookOpen size={48} className="mx-auto text-gray-500 mb-4" />
//           <h3 className="text-lg font-medium text-white mb-2">No courses available</h3>
//           <p className="text-gray-400 mb-4">Ask an admin to create courses first</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <motion.div
//               key={course._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
//                   <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
//                 </div>
//                 <div
//                   className={`px-2 py-1 rounded text-xs font-medium ${
//                     course.isPublished ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
//                   }`}
//                 >
//                   {course.isPublished ? "Published" : "Draft"}
//                 </div>
//               </div>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Calendar size={16} />
//                   <span>{course.duration} hours</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Users size={16} />
//                   <span>{course.enrollmentCount || 0} enrolled</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Star size={16} />
//                   <span>
//                     {course.averageRating || 0} ({course.totalRatings || 0} ratings)
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Video size={16} />
//                   <span>{course.materials?.length || 0} materials</span>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setSelectedCourse(course)
//                     setShowMaterialModal(true)
//                   }}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1"
//                 >
//                   <Video size={16} />
//                   Materials
//                 </button>
//                 <button
//                   onClick={() => togglePublishStatus(course)}
//                   className={`flex-1 px-3 py-2 rounded text-sm ${
//                     course.isPublished
//                       ? "bg-yellow-600 hover:bg-yellow-700 text-white"
//                       : "bg-green-600 hover:bg-green-700 text-white"
//                   }`}
//                 >
//                   {course.isPublished ? "Unpublish" : "Publish"}
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCourse(course._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Add Material Modal */}
//       {showMaterialModal && selectedCourse && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl"
//           >
//             <h2 className="text-xl font-bold text-white mb-4">Add Material to {selectedCourse.title}</h2>
//             <form onSubmit={handleAddMaterial} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
//                 <input
//                   type="text"
//                   required
//                   value={newMaterial.title}
//                   onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 />
//               </div>
//                             <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
//                 <select
//                   value={newMaterial.type}
//                   onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 >
//                   <option value="video">Video</option>
//                   <option value="document">Document</option>
//                   <option value="link">Link</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">URL</label>
//                 <input
//                   type="url"
//                   required
//                   value={newMaterial.url}
//                   onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Description (optional)</label>
//                 <textarea
//                   rows={3}
//                   value={newMaterial.description}
//                   onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={newMaterial.duration}
//                   onChange={(e) => setNewMaterial({ ...newMaterial, duration: Number(e.target.value) })}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
//                 >
//                   Add Material
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowMaterialModal(false)}
//                   className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }












// client/src/pages/dashboardAdmin/AddMaterialCourse.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Users,
  Calendar,
  BookOpen,
  Video,
  Star,
  FileText,
  Link as LinkIcon,
  Eye,
  X,
  Upload,
  File,
} from "lucide-react";
import axios from "../../api/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMaterialCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showViewMaterialsModal, setShowViewMaterialsModal] = useState(false);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    type: "video",
    url: "",
    duration: 0,
    file: null,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/courses/admin/all");
      setCourses(response.data?.data?.courses || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseMaterials = async (courseId) => {
    try {
      const response = await axios.get(`/materials/course/${courseId}`);
      setCourseMaterials(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch materials");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return;
      }
      setNewMaterial({ ...newMaterial, file });
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();

    if (!newMaterial.title) {
      toast.error("Please provide a title");
      return;
    }

    if (!newMaterial.url && !newMaterial.file) {
      toast.error("Please provide either a URL or upload a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseId", selectedCourse._id);
      formData.append("title", newMaterial.title);
      formData.append("description", newMaterial.description);
      formData.append("type", newMaterial.type);
      formData.append("duration", newMaterial.duration * 60); // Convert to seconds

      if (newMaterial.file) {
        formData.append("file", newMaterial.file);
      } else {
        formData.append("url", newMaterial.url);
      }

      await axios.post("/materials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      toast.success("Material added successfully!");
      setNewMaterial({
        title: "",
        description: "",
        type: "video",
        url: "",
        duration: 0,
        file: null,
      });
      setUploadProgress(0);
      setShowMaterialModal(false);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add material");
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      await axios.delete(`/materials/${materialId}`);
      toast.success("Material deleted successfully!");
      fetchCourseMaterials(selectedCourse._id);
    } catch (error) {
      toast.error("Failed to delete material");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await axios.delete(`/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video size={20} className="text-blue-400" />;
      case "pdf":
      case "document":
        return <FileText size={20} className="text-red-400" />;
      case "link":
        return <LinkIcon size={20} className="text-green-400" />;
      default:
        return <File size={20} className="text-gray-400" />;
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <ToastContainer position="bottom-right" theme="colored" />

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
              Course Materials Manager
            </h1>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">Add and manage materials for your courses</p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {courses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center transition-all">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors">No courses available</h3>
            <p className="text-slate-600 dark:text-slate-400">Create courses first to add materials</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-purple-900/10 transition-all overflow-hidden group border border-transparent dark:border-gray-700"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                      {course.category}
                    </span>
                  </div>
                  <p className="text-purple-100 text-sm line-clamp-2">{course.description}</p>
                </div>

                {/* Course Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">{course.duration}h</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Video size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Materials</p>
                        <p className="font-semibold text-slate-900">
                          {course.materials?.length || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Enrolled</p>
                        <p className="font-semibold text-slate-900">
                          {course.enrollmentCount || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star size={16} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Rating</p>
                        <p className="font-semibold text-slate-900">
                          {course.averageRating || 0}/5
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowMaterialModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                    >
                      <Plus size={16} />
                      Add Material
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        fetchCourseMaterials(course._id);
                        setShowViewMaterialsModal(true);
                      }}
                      className="px-4 py-2.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="px-4 py-2.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl font-semibold text-sm flex items-center justify-center transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Material Modal */}
      <AnimatePresence>
        {showMaterialModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-transparent dark:border-gray-700"
            >
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Add Material</h2>
                    <p className="text-purple-100 text-sm mt-1">{selectedCourse.title}</p>
                  </div>
                  <button
                    onClick={() => setShowMaterialModal(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddMaterial} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaterial.title}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    placeholder="e.g., Introduction to Python"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, type: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF Document</option>
                    <option value="document">Word Document</option>
                    <option value="link">External Link</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* File Upload or URL */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Upload File or Provide URL
                  </label>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-10 h-10 text-purple-500 mb-2" />
                      <span className="text-sm font-semibold text-slate-700 mb-1">
                        Click to upload
                      </span>
                      <span className="text-xs text-slate-500">
                        PDF, DOC, PPT, Video, Image (Max 100MB)
                      </span>
                      {newMaterial.file && (
                        <span className="mt-2 text-sm text-purple-600 font-medium">
                          {newMaterial.file.name}
                        </span>
                      )}
                    </label>
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-slate-300"></div>
                    <span className="text-sm text-slate-500 font-medium">OR</span>
                    <div className="flex-1 border-t border-slate-300"></div>
                  </div>

                  {/* URL Input */}
                  <input
                    type="url"
                    value={newMaterial.url}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, url: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newMaterial.description}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
                    placeholder="Brief description of the material..."
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newMaterial.duration}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, duration: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    placeholder="0"
                  />
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 font-medium">Uploading...</span>
                      <span className="text-purple-600 font-semibold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Material
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMaterialModal(false)}
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Materials Modal */}
      <AnimatePresence>
        {showViewMaterialsModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Course Materials</h2>
                    <p className="text-purple-100 text-sm mt-1">{selectedCourse.title}</p>
                  </div>
                  <button
                    onClick={() => setShowViewMaterialsModal(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {courseMaterials.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No materials added yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courseMaterials.map((material, index) => (
                      <motion.div
                        key={material._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            {getTypeIcon(material.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {material.title}
                            </h4>
                            <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                              {material.description || "No description"}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="px-2 py-1 bg-white rounded-md font-medium capitalize">
                                {material.type}
                              </span>
                              {material.duration > 0 && (
                                <span>{Math.round(material.duration / 60)} min</span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteMaterial(material._id)}
                            className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}