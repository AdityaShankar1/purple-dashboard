// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "../../api/axiosConfig";
// // // // // // import { toast } from "react-toastify";

// // // // // // export default function AdminCourseAssignmentsManager() {
// // // // // //   const [courses, setCourses] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   // Search states
// // // // // //   const [searchInput, setSearchInput] = useState(""); // what user types
// // // // // //   const [searchTerm, setSearchTerm] = useState(""); // applied on search button

// // // // // //   const [assignmentTypeFilter, setAssignmentTypeFilter] = useState("");
// // // // // //   const [expandedCourseId, setExpandedCourseId] = useState(null);

// // // // // //   // For creating/updating assignments
// // // // // //   const [editingAssignment, setEditingAssignment] = useState(null);
// // // // // //   const [fileInputKey, setFileInputKey] = useState(Date.now());

// // // // // //   useEffect(() => {
// // // // // //     fetchCourses();
// // // // // //   }, []);

// // // // // //   async function fetchCourses() {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const res = await axios.get("/courses-with-assignments", {
// // // // // //         params: {
// // // // // //           search: searchTerm || undefined,
// // // // // //           type: assignmentTypeFilter || undefined,
// // // // // //         },
// // // // // //       });
// // // // // //       // ✅ backend sends { message, data: [...] }
// // // // // //       setCourses(res.data.data || []);
// // // // // //     } catch (err) {
// // // // // //       toast.error("Failed to load courses");
// // // // // //       console.error(err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }

// // // // // //   // Filter courses locally (fallback if backend doesn’t filter)
// // // // // //   const filteredCourses = courses.filter((course) =>
// // // // // //     course.title?.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // //   );

// // // // // //   function toggleCourse(courseId) {
// // // // // //     setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
// // // // // //   }

// // // // // //   function openNewAssignmentForm(courseId) {
// // // // // //     setEditingAssignment({
// // // // // //       courseId,
// // // // // //       assignmentId: null,
// // // // // //       name: "",
// // // // // //       type: "",
// // // // // //       description: "",
// // // // // //       file: null,
// // // // // //     });
// // // // // //     setFileInputKey(Date.now());
// // // // // //   }

// // // // // //   function openEditAssignmentForm(courseId, assignment) {
// // // // // //     setEditingAssignment({
// // // // // //       courseId,
// // // // // //       assignmentId: assignment._id,
// // // // // //       name: assignment.name,
// // // // // //       type: assignment.type,
// // // // // //       description: assignment.description || "",
// // // // // //       file: null,
// // // // // //       existingFileUrl: assignment.fileUrl || null,
// // // // // //     });
// // // // // //     setFileInputKey(Date.now());
// // // // // //   }

// // // // // //   function handleEditChange(e) {
// // // // // //     const { name, value, files } = e.target;
// // // // // //     if (name === "file") {
// // // // // //       setEditingAssignment((prev) => ({ ...prev, file: files[0] || null }));
// // // // // //     } else {
// // // // // //       setEditingAssignment((prev) => ({ ...prev, [name]: value }));
// // // // // //     }
// // // // // //   }

// // // // // //   async function submitAssignment(e) {
// // // // // //     e.preventDefault();
// // // // // //     if (!editingAssignment.name || !editingAssignment.type) {
// // // // // //       toast.error("Assignment name and type are required");
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append("courseId", editingAssignment.courseId);
// // // // // //     formData.append("name", editingAssignment.name);
// // // // // //     formData.append("type", editingAssignment.type);
// // // // // //     formData.append("description", editingAssignment.description);
// // // // // //     if (editingAssignment.file) {
// // // // // //       formData.append("file", editingAssignment.file);
// // // // // //     }

// // // // // //     try {
// // // // // //       if (editingAssignment.assignmentId) {
// // // // // //         await axios.put(
// // // // // //           `/assignments/${editingAssignment.assignmentId}`,
// // // // // //           formData,
// // // // // //           { headers: { "Content-Type": "multipart/form-data" } }
// // // // // //         );
// // // // // //         toast.success("Assignment updated");
// // // // // //       } else {
// // // // // //         await axios.post("/assignments", formData, {
// // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // //         });
// // // // // //         toast.success("Assignment created");
// // // // // //       }
// // // // // //       setEditingAssignment(null);
// // // // // //       fetchCourses();
// // // // // //     } catch (err) {
// // // // // //       toast.error("Failed to save assignment");
// // // // // //       console.error(err);
// // // // // //     }
// // // // // //   }

// // // // // //   async function deleteAssignment(assignmentId) {
// // // // // //     if (!window.confirm("Are you sure you want to delete this assignment?")) return;
// // // // // //     try {
// // // // // //       await axios.delete(`/assignments/${assignmentId}`);
// // // // // //       toast.success("Assignment deleted");
// // // // // //       fetchCourses();
// // // // // //     } catch (err) {
// // // // // //       toast.error("Failed to delete assignment");
// // // // // //       console.error(err);
// // // // // //     }
// // // // // //   }

// // // // // //   function filterAssignments(assignments) {
// // // // // //     if (!assignmentTypeFilter) return assignments;
// // // // // //     return assignments.filter((a) => a.type === assignmentTypeFilter);
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen text-white max-w-5xl mx-auto">
// // // // // //       <h1 className="text-3xl font-bold mb-6">Assignment</h1>

// // // // // //       {/* Search and filter */}
// // // // // //       <div className="flex flex-wrap gap-4 mb-6">
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Search courses..."
// // // // // //           value={searchInput}
// // // // // //           onChange={(e) => setSearchInput(e.target.value)}
// // // // // //           className="flex-grow min-w-[200px] rounded px-3 py-2 text-gray-900"
// // // // // //         />
// // // // // //         <button
// // // // // //           onClick={() => {
// // // // // //             setSearchTerm(searchInput);
// // // // // //             fetchCourses(); // ✅ trigger backend fetch on search
// // // // // //           }}
// // // // // //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           Search
// // // // // //         </button>
// // // // // //         <select
// // // // // //           value={assignmentTypeFilter}
// // // // // //           onChange={(e) => {
// // // // // //             setAssignmentTypeFilter(e.target.value);
// // // // // //             fetchCourses(); // ✅ trigger backend fetch on filter change
// // // // // //           }}
// // // // // //           className="rounded px-3 py-2 text-gray-900"
// // // // // //         >
// // // // // //           <option value="">All Assignment Types</option>
// // // // // //           <option value="Homework">Homework</option>
// // // // // //           <option value="Project">Project</option>
// // // // // //           <option value="Quiz">Quiz</option>
// // // // // //           <option value="Essay">Essay</option>
// // // // // //           <option value="Lab Report">Lab Report</option>
// // // // // //         </select>
// // // // // //       </div>

// // // // // //       {loading ? (
// // // // // //         <p>Loading courses...</p>
// // // // // //       ) : filteredCourses.length === 0 ? (
// // // // // //         <p>No courses found.</p>
// // // // // //       ) : (
// // // // // //         filteredCourses.map((course) => {
// // // // // //           const assignments = filterAssignments(course.assignments || []);
// // // // // //           const isExpanded = expandedCourseId === course._id;

// // // // // //           return (
// // // // // //             <div
// // // // // //               key={course._id}
// // // // // //               className="bg-purple-800 rounded-md p-4 mb-6 cursor-pointer"
// // // // // //             >
// // // // // //               <div
// // // // // //                 className="flex justify-between items-center"
// // // // // //                 onClick={() => toggleCourse(course._id)}
// // // // // //               >
// // // // // //                 <h2 className="text-xl font-semibold">{course.title}</h2>
// // // // // //                 <button
// // // // // //                   onClick={(e) => {
// // // // // //                     e.stopPropagation();
// // // // // //                     openNewAssignmentForm(course._id);
// // // // // //                   }}
// // // // // //                   className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
// // // // // //                 >
// // // // // //                   + Add Assignment
// // // // // //                 </button>
// // // // // //               </div>

// // // // // //               {isExpanded && (
// // // // // //                 <div className="mt-4">
// // // // // //                   {assignments.length === 0 ? (
// // // // // //                     <p className="italic text-gray-300">No assignments found.</p>
// // // // // //                   ) : (
// // // // // //                     <ul className="space-y-3">
// // // // // //                       {assignments.map((assignment) => (
// // // // // //                         <li
// // // // // //                           key={assignment._id}
// // // // // //                           className="bg-purple-700 p-3 rounded flex justify-between items-center"
// // // // // //                         >
// // // // // //                           <div>
// // // // // //                             <p className="font-semibold">{assignment.name}</p>
// // // // // //                             <p className="text-sm text-gray-300">
// // // // // //                               Type: {assignment.type}
// // // // // //                             </p>
// // // // // //                             {assignment.description && (
// // // // // //                               <p className="text-sm mt-1">{assignment.description}</p>
// // // // // //                             )}
// // // // // //                             {assignment.fileUrl && (
// // // // // //                               <a
// // // // // //                                 href={assignment.fileUrl}
// // // // // //                                 target="_blank"
// // // // // //                                 rel="noopener noreferrer"
// // // // // //                                 className="text-purple-300 underline text-sm mt-1 block"
// // // // // //                               >
// // // // // //                                 View Attachment
// // // // // //                               </a>
// // // // // //                             )}
// // // // // //                           </div>
// // // // // //                           <div className="flex gap-2">
// // // // // //                             <button
// // // // // //                               onClick={(e) => {
// // // // // //                                 e.stopPropagation();
// // // // // //                                 openEditAssignmentForm(course._id, assignment);
// // // // // //                               }}
// // // // // //                               className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white text-sm"
// // // // // //                             >
// // // // // //                               Edit
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                               onClick={(e) => {
// // // // // //                                 e.stopPropagation();
// // // // // //                                 deleteAssignment(assignment._id);
// // // // // //                               }}
// // // // // //                               className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
// // // // // //                             >
// // // // // //                               Delete
// // // // // //                             </button>
// // // // // //                           </div>
// // // // // //                         </li>
// // // // // //                       ))}
// // // // // //                     </ul>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           );
// // // // // //         })
// // // // // //       )}

// // // // // //       {/* Assignment create/edit form modal */}
// // // // // //       {editingAssignment && (
// // // // // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
// // // // // //           <form
// // // // // //             onSubmit={submitAssignment}
// // // // // //             className="bg-purple-900 rounded-lg p-6 w-full max-w-lg text-white relative"
// // // // // //             onClick={(e) => e.stopPropagation()}
// // // // // //           >
// // // // // //             <h3 className="text-xl font-semibold mb-4">
// // // // // //               {editingAssignment.assignmentId ? "Edit Assignment" : "New Assignment"}
// // // // // //             </h3>

// // // // // //             <label className="block mb-2">
// // // // // //               Name <span className="text-red-500">*</span>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 name="name"
// // // // // //                 value={editingAssignment.name}
// // // // // //                 onChange={handleEditChange}
// // // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // // //                 required
// // // // // //               />
// // // // // //             </label>

// // // // // //             <label className="block mb-2">
// // // // // //               Type <span className="text-red-500">*</span>
// // // // // //               <select
// // // // // //                 name="type"
// // // // // //                 value={editingAssignment.type}
// // // // // //                 onChange={handleEditChange}
// // // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // // //                 required
// // // // // //               >
// // // // // //                 <option value="">Select type</option>
// // // // // //                 <option value="Homework">Homework</option>
// // // // // //                 <option value="Project">Project</option>
// // // // // //                 <option value="Quiz">Quiz</option>
// // // // // //                 <option value="Essay">Essay</option>
// // // // // //                 <option value="Lab Report">Lab Report</option>
// // // // // //               </select>
// // // // // //             </label>

// // // // // //             <label className="block mb-2">
// // // // // //               Description
// // // // // //               <textarea
// // // // // //                 name="description"
// // // // // //                 value={editingAssignment.description}
// // // // // //                 onChange={handleEditChange}
// // // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // // //                 rows={3}
// // // // // //               />
// // // // // //             </label>

// // // // // //             <label className="block mb-4">
// // // // // //               Attachment (PDF, DOC, DOCX)
// // // // // //               <input
// // // // // //                 key={fileInputKey}
// // // // // //                 type="file"
// // // // // //                 name="file"
// // // // // //                 accept=".pdf,.doc,.docx"
// // // // // //                 onChange={handleEditChange}
// // // // // //                 className="w-full mt-1 text-gray-900"
// // // // // //               />
// // // // // //               {editingAssignment.existingFileUrl && !editingAssignment.file && (
// // // // // //                 <a
// // // // // //                   href={editingAssignment.existingFileUrl}
// // // // // //                   target="_blank"
// // // // // //                   rel="noopener noreferrer"
// // // // // //                   className="text-purple-300 underline text-sm mt-1 block"
// // // // // //                 >
// // // // // //                   Current Attachment
// // // // // //                 </a>
// // // // // //               )}
// // // // // //             </label>

// // // // // //             <div className="flex justify-end gap-3">
// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() => setEditingAssignment(null)}
// // // // // //                 className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 type="submit"
// // // // // //                 className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
// // // // // //               >
// // // // // //                 {editingAssignment.assignmentId ? "Update" : "Create"}
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </form>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }












// // // // // import React, { useState, useEffect, useCallback } from "react";
// // // // // import axios from "../../api/axiosConfig";
// // // // // import { toast } from "react-toastify";

// // // // // export default function AdminCourseAssignmentsManager() {
// // // // //   const [courses, setCourses] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Search states
// // // // //   const [searchInput, setSearchInput] = useState(""); // what user types
// // // // //   const [searchTerm, setSearchTerm] = useState(""); // applied on search button

// // // // //   const [assignmentTypeFilter, setAssignmentTypeFilter] = useState("");
// // // // //   const [expandedCourseId, setExpandedCourseId] = useState(null);

// // // // //   // For creating/updating assignments
// // // // //   const [editingAssignment, setEditingAssignment] = useState(null);
// // // // //   const [fileInputKey, setFileInputKey] = useState(Date.now());

// // // // //   // ✅ Stable fetch function
// // // // //   const fetchCourses = useCallback(async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get("/courses-with-assignments", {
// // // // //         params: {
// // // // //           search: searchTerm || undefined,
// // // // //           type: assignmentTypeFilter || undefined,
// // // // //         },
// // // // //       });
// // // // //       setCourses(res.data.data || []);
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to load courses");
// // // // //       console.error(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [searchTerm, assignmentTypeFilter]);

// // // // //   // Fetch on mount and whenever search/filter changes
// // // // //   useEffect(() => {
// // // // //     fetchCourses();
// // // // //   }, [fetchCourses]);

// // // // //   // Filter courses locally (fallback if backend doesn’t filter)
// // // // //   const filteredCourses = courses.filter((course) =>
// // // // //     course.title?.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   function toggleCourse(courseId) {
// // // // //     setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
// // // // //   }

// // // // //   function openNewAssignmentForm(courseId) {
// // // // //     setEditingAssignment({
// // // // //       courseId,
// // // // //       assignmentId: null,
// // // // //       name: "",
// // // // //       type: "",
// // // // //       description: "",
// // // // //       file: null,
// // // // //     });
// // // // //     setFileInputKey(Date.now());
// // // // //   }

// // // // //   function openEditAssignmentForm(courseId, assignment) {
// // // // //     setEditingAssignment({
// // // // //       courseId,
// // // // //       assignmentId: assignment._id,
// // // // //       name: assignment.name,
// // // // //       type: assignment.type,
// // // // //       description: assignment.description || "",
// // // // //       file: null,
// // // // //       existingFileUrl: assignment.fileUrl || null,
// // // // //     });
// // // // //     setFileInputKey(Date.now());
// // // // //   }

// // // // //   function handleEditChange(e) {
// // // // //     const { name, value, files } = e.target;
// // // // //     if (name === "file") {
// // // // //       setEditingAssignment((prev) => ({ ...prev, file: files[0] || null }));
// // // // //     } else {
// // // // //       setEditingAssignment((prev) => ({ ...prev, [name]: value }));
// // // // //     }
// // // // //   }

// // // // //   async function submitAssignment(e) {
// // // // //     e.preventDefault();
// // // // //     if (!editingAssignment.name || !editingAssignment.type) {
// // // // //       toast.error("Assignment name and type are required");
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append("courseId", editingAssignment.courseId);
// // // // //     formData.append("name", editingAssignment.name);
// // // // //     formData.append("type", editingAssignment.type);
// // // // //     formData.append("description", editingAssignment.description);
// // // // //     if (editingAssignment.file) {
// // // // //       formData.append("file", editingAssignment.file);
// // // // //     }

// // // // //     try {
// // // // //       if (editingAssignment.assignmentId) {
// // // // //         await axios.put(
// // // // //           `/assignments/${editingAssignment.assignmentId}`,
// // // // //           formData,
// // // // //           { headers: { "Content-Type": "multipart/form-data" } }
// // // // //         );
// // // // //         toast.success("Assignment updated");
// // // // //       } else {
// // // // //         await axios.post("/assignments", formData, {
// // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // //         });
// // // // //         toast.success("Assignment created");
// // // // //       }
// // // // //       setEditingAssignment(null);
// // // // //       fetchCourses();
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to save assignment");
// // // // //       console.error(err);
// // // // //     }
// // // // //   }

// // // // //   async function deleteAssignment(assignmentId) {
// // // // //     if (!window.confirm("Are you sure you want to delete this assignment?"))
// // // // //       return;
// // // // //     try {
// // // // //       await axios.delete(`/assignments/${assignmentId}`);
// // // // //       toast.success("Assignment deleted");
// // // // //       fetchCourses();
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to delete assignment");
// // // // //       console.error(err);
// // // // //     }
// // // // //   }

// // // // //   function filterAssignments(assignments) {
// // // // //     if (!assignmentTypeFilter) return assignments;
// // // // //     return assignments.filter((a) => a.type === assignmentTypeFilter);
// // // // //   }

// // // // //   return (
// // // // //     <div className="p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen text-white max-w-5xl mx-auto">
// // // // //       <h1 className="text-3xl font-bold mb-6">Assignment</h1>

// // // // //       {/* Search and filter */}
// // // // //       <div className="flex flex-wrap gap-4 mb-6">
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search courses..."
// // // // //           value={searchInput}
// // // // //           onChange={(e) => setSearchInput(e.target.value)}
// // // // //           className="flex-grow min-w-[200px] rounded px-3 py-2 text-gray-900"
// // // // //         />
// // // // //         <button
// // // // //           onClick={() => setSearchTerm(searchInput)}
// // // // //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
// // // // //         >
// // // // //           Search
// // // // //         </button>
// // // // //         <select
// // // // //           value={assignmentTypeFilter}
// // // // //           onChange={(e) => setAssignmentTypeFilter(e.target.value)}
// // // // //           className="rounded px-3 py-2 text-gray-900"
// // // // //         >
// // // // //           <option value="">All Assignment Types</option>
// // // // //           <option value="Homework">Homework</option>
// // // // //           <option value="Project">Project</option>
// // // // //           <option value="Quiz">Quiz</option>
// // // // //           <option value="Essay">Essay</option>
// // // // //           <option value="Lab Report">Lab Report</option>
// // // // //         </select>
// // // // //       </div>

// // // // //       {loading ? (
// // // // //         <p>Loading courses...</p>
// // // // //       ) : filteredCourses.length === 0 ? (
// // // // //         <p>No courses found.</p>
// // // // //       ) : (
// // // // //         filteredCourses.map((course) => {
// // // // //           const assignments = filterAssignments(course.assignments || []);
// // // // //           const isExpanded = expandedCourseId === course._id;

// // // // //           return (
// // // // //             <div
// // // // //               key={course._id}
// // // // //               className="bg-purple-800 rounded-md p-4 mb-6 cursor-pointer"
// // // // //             >
// // // // //               <div
// // // // //                 className="flex justify-between items-center"
// // // // //                 onClick={() => toggleCourse(course._id)}
// // // // //               >
// // // // //                 <h2 className="text-xl font-semibold">{course.title}</h2>
// // // // //                 <button
// // // // //                   onClick={(e) => {
// // // // //                     e.stopPropagation();
// // // // //                     openNewAssignmentForm(course._id);
// // // // //                   }}
// // // // //                   className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
// // // // //                 >
// // // // //                   + Add Assignment
// // // // //                 </button>
// // // // //               </div>

// // // // //               {isExpanded && (
// // // // //                 <div className="mt-4">
// // // // //                   {assignments.length === 0 ? (
// // // // //                     <p className="italic text-gray-300">No assignments found.</p>
// // // // //                   ) : (
// // // // //                     <ul className="space-y-3">
// // // // //                       {assignments.map((assignment) => (
// // // // //                         <li
// // // // //                           key={assignment._id}
// // // // //                           className="bg-purple-700 p-3 rounded flex justify-between items-center"
// // // // //                         >
// // // // //                           <div>
// // // // //                             <p className="font-semibold">{assignment.name}</p>
// // // // //                             <p className="text-sm text-gray-300">
// // // // //                               Type: {assignment.type}
// // // // //                             </p>
// // // // //                             {assignment.description && (
// // // // //                               <p className="text-sm mt-1">{assignment.description}</p>
// // // // //                             )}
// // // // //                             {assignment.fileUrl && (
// // // // //                               <a
// // // // //                                 href={assignment.fileUrl}
// // // // //                                 target="_blank"
// // // // //                                 rel="noopener noreferrer"
// // // // //                                 className="text-purple-300 underline text-sm mt-1 block"
// // // // //                               >
// // // // //                                 View Attachment
// // // // //                               </a>
// // // // //                             )}
// // // // //                           </div>
// // // // //                           <div className="flex gap-2">
// // // // //                             <button
// // // // //                               onClick={(e) => {
// // // // //                                 e.stopPropagation();
// // // // //                                 openEditAssignmentForm(course._id, assignment);
// // // // //                               }}
// // // // //                               className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white text-sm"
// // // // //                             >
// // // // //                               Edit
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={(e) => {
// // // // //                                 e.stopPropagation();
// // // // //                                 deleteAssignment(assignment._id);
// // // // //                               }}
// // // // //                               className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
// // // // //                             >
// // // // //                               Delete
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         </li>
// // // // //                       ))}
// // // // //                     </ul>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           );
// // // // //         })
// // // // //       )}

// // // // //       {/* Assignment create/edit form modal */}
// // // // //       {editingAssignment && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
// // // // //           <form
// // // // //             onSubmit={submitAssignment}
// // // // //             className="bg-purple-900 rounded-lg p-6 w-full max-w-lg text-white relative"
// // // // //             onClick={(e) => e.stopPropagation()}
// // // // //           >
// // // // //             <h3 className="text-xl font-semibold mb-4">
// // // // //               {editingAssignment.assignmentId ? "Edit Assignment" : "New Assignment"}
// // // // //             </h3>

// // // // //             <label className="block mb-2">
// // // // //               Name <span className="text-red-500">*</span>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 name="name"
// // // // //                 value={editingAssignment.name}
// // // // //                 onChange={handleEditChange}
// // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // //                 required
// // // // //               />
// // // // //             </label>

// // // // //             <label className="block mb-2">
// // // // //               Type <span className="text-red-500">*</span>
// // // // //               <select
// // // // //                 name="type"
// // // // //                 value={editingAssignment.type}
// // // // //                 onChange={handleEditChange}
// // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // //                 required
// // // // //               >
// // // // //                 <option value="">Select type</option>
// // // // //                 <option value="Homework">Homework</option>
// // // // //                 <option value="Project">Project</option>
// // // // //                 <option value="Quiz">Quiz</option>
// // // // //                 <option value="Essay">Essay</option>
// // // // //                 <option value="Lab Report">Lab Report</option>
// // // // //               </select>
// // // // //             </label>

// // // // //             <label className="block mb-4">
// // // // //               Description
// // // // //               <textarea
// // // // //                 name="description"
// // // // //                 value={editingAssignment.description}
// // // // //                 onChange={handleEditChange}
// // // // //                 className="w-full rounded px-3 py-2 mt-1 text-gray-900"
// // // // //                 rows={3}
// // // // //               />
// // // // //             </label>

// // // // //             <label className="block mb-4">
// // // // //               Attachment (PDF, DOC, DOCX)
// // // // //               <input
// // // // //                 key={fileInputKey}
// // // // //                 type="file"
// // // // //                 name="file"
// // // // //                 accept=".pdf,.doc,.docx"
// // // // //                 onChange={handleEditChange}
// // // // //                 className="w-full mt-1 text-gray-900"
// // // // //               />
// // // // //               {editingAssignment.existingFileUrl && !editingAssignment.file && (
// // // // //                 <a
// // // // //                   href={editingAssignment.existingFileUrl}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className="text-purple-300 underline text-sm mt-1 block"
// // // // //                 >
// // // // //                   Current Attachment
// // // // //                 </a>
// // // // //               )}
// // // // //             </label>

// // // // //             <div className="flex justify-end gap-3">
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() => setEditingAssignment(null)}
// // // // //                 className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 type="submit"
// // // // //                 className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
// // // // //               >
// // // // //                 {editingAssignment.assignmentId ? "Update" : "Create"}
// // // // //               </button>
// // // // //             </div>
// // // // //           </form>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


















// // // // // // client/src/pages/dashboardAdmin/Assignments.js

// // // // // import React, { useState, useEffect, useContext } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { Dialog } from '@headlessui/react';
// // // // // import { PlusIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
// // // // // import { AuthContext } from '../../context/AuthContext'; 
// // // // // import {
// // // // //   createAssignment,
// // // // //   getAllAssignments,
// // // // //   getAssignmentsByCourse,
// // // // //   getSubmissions,
// // // // // } from '../../api/assignmentApi'; // ✅ fixed import
// // // // // import FileUpload from '../../components/FileUpload'; 
// // // // // import SubmissionStatus from '../../components/SubmissionStatus'; 
// // // // // import socket from '../../utils/socket'; 
// // // // // import { toast } from 'react-toastify';

// // // // // const Assignments = () => {
// // // // //   const { user } = useContext(AuthContext);
// // // // //   const navigate = useNavigate();

// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [submissionsLoading, setSubmissionsLoading] = useState({});
// // // // //   const [selectedAssignment, setSelectedAssignment] = useState(null);
// // // // //   const [assignments, setAssignments] = useState([]);
// // // // //   const [courses, setCourses] = useState([]);

// // // // //   const [formData, setFormData] = useState({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     startDate: '',
// // // // //     endDate: '',
// // // // //     courseId: '',
// // // // //     file: null,
// // // // //   });

// // // // //   const [errors, setErrors] = useState({});

// // // // //   // redirect if not admin
// // // // //   useEffect(() => {
// // // // //     if (!user || user.role !== 'Admin') {
// // // // //       toast.error('Access denied. Admin role required.');
// // // // //       navigate('/login');
// // // // //       return;
// // // // //     }

// // // // //     fetchAssignments();
// // // // //     fetchCourses();

// // // // //     if (user.id) {
// // // // //       socket.emit('joinCourse', 'all');
// // // // //       socket.on('submissionUpdate', () => fetchAssignments());
// // // // //       socket.on('newAssignment', () => fetchAssignments());
// // // // //       return () => {
// // // // //         socket.off('submissionUpdate');
// // // // //         socket.off('newAssignment');
// // // // //       };
// // // // //     }
// // // // //   }, [user, navigate]);

// // // // //   const fetchAssignments = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await getAllAssignments();
// // // // //       setAssignments(response || []);
// // // // //     } catch (err) {
// // // // //       toast.error('Failed to fetch assignments: ' + (err.response?.data?.message || err.message));
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchCourses = async () => {
// // // // //     // TODO: replace with real API
// // // // //     setCourses([{ _id: '1', title: 'Sample Course' }]);
// // // // //   };

// // // // //   const validateForm = () => {
// // // // //     const newErrors = {};
// // // // //     if (!formData.title.trim()) newErrors.title = 'Title is required';
// // // // //     if (!formData.description.trim()) newErrors.description = 'Description is required';
// // // // //     if (!formData.courseId) newErrors.courseId = 'Select a course';
// // // // //     if (!formData.startDate) newErrors.startDate = 'Start date is required';
// // // // //     if (!formData.endDate) newErrors.endDate = 'End date is required';
// // // // //     if (new Date(formData.startDate) >= new Date(formData.endDate))
// // // // //       newErrors.endDate = 'End date must be after start date';
// // // // //     if (!formData.file) newErrors.file = 'Assignment file is required';
// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   const handleInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // // //     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
// // // // //   };

// // // // //   const handleFileSelect = (file) => {
// // // // //     setFormData((prev) => ({ ...prev, file }));
// // // // //     if (errors.file) setErrors((prev) => ({ ...prev, file: '' }));
// // // // //   };

// // // // //   const handleCreate = async () => {
// // // // //     if (!validateForm()) {
// // // // //       toast.error('Please fix the errors in the form.');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     const submitData = new FormData();
// // // // //     Object.entries(formData).forEach(([key, val]) => {
// // // // //       if (val) submitData.append(key, val);
// // // // //     });

// // // // //     try {
// // // // //       await createAssignment(submitData);
// // // // //       setIsOpen(false);
// // // // //       setFormData({ title: '', description: '', startDate: '', endDate: '', courseId: '', file: null });
// // // // //       fetchAssignments();
// // // // //     } catch (err) {
// // // // //       toast.error('Failed to create assignment: ' + (err.response?.data?.message || err.message));
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleViewSubmissions = async (assignmentId) => {
// // // // //     if (selectedAssignment?.id === assignmentId) {
// // // // //       setSelectedAssignment(null);
// // // // //       return;
// // // // //     }

// // // // //     setSubmissionsLoading((prev) => ({ ...prev, [assignmentId]: true }));
// // // // //     try {
// // // // //       const response = await getSubmissions(assignmentId);
// // // // //       setSelectedAssignment({ id: assignmentId, submissions: response.submissions || [] });
// // // // //     } catch (err) {
// // // // //       toast.error('Failed to fetch submissions: ' + (err.response?.data?.message || err.message));
// // // // //     } finally {
// // // // //       setSubmissionsLoading((prev) => ({ ...prev, [assignmentId]: false }));
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6 space-y-6">
// // // // //       {/* header */}
// // // // //       <div className="flex justify-between items-center">
// // // // //         <div>
// // // // //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments Management</h1>
// // // // //           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// // // // //             Create and monitor assignments for your courses.
// // // // //           </p>
// // // // //         </div>
// // // // //         <button
// // // // //           onClick={() => setIsOpen(true)}
// // // // //           className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
// // // // //         >
// // // // //           <PlusIcon className="h-5 w-5 mr-2" />
// // // // //           Create Assignment
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* assignments list */}
// // // // //       <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
// // // // //         <ul className="divide-y divide-gray-200 dark:divide-gray-600">
// // // // //           {assignments.map((assignment) => (
// // // // //             <li key={assignment._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
// // // // //               <div className="flex justify-between items-center">
// // // // //                 <div className="flex-1">
// // // // //                   <h3 className="text-lg font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
// // // // //                   <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{assignment.description}</p>
// // // // //                   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
// // // // //                     Course: {assignment.courseId?.title || 'N/A'} | Start:{' '}
// // // // //                     {new Date(assignment.startDate).toLocaleDateString()} | Deadline:{' '}
// // // // //                     {new Date(assignment.endDate).toLocaleDateString()}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <button
// // // // //                     onClick={() => handleViewSubmissions(assignment._id)}
// // // // //                     disabled={submissionsLoading[assignment._id]}
// // // // //                     className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm rounded-md bg-white hover:bg-gray-50"
// // // // //                   >
// // // // //                     <EyeIcon className="h-4 w-4 mr-1" />
// // // // //                     {submissionsLoading[assignment._id] ? 'Loading...' : 'Submissions'}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {selectedAssignment?.id === assignment._id && (
// // // // //                 <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
// // // // //                   <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Submissions</h4>
// // // // //                   <SubmissionStatus submissions={selectedAssignment.submissions} />
// // // // //                 </div>
// // // // //               )}
// // // // //             </li>
// // // // //           ))}
// // // // //         </ul>
// // // // //         {assignments.length === 0 && !loading && (
// // // // //           <div className="text-center py-8">
// // // // //             <p className="text-gray-500 dark:text-gray-400">No assignments found. Create one to get started.</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* create assignment modal */}
// // // // //       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
// // // // //         {/* modal UI code unchanged ... */}
// // // // //       </Dialog>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Assignments;



















// // // // import React, { useState, useEffect, useContext } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { Dialog } from '@headlessui/react';
// // // // import { PlusIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
// // // // import { AuthContext } from '../../context/AuthContext';
// // // // import {
// // // //   createAssignment,
// // // //   getAllAssignments,
// // // //   getSubmissions,
// // // // } from '../../api/assignmentApi';
// // // // import FileUpload from '../../components/FileUpload';
// // // // import SubmissionStatus from '../../components/SubmissionStatus';
// // // // import socket from '../../utils/socket';
// // // // import { toast } from 'react-toastify';

// // // // const Assignments = () => {
// // // //   const { user } = useContext(AuthContext);
// // // //   const navigate = useNavigate();

// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [submissionsLoading, setSubmissionsLoading] = useState({});
// // // //   const [selectedAssignment, setSelectedAssignment] = useState(null);
// // // //   const [assignments, setAssignments] = useState([]);

// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     description: '',
// // // //     startDate: '',
// // // //     endDate: '',
// // // //     courseId: '',
// // // //     file: null,
// // // //   });

// // // //   const [errors, setErrors] = useState({});

// // // //   useEffect(() => {
// // // //     if (!user || user.role !== 'Admin') {
// // // //       toast.error('Access denied. Admin role required.');
// // // //       navigate('/login');
// // // //       return;
// // // //     }

// // // //     fetchAssignments();

// // // //     if (user.id) {
// // // //       socket.emit('joinCourse', 'all');
// // // //       socket.on('submissionUpdate', () => fetchAssignments());
// // // //       socket.on('newAssignment', () => fetchAssignments());
// // // //       return () => {
// // // //         socket.off('submissionUpdate');
// // // //         socket.off('newAssignment');
// // // //       };
// // // //     }
// // // //   }, [user, navigate]);

// // // //   const fetchAssignments = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await getAllAssignments();
// // // //       setAssignments(response || []);
// // // //     } catch (err) {
// // // //       toast.error('Failed to fetch assignments: ' + (err.response?.data?.message || err.message));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const validateForm = () => {
// // // //     const newErrors = {};
// // // //     if (!formData.title.trim()) newErrors.title = 'Title is required';
// // // //     if (!formData.description.trim()) newErrors.description = 'Description is required';
// // // //     if (!formData.courseId) newErrors.courseId = 'Select a course';
// // // //     if (!formData.startDate) newErrors.startDate = 'Start date is required';
// // // //     if (!formData.endDate) newErrors.endDate = 'End date is required';
// // // //     if (new Date(formData.startDate) >= new Date(formData.endDate))
// // // //       newErrors.endDate = 'End date must be after start date';
// // // //     if (!formData.file) newErrors.file = 'Assignment file is required';
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // //     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
// // // //   };

// // // //   const handleFileSelect = (file) => {
// // // //     setFormData((prev) => ({ ...prev, file }));
// // // //     if (errors.file) setErrors((prev) => ({ ...prev, file: '' }));
// // // //   };

// // // //   const handleCreate = async () => {
// // // //     if (!validateForm()) {
// // // //       toast.error('Please fix the errors in the form.');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     const submitData = new FormData();
// // // //     Object.entries(formData).forEach(([key, val]) => {
// // // //       if (val) submitData.append(key, val);
// // // //     });

// // // //     try {
// // // //       await createAssignment(submitData);
// // // //       setIsOpen(false);
// // // //       setFormData({ title: '', description: '', startDate: '', endDate: '', courseId: '', file: null });
// // // //       fetchAssignments();
// // // //     } catch (err) {
// // // //       toast.error('Failed to create assignment: ' + (err.response?.data?.message || err.message));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleViewSubmissions = async (assignmentId) => {
// // // //     if (selectedAssignment?.id === assignmentId) {
// // // //       setSelectedAssignment(null);
// // // //       return;
// // // //     }

// // // //     setSubmissionsLoading((prev) => ({ ...prev, [assignmentId]: true }));
// // // //     try {
// // // //       const response = await getSubmissions(assignmentId);
// // // //       setSelectedAssignment({ id: assignmentId, submissions: response.submissions || [] });
// // // //     } catch (err) {
// // // //       toast.error('Failed to fetch submissions: ' + (err.response?.data?.message || err.message));
// // // //     } finally {
// // // //       setSubmissionsLoading((prev) => ({ ...prev, [assignmentId]: false }));
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6 space-y-6 w-full h-full text-blue-900">
// // // //       {/* header */}
// // // //       <div className="flex justify-between items-center">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold">Assignments Management</h1>
// // // //           <p className="mt-1 text-sm text-blue-700">
// // // //             Create and monitor assignments for your courses.
// // // //           </p>
// // // //         </div>
// // // //         <button
// // // //           onClick={() => setIsOpen(true)}
// // // //           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// // // //         >
// // // //           <PlusIcon className="h-5 w-5 mr-2" />
// // // //           Create Assignment
// // // //         </button>
// // // //       </div>

// // // //       {/* assignments list */}
// // // //       <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl">
// // // //         <ul className="divide-y divide-blue-300/40">
// // // //           {assignments.map((assignment) => (
// // // //             <li key={assignment._id} className="px-6 py-4 hover:bg-blue-100/30 transition">
// // // //               <div className="flex justify-between items-center">
// // // //                 <div className="flex-1">
// // // //                   <h3 className="text-lg font-medium">{assignment.title}</h3>
// // // //                   <p className="mt-1 text-sm text-blue-700">{assignment.description}</p>
// // // //                   <p className="mt-2 text-sm text-blue-700">
// // // //                     Course: {assignment.courseId?.title || 'N/A'} | Start:{' '}
// // // //                     {new Date(assignment.startDate).toLocaleDateString()} | Deadline:{' '}
// // // //                     {new Date(assignment.endDate).toLocaleDateString()}
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <button
// // // //                     onClick={() => handleViewSubmissions(assignment._id)}
// // // //                     disabled={submissionsLoading[assignment._id]}
// // // //                     className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm rounded-md bg-white hover:bg-blue-50"
// // // //                   >
// // // //                     <EyeIcon className="h-4 w-4 mr-1" />
// // // //                     {submissionsLoading[assignment._id] ? 'Loading...' : 'Submissions'}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               {selectedAssignment?.id === assignment._id && (
// // // //                 <div className="mt-4 p-4 bg-blue-100/30 rounded-md">
// // // //                   <h4 className="text-md font-semibold mb-2">Submissions</h4>
// // // //                   <SubmissionStatus submissions={selectedAssignment.submissions} />
// // // //                 </div>
// // // //               )}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //         {assignments.length === 0 && !loading && (
// // // //           <div className="text-center py-8">
// // // //             <p className="text-blue-700">No assignments found. Create one to get started.</p>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* create assignment modal */}
// // // //       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
// // // //         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
// // // //         <div className="fixed inset-0 flex items-center justify-center p-4">
// // // //           <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-xl shadow-xl">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //               <Dialog.Title className="text-xl font-bold">Create Assignment</Dialog.Title>
// // // //               <button onClick={() => setIsOpen(false)}>
// // // //                 <XMarkIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
// // // //               </button>
// // // //             </div>

// // // //             <div className="space-y-4">
// // // //               <input
// // // //                 type="text"
// // // //                 name="title"
// // // //                 placeholder="Title"
// // // //                 value={formData.title}
// // // //                 onChange={handleInputChange}
// // // //                                 className="w-full border rounded-md p-2"
// // // //               />

// // // //               <textarea
// // // //                 name="description"
// // // //                 placeholder="Description"
// // // //                 value={formData.description}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full border rounded-md p-2"
// // // //               />

// // // //               <input
// // // //                 type="date"
// // // //                 name="startDate"
// // // //                 value={formData.startDate}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full border rounded-md p-2"
// // // //               />

// // // //               <input
// // // //                 type="date"
// // // //                 name="endDate"
// // // //                 value={formData.endDate}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full border rounded-md p-2"
// // // //               />

// // // //               <select
// // // //                 name="courseId"
// // // //                 value={formData.courseId}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full border rounded-md p-2"
// // // //               >
// // // //                 <option value="">Select Course</option>
// // // //                 <option value="1">Sample Course</option>
// // // //               </select>

// // // //               <FileUpload onFileSelect={handleFileSelect} />

// // // //               {Object.values(errors).length > 0 && (
// // // //                 <div className="text-red-500 text-sm space-y-1">
// // // //                   {Object.entries(errors).map(([key, msg]) => (
// // // //                     <p key={key}>{msg}</p>
// // // //                   ))}
// // // //                 </div>
// // // //               )}

// // // //               <div className="flex justify-end mt-4">
// // // //                 <button
// // // //                   onClick={handleCreate}
// // // //                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// // // //                 >
// // // //                   Submit Assignment
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </Dialog.Panel>
// // // //         </div>
// // // //       </Dialog>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Assignments;












// // // "use client"

// // // import { useEffect, useState } from "react"
// // // import dayjs from "dayjs"
// // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// // // import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

// // // const api = (path, opts = {}) =>
// // //   fetch(`/api/assignments${path}`, {
// // //     credentials: "include",
// // //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// // //     ...opts,
// // //   }).then(async (r) => {
// // //     const json = await r.json().catch(() => ({}))
// // //     if (!r.ok) {
// // //       if (r.status === 401 || r.status === 403) {
// // //         return { error: json.message || "Access denied", status: r.status }
// // //       }
// // //       throw new Error(json.message || "Request failed")
// // //     }
// // //     return json
// // //   })

// // // export default function AdminAssignments() {
// // //   const [list, setList] = useState([])
// // //   const [editing, setEditing] = useState(null)
// // //   const [form, setForm] = useState({
// // //     course: "",
// // //     title: "",
// // //     description: "",
// // //     instructions: "",
// // //     isPublished: false,
// // //     dueAt: "",
// // //     attachment: null, // { name, type, data }
// // //   })
// // //   const [error, setError] = useState(null)

// // //   const load = () =>
// // //     api("/admin")
// // //       .then((r) => {
// // //         if (r?.error) {
// // //           setError(r.error)
// // //           setList([])
// // //           return
// // //         }
// // //         setError(null)
// // //         setList(r.data || [])
// // //       })
// // //       .catch((e) => {
// // //         console.error(e)
// // //         setError(e.message || "Failed to load assignments")
// // //       })

// // //   useEffect(() => {
// // //     load()
// // //   }, [])

// // //   const reset = () =>
// // //     setForm({
// // //       course: "",
// // //       title: "",
// // //       description: "",
// // //       instructions: "",
// // //       isPublished: false,
// // //       dueAt: "",
// // //       attachment: null,
// // //     })

// // //   const save = async () => {
// // //     try {
// // //       const payload = { ...form, dueAt: form.dueAt || undefined }
// // //       const r = editing
// // //         ? await api(`/${editing}`, { method: "PUT", body: JSON.stringify(payload) })
// // //         : await api("", { method: "POST", body: JSON.stringify(payload) })

// // //       if (r?.error) {
// // //         setError(r.error)
// // //         return
// // //       }
// // //       setEditing(null)
// // //       reset()
// // //       await load()
// // //     } catch (e) {
// // //       console.error(e)
// // //       setError(e.message || "Failed to save assignment")
// // //     }
// // //   }

// // //   const remove = async (id) => {
// // //     try {
// // //       if (!window.confirm("Delete this assignment?")) return
// // //       const r = await api(`/${id}`, { method: "DELETE" })
// // //       if (r?.error) {
// // //         setError(r.error)
// // //         return
// // //       }
// // //       await load()
// // //     } catch (e) {
// // //       console.error(e)
// // //       setError(e.message || "Failed to delete assignment")
// // //     }
// // //   }

// // //   const edit = (a) => {
// // //     setEditing(a._id)
// // //     setForm({
// // //       course: a.course?._id || a.course,
// // //       title: a.title,
// // //       description: a.description || "",
// // //       instructions: a.instructions || "",
// // //       isPublished: !!a.isPublished,
// // //       dueAt: a.dueAt ? dayjs(a.dueAt).toISOString().slice(0, 16) : "",
// // //       attachment: a.attachment || null,
// // //     })
// // //   }

// // //   const onChooseFile = (file) => {
// // //     if (!file) return setForm((f) => ({ ...f, attachment: null }))
// // //     const allowed =
// // //       /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name) ||
// // //       [
// // //         "application/pdf",
// // //         "application/msword",
// // //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// // //         "application/vnd.ms-powerpoint",
// // //         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
// // //         "application/vnd.ms-excel",
// // //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //         "text/plain",
// // //         "application/zip",
// // //       ].includes(file.type)
// // //     if (!allowed) {
// // //       alert("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
// // //       return
// // //     }
// // //     const reader = new FileReader()
// // //     reader.onload = () =>
// // //       setForm((f) => ({
// // //         ...f,
// // //         attachment: { name: file.name, type: file.type || "application/octet-stream", data: reader.result },
// // //       }))
// // //     reader.readAsDataURL(file)
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-neutral-50">
// // //       {error && (
// // //         <div className="border border-red-300 bg-red-50 text-red-800 rounded p-3 max-w-6xl mx-auto">
// // //           {error === "Access denied. Admin role required." ? "You must be an admin to view this page." : error}
// // //         </div>
// // //       )}
// // //       {!error?.toLowerCase?.().includes("access denied") && (
// // //         <section className="space-y-4 max-w-6xl mx-auto">
// // //           <h1 className="text-3xl font-semibold">Assignments</h1>
// // //           <div className="grid md:grid-cols-2 gap-4">
// // //             <div className="border rounded p-4 space-y-3 bg-white">
// // //               <h2 className="font-semibold text-lg">{editing ? "Edit Assignment" : "Create Assignment"}</h2>
// // //               <input
// // //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //                 placeholder="Course ID or Course Name"
// // //                 value={form.course}
// // //                 onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
// // //               />
// // //               <input
// // //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //                 placeholder="Title"
// // //                 value={form.title}
// // //                 onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
// // //               />
// // //               <textarea
// // //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //                 placeholder="Description"
// // //                 value={form.description}
// // //                 onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
// // //               />
// // //               <textarea
// // //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //                 placeholder="Instructions"
// // //                 value={form.instructions}
// // //                 onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
// // //               />
// // //               <div className="flex items-center gap-2">
// // //                 <label className="text-sm">Published</label>
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={form.isPublished}
// // //                   onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
// // //                 />
// // //               </div>

// // //               <LocalizationProvider dateAdapter={AdapterDayjs}>
// // //                 <DateTimePicker
// // //                   label="Due At"
// // //                   value={form.dueAt ? dayjs(form.dueAt) : null}
// // //                   onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
// // //                   slotProps={{ textField: { fullWidth: true, size: "small" } }}
// // //                 />
// // //               </LocalizationProvider>

// // //               <div className="space-y-1">
// // //                 <label className="text-sm font-medium">Reference Attachment (optional)</label>
// // //                 <input
// // //                   type="file"
// // //                   accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
// // //                   onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
// // //                 />
// // //                 {form.attachment?.name && (
// // //                   <div className="text-xs text-neutral-600">Selected: {form.attachment.name}</div>
// // //                 )}
// // //               </div>

// // //               <div className="flex gap-2">
// // //                 <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={save}>
// // //                   {editing ? "Update" : "Create"}
// // //                 </button>
// // //                 {editing && (
// // //                   <button
// // //                     className="px-3 py-2 border rounded"
// // //                     onClick={() => {
// // //                       setEditing(null)
// // //                       reset()
// // //                     }}
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               {(list || []).map((a) => (
// // //                 <div key={a._id} className="border rounded p-4 space-y-2">
// // //                   <div className="flex items-center justify-between">
// // //                     <div>
// // //                       <div className="font-medium">{a.title}</div>
// // //                       <div className="text-sm text-neutral-600">{a.description}</div>
// // //                     </div>
// // //                     <div className="flex gap-2">
// // //                       <button className="px-2 py-1 border rounded" onClick={() => edit(a)}>
// // //                         Edit
// // //                       </button>
// // //                       <button className="px-2 py-1 border rounded" onClick={() => remove(a._id)}>
// // //                         Delete
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div className="text-sm text-neutral-700">
// // //                     Enrolled: {a.stats?.totalEnrollments ?? 0} • Submitted: {a.stats?.submitted ?? 0} • Not Submitted:{" "}
// // //                     {a.stats?.notSubmitted ?? 0}
// // //                   </div>
// // //                   <AllowResubmit assignmentId={a._id} />
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // function AllowResubmit({ assignmentId }) {
// // //   const [userId, setUserId] = useState("")
// // //   const submit = async () => {
// // //     if (!userId) return
// // //     await fetch(`/api/assignments/${assignmentId}/submissions/${userId}/allow-resubmit`, {
// // //       method: "PATCH",
// // //       credentials: "include",
// // //     })
// // //       .then(async (r) => {
// // //         const j = await r.json().catch(() => ({}))
// // //         if (!r.ok) throw new Error(j.message || "Failed")
// // //         alert("User unlocked for resubmit.")
// // //         setUserId("")
// // //       })
// // //       .catch((e) => alert(e.message))
// // //   }
// // //   return (
// // //     <div className="flex items-center gap-2">
// // //       <input
// // //         className="border rounded px-2 py-1"
// // //         placeholder="User ID (Mongo _id)"
// // //         value={userId}
// // //         onChange={(e) => setUserId(e.target.value)}
// // //       />
// // //       <button className="px-2 py-1 border rounded" onClick={submit}>
// // //         Allow Resubmit
// // //       </button>
// // //     </div>
// // //   )
// // // }













// // //client/src/pages/dashboardAdmin/Assignments.js

// // "use client"

// // import { useEffect, useState } from "react"
// // import dayjs from "dayjs"
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// // import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

// // const api = (path, opts = {}) =>
// //   fetch(`/api/assignments${path}`, {
// //     credentials: "include",
// //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// //     ...opts,
// //   }).then(async (r) => {
// //     const json = await r.json().catch(() => ({}))
// //     if (!r.ok) {
// //       if (r.status === 401 || r.status === 403) {
// //         return { error: json.message || "Access denied", status: r.status }
// //       }
// //       throw new Error(json.message || "Request failed")
// //     }
// //     return json
// //   })

// // export default function AdminAssignments() {
// //   const [list, setList] = useState([])
// //   const [editing, setEditing] = useState(null)
// //   const [form, setForm] = useState({
// //     course: "",
// //     title: "",
// //     description: "",
// //     instructions: "",
// //     isPublished: false,
// //     dueAt: "",
// //     attachment: null, // { name, type, data }
// //   })
// //   const [error, setError] = useState(null)

// //   const load = () =>
// //     api("/admin")
// //       .then((r) => {
// //         if (r?.error) {
// //           setError(r.error)
// //           setList([])
// //           return
// //         }
// //         setError(null)
// //         setList(r.data || [])
// //       })
// //       .catch((e) => {
// //         console.error(e)
// //         setError(e.message || "Failed to load assignments")
// //       })

// //   useEffect(() => {
// //     load()
// //   }, [])

// //   const reset = () =>
// //     setForm({
// //       course: "",
// //       title: "",
// //       description: "",
// //       instructions: "",
// //       isPublished: false,
// //       dueAt: "",
// //       attachment: null,
// //     })

// //   const save = async () => {
// //     try {
// //       const payload = { ...form, dueAt: form.dueAt || undefined }
// //       const r = editing
// //         ? await api(`/${editing}`, { method: "PUT", body: JSON.stringify(payload) })
// //         : await api("", { method: "POST", body: JSON.stringify(payload) })

// //       if (r?.error) {
// //         setError(r.error)
// //         return
// //       }
// //       setEditing(null)
// //       reset()
// //       await load()
// //     } catch (e) {
// //       console.error(e)
// //       setError(e.message || "Failed to save assignment")
// //     }
// //   }

// //   const remove = async (id) => {
// //     try {
// //       if (!window.confirm("Delete this assignment?")) return
// //       const r = await api(`/${id}`, { method: "DELETE" })
// //       if (r?.error) {
// //         setError(r.error)
// //         return
// //       }
// //       await load()
// //     } catch (e) {
// //       console.error(e)
// //       setError(e.message || "Failed to delete assignment")
// //     }
// //   }

// //   const edit = (a) => {
// //     setEditing(a._id)
// //     setForm({
// //       course: a.course?._id || a.course,
// //       title: a.title,
// //       description: a.description || "",
// //       instructions: a.instructions || "",
// //       isPublished: !!a.isPublished,
// //       dueAt: a.dueAt ? dayjs(a.dueAt).toISOString().slice(0, 16) : "",
// //       attachment: a.attachment || null,
// //     })
// //   }

// //   const onChooseFile = (file) => {
// //     if (!file) return setForm((f) => ({ ...f, attachment: null }))
// //     const allowed =
// //       /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name) ||
// //       [
// //         "application/pdf",
// //         "application/msword",
// //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// //         "application/vnd.ms-powerpoint",
// //         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
// //         "application/vnd.ms-excel",
// //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //         "text/plain",
// //         "application/zip",
// //       ].includes(file.type)
// //     if (!allowed) {
// //       alert("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
// //       return
// //     }
// //     const reader = new FileReader()
// //     reader.onload = () =>
// //       setForm((f) => ({
// //         ...f,
// //         attachment: { name: file.name, type: file.type || "application/octet-stream", data: reader.result },
// //       }))
// //     reader.readAsDataURL(file)
// //   }

// //   return (
// //     <div className="min-h-screen p-6 bg-neutral-50">
// //       {error && (
// //         <div className="border border-red-300 bg-red-50 text-red-800 rounded p-3 max-w-6xl mx-auto">
// //           {error === "Access denied. Admin role required." ? "You must be an admin to view this page." : error}
// //         </div>
// //       )}
// //       {!error?.toLowerCase?.().includes("access denied") && (
// //         <section className="space-y-4 max-w-7xl mx-auto">
// //           <h1 className="text-3xl font-semibold">Assignments</h1>
// //           <div className="grid md:grid-cols-2 gap-4">
// //             <div className="border rounded p-4 space-y-3 bg-white">
// //               <h2 className="font-semibold text-lg">{editing ? "Edit Assignment" : "Create Assignment"}</h2>
// //               <input
// //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// //                 placeholder="Course ID or Course Name"
// //                 value={form.course}
// //                 onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
// //               />
// //               <input
// //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// //                 placeholder="Title"
// //                 value={form.title}
// //                 onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
// //               />
// //               <textarea
// //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// //                 placeholder="Description"
// //                 value={form.description}
// //                 onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
// //               />
// //               <textarea
// //                 className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// //                 placeholder="Instructions"
// //                 value={form.instructions}
// //                 onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
// //               />
// //               <div className="flex items-center gap-2">
// //                 <label className="text-sm">Published</label>
// //                 <input
// //                   type="checkbox"
// //                   checked={form.isPublished}
// //                   onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
// //                 />
// //               </div>

// //               <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                 <DateTimePicker
// //                   label="Due At"
// //                   value={form.dueAt ? dayjs(form.dueAt) : null}
// //                   onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
// //                   slotProps={{
// //                     textField: {
// //                       fullWidth: true,
// //                       size: "small",
// //                       sx: {
// //                         "& .MuiInputBase-input": { color: "black" },
// //                         "& .MuiInputLabel-root": { color: "rgb(37 99 235)" },
// //                       },
// //                     },
// //                   }}
// //                 />
// //               </LocalizationProvider>

// //               <div className="space-y-1">
// //                 <label className="text-sm font-medium">Reference Attachment (optional)</label>
// //                 <input
// //                   type="file"
// //                   accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
// //                   onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
// //                 />
// //                 {form.attachment?.name && (
// //                   <div className="text-xs text-neutral-600">Selected: {form.attachment.name}</div>
// //                 )}
// //               </div>

// //               <div className="flex gap-2">
// //                 <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={save}>
// //                   {editing ? "Update" : "Create"}
// //                 </button>
// //                 {editing && (
// //                   <button
// //                     className="px-3 py-2 border rounded"
// //                     onClick={() => {
// //                       setEditing(null)
// //                       reset()
// //                     }}
// //                   >
// //                     Cancel
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               {(list || []).map((a) => (
// //                 <div key={a._id} className="border rounded p-4 space-y-2">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <div className="font-medium">{a.title}</div>
// //                       <div className="text-sm text-neutral-600">{a.description}</div>
// //                     </div>
// //                     <div className="flex gap-2">
// //                       <button className="px-2 py-1 border rounded" onClick={() => edit(a)}>
// //                         Edit
// //                       </button>
// //                       <button className="px-2 py-1 border rounded" onClick={() => remove(a._id)}>
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="text-sm text-neutral-700">
// //                     Enrolled: {a.stats?.totalEnrollments ?? 0} • Submitted: {a.stats?.submitted ?? 0} • Not Submitted:{" "}
// //                     {a.stats?.notSubmitted ?? 0}
// //                   </div>
// //                   <AllowResubmit assignmentId={a._id} />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //       )}
// //     </div>
// //   )
// // }

// // function AllowResubmit({ assignmentId }) {
// //   const [userId, setUserId] = useState("")
// //   const submit = async () => {
// //     if (!userId) return
// //     await fetch(`/api/assignments/${assignmentId}/submissions/${userId}/allow-resubmit`, {
// //       method: "PATCH",
// //       credentials: "include",
// //     })
// //       .then(async (r) => {
// //         const j = await r.json().catch(() => ({}))
// //         if (!r.ok) throw new Error(j.message || "Failed")
// //         alert("User unlocked for resubmit.")
// //         setUserId("")
// //       })
// //       .catch((e) => alert(e.message))
// //   }
// //   return (
// //     <div className="flex items-center gap-2">
// //       <input
// //         className="border rounded px-2 py-1"
// //         placeholder="User ID (Mongo _id)"
// //         value={userId}
// //         onChange={(e) => setUserId(e.target.value)}
// //       />
// //       <button className="px-2 py-1 border rounded" onClick={submit}>
// //         Allow Resubmit
// //       </button>
// //     </div>
// //   )
// // }
















// //client/src/pages/dashboardAdmin/Assignments.js

// "use client"

// import { useEffect, useState } from "react"
// import dayjs from "dayjs"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
// import { Collapse } from "@mui/material"
// import { 
//   FileText, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Save, 
//   X, 
//   Upload, 
//   CheckCircle, 
//   Users, 
//   Send, 
//   Clock,
//   AlertCircle,
//   BookOpen,
//   // ChevronDown,
//   ChevronUp
// } from "lucide-react"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"



// // const api = (path, opts = {}) =>
// //   fetch(`/api/assignments${path}`, {
// //     credentials: "include",
// //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// //     ...opts,
// //   }).then(async (r) => {
// //     const json = await r.json().catch(() => ({}))
// //     if (!r.ok) {
// //       if (r.status === 401 || r.status === 403) {
// //         return { error: json.message || "Access denied", status: r.status }
// //       }
// //       throw new Error(json.message || "Request failed")
// //     }
// //     return json
// //   })


// const api = async (path, opts = {}) => {
//   const token = localStorage.getItem("token"); // or sessionStorage if you store it there

//   const response = await fetch(`/api/assignments${path}`, {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(opts.headers || {}),
//     },
//     ...opts,
//   });

//   const json = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     console.error("❌ API error:", {
//       status: response.status,
//       message: json.message,
//       body: json,
//     });

//     if (response.status === 401 || response.status === 403) {
//       return { error: json.message || "Access denied", status: response.status };
//     }

//     throw new Error(json.message || "Request failed");
//   }

//   return json;
// };


// export default function AdminAssignments() {
//   const [list, setList] = useState([])
//   const [editing, setEditing] = useState(null)
//   const [showCreateForm, setShowCreateForm] = useState(false)
//   const [form, setForm] = useState({
//     course: "",
//     title: "",
//     description: "",
//     instructions: "",
//     isPublished: false,
//     dueAt: "",
//     attachment: null,
//   })
//   const [error, setError] = useState(null)

//   const load = () =>
//     api("/admin")
//       .then((r) => {
//         if (r?.error) {
//           setError(r.error)
//           setList([])
//           return
//         }
//         setError(null)
//         setList(r.data || [])
//       })
//       .catch((e) => {
//         console.error(e)
//         setError(e.message || "Failed to load assignments")
//       })

//   useEffect(() => {
//     load()
//   }, [])

//   const reset = () =>
//     setForm({
//       course: "",
//       title: "",
//       description: "",
//       instructions: "",
//       isPublished: false,
//       dueAt: "",
//       attachment: null,
//     })

//   // const save = async () => {
//   //   try {
//   //     if (!form.course.trim() || !form.title.trim()) {
//   //       toast.error("Course and title are required")
//   //       return
//   //     }

//   //     const payload = { ...form, dueDate: form.dueAt || undefined }
//   //     const r = editing
//   //       ? await api(`/${editing}`, { method: "PUT", body: JSON.stringify(payload) })
//   //       : await api("", { method: "POST", body: JSON.stringify(payload) })

//   //     if (r?.error) {
//   //       toast.error(r.error)
//   //       return
//   //     }

//   //     if (editing) {
//   //       toast.success("Assignment updated successfully! Students will be notified.")
//   //     } else {
//   //       toast.success("Assignment created successfully! Students have been notified.")
//   //     }

//   //     setEditing(null)
//   //     setShowCreateForm(false)
//   //     reset()
//   //     await load()
//   //   } catch (e) {
//   //     console.error(e)
//   //     toast.error(e.message || "Failed to save assignment")
//   //   }
//   // }



//   const save = async () => {
//   try {
//     if (!form.course.trim() || !form.title.trim()) {
//       toast.error("Course and title are required")
//       return
//     }

//     let courseId = form.course

//     // 🔐 Attach token for protected course lookup
//     if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
//       const token = localStorage.getItem("token")

//       const res = await fetch("/api/courses/admin/all", {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       })

//       const data = await res.json()

//       const match = data?.courses?.find(
//         (c) => c.code?.toLowerCase() === courseId.toLowerCase()
//       )

//       if (!match) {
//         toast.error(`Course code "${courseId}" not found`)
//         return
//       }

//       courseId = match._id
//     }

//     const payload = {
//       ...form,
//       course: courseId,
//       dueDate: form.dueAt || undefined,
//     }

//     const r = editing
//       ? await api(`/${editing}`, { method: "PUT", body: JSON.stringify(payload) })
//       : await api("", { method: "POST", body: JSON.stringify(payload) })

//     if (r?.error) {
//       toast.error(r.error)
//       return
//     }

//     toast.success(editing
//       ? "Assignment updated successfully! Students will be notified."
//       : "Assignment created successfully! Students have been notified.")

//     setEditing(null)
//     setShowCreateForm(false)
//     reset()
//     await load()
//   } catch (e) {
//     console.error(e)
//     toast.error(e.message || "Failed to save assignment")
//   }
// }



//   const remove = async (id) => {
//     try {
//       if (!window.confirm("Delete this assignment? Students will be notified.")) return
//       const r = await api(`/${id}`, { method: "DELETE" })
//       if (r?.error) {
//         toast.error(r.error)
//         return
//       }
//       toast.success("Assignment deleted! Students have been notified.")
//       await load()
//     } catch (e) {
//       console.error(e)
//       toast.error(e.message || "Failed to delete assignment")
//     }
//   }

//   const edit = (a) => {
//     setEditing(a._id)
//     setShowCreateForm(true)
//     setForm({
//       course: a.course?._id || a.course,
//       title: a.title,
//       description: a.description || "",
//       instructions: a.instructions || "",
//       isPublished: !!a.isPublished,
//       dueAt: a.dueAt ? dayjs(a.dueAt).toISOString().slice(0, 16) : "",
//       attachment: a.attachment || null,
//     })
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const onChooseFile = (file) => {
//     if (!file) return setForm((f) => ({ ...f, attachment: null }))
//     const allowed =
//       /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name) ||
//       [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-powerpoint",
//         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "text/plain",
//         "application/zip",
//       ].includes(file.type)
//     if (!allowed) {
//       toast.error("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
//       return
//     }
//     const reader = new FileReader()
//     reader.onload = () =>
//       setForm((f) => ({
//         ...f,
//         attachment: { name: file.name, type: file.type || "application/octet-stream", data: reader.result },
//       }))
//     reader.readAsDataURL(file)
//   }

//   const toggleCreateForm = () => {
//     setShowCreateForm(!showCreateForm)
//     setEditing(null)
//     reset()
//   }

//   // Calculate statistics
//   const stats = {
//     total: list.length,
//     published: list.filter(a => a.isPublished).length,
//     draft: list.filter(a => !a.isPublished).length,
//     totalEnrollments: list.reduce((sum, a) => sum + (a.stats?.totalEnrollments || 0), 0),
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <ToastContainer position="bottom-right" theme="colored" />

//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
//             <FileText className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             Assignment Management
//           </h1>
//         </div>
//         <p className="text-slate-400 ml-15">Create and manage course assignments</p>
//       </div>

//       {/* Error Alert */}
//       {error && (
//         <div className="max-w-7xl mx-auto mb-6">
//           <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
//             <div className="flex-1">
//               <p className="text-red-400 font-medium">Error</p>
//               <p className="text-red-300 text-sm mt-1">
//                 {error === "Access denied. Admin role required." ? "You must be an admin to view this page." : error}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {!error?.toLowerCase?.().includes("access denied") && (
//         <>
//           {/* Stats Cards */}
//           <div className="max-w-7xl mx-auto mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-500 text-sm font-medium">Total Assignments</p>
//                     <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                     <FileText className="w-6 h-6 text-purple-600" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-500 text-sm font-medium">Published</p>
//                     <p className="text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-500 text-sm font-medium">Drafts</p>
//                     <p className="text-3xl font-bold text-orange-600 mt-1">{stats.draft}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//                     <Edit className="w-6 h-6 text-orange-600" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-500 text-sm font-medium">Total Enrollments</p>
//                     <p className="text-3xl font-bold text-blue-600 mt-1">{stats.totalEnrollments}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <Users className="w-6 h-6 text-blue-600" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Create Assignment Button */}
//           <div className="max-w-7xl mx-auto mb-6">
//             <button
//               onClick={toggleCreateForm}
//               className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl w-full md:w-auto"
//             >
//               {showCreateForm ? (
//                 <>
//                   <ChevronUp className="w-5 h-5" />
//                   Hide Form
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-5 h-5" />
//                   Create New Assignment
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Create/Edit Form - Collapsible */}
//           <Collapse in={showCreateForm} timeout={400}>
//             <div className="max-w-7xl mx-auto mb-8">
//               <div className="bg-white rounded-2xl shadow-xl p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className={`w-10 h-10 ${editing ? 'bg-blue-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
//                     {editing ? <Edit className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
//                   </div>
//                   <h2 className="text-2xl font-bold text-slate-900">
//                     {editing ? "Edit Assignment" : "Create Assignment"}
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-5">
//                     {/* Course Input */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Course ID or Name *
//                       </label>
//                       <div className="relative">
//                         <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                         <input
//                           className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
//                           placeholder="Enter course ID or name"
//                           value={form.course}
//                           onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
//                         />
//                       </div>
//                     </div>

//                     {/* Title Input */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Assignment Title *
//                       </label>
//                       <input
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
//                         placeholder="Enter assignment title"
//                         value={form.title}
//                         onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
//                       />
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Description
//                       </label>
//                       <textarea
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
//                         placeholder="Brief description of the assignment"
//                         rows={3}
//                         value={form.description}
//                         onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
//                       />
//                     </div>

//                     {/* Instructions */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Instructions
//                       </label>
//                       <textarea
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
//                         placeholder="Detailed instructions for students"
//                         rows={4}
//                         value={form.instructions}
//                         onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-5">
//                     {/* Published Toggle */}
//                     <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
//                       <input
//                         type="checkbox"
//                         id="published"
//                         checked={form.isPublished}
//                         onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
//                         className="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
//                       />
//                       <label htmlFor="published" className="text-sm font-semibold text-slate-700 cursor-pointer flex-1">
//                         Publish Assignment
//                       </label>
//                       {form.isPublished && (
//                         <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
//                           Live
//                         </span>
//                       )}
//                     </div>

//                     {/* Due Date Picker */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Due Date & Time
//                       </label>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DateTimePicker
//                           value={form.dueAt ? dayjs(form.dueAt) : null}
//                           onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
//                           slotProps={{
//                             textField: {
//                               fullWidth: true,
//                               sx: {
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: '12px',
//                                   backgroundColor: 'white',
//                                   '& fieldset': {
//                                     borderWidth: '2px',
//                                     borderColor: 'rgb(226, 232, 240)',
//                                   },
//                                   '&:hover fieldset': {
//                                     borderColor: 'rgb(148, 163, 184)',
//                                   },
//                                   '&.Mui-focused fieldset': {
//                                     borderColor: '#a855f7',
//                                   },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   color: 'rgb(15, 23, 42)',
//                                   padding: '12px 16px',
//                                 },
//                                 '& .MuiInputLabel-root': {
//                                   color: 'rgb(100, 116, 139)',
//                                   '&.Mui-focused': {
//                                     color: '#a855f7',
//                                   },
//                                 },
//                               },
//                             },
//                           }}
//                         />
//                       </LocalizationProvider>
//                     </div>

//                     {/* File Upload */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Reference Attachment (Optional)
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="file"
//                           accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
//                           onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
//                           className="hidden"
//                           id="file-upload"
//                         />
//                         <label
//                           htmlFor="file-upload"
//                           className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer"
//                         >
//                           <Upload className="w-5 h-5 text-slate-500" />
//                           <span className="text-sm font-medium text-slate-600">
//                             Click to upload file
//                           </span>
//                         </label>
//                       </div>
//                       {form.attachment?.name && (
//                         <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-purple-600" />
//                           <span className="text-sm text-purple-700 font-medium">{form.attachment.name}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Info Box */}
//                     <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                       <div className="flex gap-2">
//                         <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <p className="text-sm font-semibold text-blue-900 mb-1">Student Notification</p>
//                           <p className="text-xs text-blue-700">
//                             Students enrolled in the course will be automatically notified when you create, update, or delete this assignment.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 mt-8">
//                   <button
//                     onClick={save}
//                     className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
//                   >
//                     <Save className="w-5 h-5" />
//                     {editing ? "Update Assignment" : "Create Assignment"}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditing(null)
//                       setShowCreateForm(false)
//                       reset()
//                     }}
//                     className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
//                   >
//                     <X className="w-5 h-5" />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Collapse>

//           {/* Assignments List */}
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-slate-900">All Assignments</h2>
//               <span className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl text-sm shadow-md">
//                 {list.length} Total
//               </span>
//             </div>

//             {list.length === 0 ? (
//               <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-slate-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-900 mb-2">No assignments yet</h3>
//                 <p className="text-slate-500">Click "Create New Assignment" to get started</p>
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {list.map((a) => (
//                   <div
//                     key={a._id}
//                     className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
//                   >
//                     {/* Assignment Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                           <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{a.title}</h3>
//                         </div>
//                         {a.isPublished ? (
//                           <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
//                             Published
//                           </span>
//                         ) : (
//                           <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
//                             Draft
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <p className="text-slate-600 text-sm mb-4 line-clamp-2">{a.description || "No description"}</p>

//                     {/* Stats */}
//                     <div className="grid grid-cols-3 gap-2 mb-4">
//                       <div className="bg-slate-50 rounded-lg p-2 text-center">
//                         <Users className="w-4 h-4 text-slate-500 mx-auto mb-1" />
//                         <p className="text-lg font-bold text-slate-900">{a.stats?.totalEnrollments ?? 0}</p>
//                         <p className="text-xs text-slate-500">Enrolled</p>
//                       </div>
//                       <div className="bg-green-50 rounded-lg p-2 text-center">
//                         <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
//                         <p className="text-lg font-bold text-green-600">{a.stats?.submitted ?? 0}</p>
//                         <p className="text-xs text-green-600">Done</p>
//                       </div>
//                       <div className="bg-orange-50 rounded-lg p-2 text-center">
//                         <Clock className="w-4 h-4 text-orange-600 mx-auto mb-1" />
//                         <p className="text-lg font-bold text-orange-600">{a.stats?.notSubmitted ?? 0}</p>
//                         <p className="text-xs text-orange-600">Pending</p>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-2 mb-4">
//                       <button
//                         onClick={() => edit(a)}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm"
//                       >
//                         <Edit className="w-4 h-4" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => remove(a._id)}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Delete
//                       </button>
//                     </div>

//                     {/* Allow Resubmit */}
//                     <AllowResubmit assignmentId={a._id} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// function AllowResubmit({ assignmentId }) {
//   const [userId, setUserId] = useState("")
//   const [loading, setLoading] = useState(false)

//   const submit = async () => {
//     if (!userId.trim()) {
//       toast.error("Please enter a user ID")
//       return
//     }
//     setLoading(true)
//     await fetch(`/api/assignments/${assignmentId}/submissions/${userId}/allow-resubmit`, {
//       method: "PATCH",
//       credentials: "include",
//     })
//       .then(async (r) => {
//         const j = await r.json().catch(() => ({}))
//         if (!r.ok) throw new Error(j.message || "Failed")
//         toast.success("User unlocked for resubmit successfully!")
//         setUserId("")
//       })
//       .catch((e) => toast.error(e.message))
//       .finally(() => setLoading(false))
//   }

//   return (
//     <div className="pt-4 border-t border-slate-200">
//       <label className="block text-xs font-semibold text-slate-700 mb-2">
//         Allow Student Resubmit
//       </label>
//       <div className="flex gap-2">
//         <input
//           className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
//           placeholder="User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <button
//           onClick={submit}
//           disabled={loading}
//           className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all text-sm"
//         >
//           <Send className="w-3 h-3" />
//           {loading ? "..." : "Allow"}
//         </button>
//       </div>
//     </div>
//   )
// }













//client/src/pages/admin/assignments.js

"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { Collapse } from "@mui/material"
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  CheckCircle,
  Users,
  Send,
  Clock,
  AlertCircle,
  BookOpen,
  ChevronUp,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const api = async (path, opts = {}) => {
  const token = localStorage.getItem("token")

  const response = await fetch(`/api/assignments${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    ...opts,
  })

  let json = {};
  const text = await response.text();
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("❌ Failed to parse JSON:", text);
    json = { message: text || `HTTP ${response.status}` };
  }

  if (!response.ok) {
    console.error("❌ API error:", {
      status: response.status,
      message: json.message,
      body: json,
    })

    const errorMessage = json.message || json.error || `Error ${response.status}: ${response.statusText || 'Unknown error'}`;

    if (response.status === 401 || response.status === 403) {
      return { error: errorMessage, status: response.status }
    }

    throw new Error(errorMessage)
  }

  return json
}

export default function AdminAssignments() {
  const [list, setList] = useState([])
  const [editing, setEditing] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [form, setForm] = useState({
    course: "",
    title: "",
    description: "",
    instructions: "",
    isPublished: false,
    dueAt: "",
    attachment: null,
  })
  const [error, setError] = useState(null)

  const load = () =>
    api("/admin")
      .then((r) => {
        if (r?.error) {
          setError(r.error)
          setList([])
          return
        }
        setError(null)
        setList(r.data || [])
      })
      .catch((e) => {
        console.error(e)
        setError(e.message || "Failed to load assignments")
      })

  useEffect(() => {
    load()
  }, [])

  const reset = () =>
    setForm({
      course: "",
      title: "",
      description: "",
      instructions: "",
      isPublished: false,
      dueAt: "",
      attachment: null,
    })

  const save = async () => {
    try {
      if (!form.course.trim() || !form.title.trim()) {
        toast.error("Course and title are required")
        return
      }

      let courseId = form.course

      if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
        const token = localStorage.getItem("token")

        const res = await fetch("/api/courses/admin/all", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        const data = await res.json()
        const courses = data?.data?.courses || []

        const match = courses.find(
          (c) =>
            c.courseId?.toLowerCase() === courseId.toLowerCase() ||
            c.title?.toLowerCase() === courseId.toLowerCase(),
        )

        if (!match) {
          toast.error(`Course code or name "${courseId}" not found`)
          return
        }

        courseId = match._id
      }

      const payload = {
        course: courseId,
        title: form.title,
        description: form.description || "",
        dueDate: form.dueAt || null,
        maxScore: 100,
        isPublished: form.isPublished || false,
      }

      const r = editing
        ? await api(`/${editing}`, { method: "PUT", body: JSON.stringify(payload) })
        : await api("", { method: "POST", body: JSON.stringify(payload) })

      if (r?.error) {
        toast.error(r.error)
        return
      }

      toast.success(
        editing
          ? "Assignment updated successfully! Students will be notified."
          : "Assignment created successfully! Students have been notified.",
      )

      setEditing(null)
      setShowCreateForm(false)
      reset()
      await load()
    } catch (e) {
      console.error(e)
      toast.error(e.message || "Failed to save assignment")
    }
  }

  const remove = async (id) => {
    try {
      if (!window.confirm("Delete this assignment? Students will be notified.")) return
      const r = await api(`/${id}`, { method: "DELETE" })
      if (r?.error) {
        toast.error(r.error)
        return
      }
      toast.success("Assignment deleted! Students have been notified.")
      await load()
    } catch (e) {
      console.error(e)
      toast.error(e.message || "Failed to delete assignment")
    }
  }

  const edit = (a) => {
    setEditing(a._id)
    setShowCreateForm(true)
    setForm({
      course: a.courseId?._id || a.courseId || "",
      title: a.title || "",
      description: a.description || "",
      instructions: a.instructions || "",
      isPublished: !!a.isPublished,
      dueAt: a.dueDate ? dayjs(a.dueDate).toISOString().slice(0, 16) : "",
      attachment: a.attachment || null,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onChooseFile = (file) => {
    if (!file) return setForm((f) => ({ ...f, attachment: null }))
    const allowed =
      /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name) ||
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "application/zip",
      ].includes(file.type)
    if (!allowed) {
      toast.error("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
      return
    }
    const reader = new FileReader()
    reader.onload = () =>
      setForm((f) => ({
        ...f,
        attachment: { name: file.name, type: file.type || "application/octet-stream", data: reader.result },
      }))
    reader.readAsDataURL(file)
  }

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm)
    setEditing(null)
    reset()
  }

  const stats = {
    total: list.length,
    published: list.filter((a) => a.isPublished).length,
    draft: list.filter((a) => !a.isPublished).length,
    totalEnrollments: list.reduce((sum, a) => sum + (a.stats?.totalEnrollments || 0), 0),
  }

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="bottom-right" theme="colored" />

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Assignment Management
          </h1>
        </div>
        <p className="text-slate-400 ml-15">Create and manage course assignments</p>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm mt-1">
                {error === "Access denied. Admin role required." ? "You must be an admin to view this page." : error}
              </p>
            </div>
          </div>
        </div>
      )}

      {!error?.toLowerCase?.().includes("access denied") && (
        <>
          <div className="max-w-7xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Total Assignments</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Published</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Drafts</p>
                    <p className="text-3xl font-bold text-orange-600 mt-1">{stats.draft}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Edit className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Total Enrollments</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{stats.totalEnrollments}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-6">
            <button
              onClick={toggleCreateForm}
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl w-full md:w-auto"
            >
              {showCreateForm ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Hide Form
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create New Assignment
                </>
              )}
            </button>
          </div>

          <Collapse in={showCreateForm} timeout={400}>
            <div className="max-w-7xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 ${editing ? "bg-blue-100" : "bg-green-100"} rounded-lg flex items-center justify-center`}
                  >
                    {editing ? <Edit className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editing ? "Edit Assignment" : "Create Assignment"}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Course ID or Name *</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                          placeholder="Enter course ID or name"
                          value={form.course}
                          onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Assignment Title *</label>
                      <input
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                        placeholder="Enter assignment title"
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                      <textarea
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
                        placeholder="Brief description of the assignment"
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Instructions</label>
                      <textarea
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"
                        placeholder="Detailed instructions for students"
                        rows={4}
                        value={form.instructions}
                        onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                      <input
                        type="checkbox"
                        id="published"
                        checked={form.isPublished}
                        onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="published" className="text-sm font-semibold text-slate-700 cursor-pointer flex-1">
                        Publish Assignment
                      </label>
                      {form.isPublished && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Live
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Due Date & Time</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          value={form.dueAt ? dayjs(form.dueAt) : null}
                          onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              sx: {
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  backgroundColor: "white",
                                  "& fieldset": {
                                    borderWidth: "2px",
                                    borderColor: "rgb(226, 232, 240)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgb(148, 163, 184)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#a855f7",
                                  },
                                },
                                "& .MuiInputBase-input": {
                                  color: "rgb(15, 23, 42)",
                                  padding: "12px 16px",
                                },
                                "& .MuiInputLabel-root": {
                                  color: "rgb(100, 116, 139)",
                                  "&.Mui-focused": {
                                    color: "#a855f7",
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Reference Attachment (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
                          onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer"
                        >
                          <Upload className="w-5 h-5 text-slate-500" />
                          <span className="text-sm font-medium text-slate-600">Click to upload file</span>
                        </label>
                      </div>
                      {form.attachment?.name && (
                        <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-purple-700 font-medium">{form.attachment.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">Student Notification</p>
                          <p className="text-xs text-blue-700">
                            Students enrolled in the course will be automatically notified when you create, update, or
                            delete this assignment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={save}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Save className="w-5 h-5" />
                    {editing ? "Update Assignment" : "Create Assignment"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null)
                      setShowCreateForm(false)
                      reset()
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Collapse>

          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">All Assignments</h2>
              <span className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl text-sm shadow-md">
                {list.length} Total
              </span>
            </div>

            {list.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No assignments yet</h3>
                <p className="text-slate-500">Click "Create New Assignment" to get started</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((a) => (
                  <div key={a._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{a.title}</h3>
                        </div>
                        {a.isPublished ? (
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                            Draft
                          </span>
                        )}
                        {a.submissionCount !== undefined && (
                          <span className="inline-block ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            📝 {a.submissionCount} Submission{a.submissionCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{a.description || "No description"}</p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-lg p-2 text-center">
                        <Users className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-slate-900">{a.stats?.totalEnrollments ?? 0}</p>
                        <p className="text-xs text-slate-500">Enrolled</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-600">{a.stats?.submitted ?? 0}</p>
                        <p className="text-xs text-green-600">Done</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <Clock className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-orange-600">{a.stats?.notSubmitted ?? 0}</p>
                        <p className="text-xs text-orange-600">Pending</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => edit(a)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => remove(a._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>

                    <AllowResubmit assignmentId={a._id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function AllowResubmit({ assignmentId }) {
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!userId.trim()) {
      toast.error("Please enter a user ID")
      return
    }
    setLoading(true)
    await fetch(`/api/assignments/${assignmentId}/submissions/${userId}/allow-resubmit`, {
      method: "PATCH",
      credentials: "include",
    })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}))
        if (!r.ok) throw new Error(j.message || "Failed")
        toast.success("User unlocked for resubmit successfully!")
        setUserId("")
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className="pt-4 border-t border-slate-200">
      <label className="block text-xs font-semibold text-slate-700 mb-2">Allow Student Resubmit</label>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={submit}
          disabled={loading}
          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all text-sm"
        >
          <Send className="w-3 h-3" />
          {loading ? "..." : "Allow"}
        </button>
      </div>
    </div>
  )
}
