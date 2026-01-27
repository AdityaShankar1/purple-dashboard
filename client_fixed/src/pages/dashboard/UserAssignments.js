// // // // // // // import { useState, useEffect, useCallback } from "react";
// // // // // // // import axios from "../../api/axiosConfig";
// // // // // // // import { toast } from "react-toastify";

// // // // // // // export default function UserAssignments({ currentUserId }) {
// // // // // // //   const [assignments, setAssignments] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [submissions, setSubmissions] = useState({});
// // // // // // //   const [uploadingIds, setUploadingIds] = useState([]);

// // // // // // //   const fetchAssignments = useCallback(async () => {
// // // // // // //     try {
// // // // // // //       const res = await axios.get("/assignments", {
// // // // // // //         params: { userId: currentUserId },
// // // // // // //       });
// // // // // // //       setAssignments(res.data);
// // // // // // //     } catch (err) {
// // // // // // //       toast.error("Failed to load assignments");
// // // // // // //       console.error("Fetch assignments error:", err);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }, [currentUserId]);

// // // // // // //   useEffect(() => {
// // // // // // //     fetchAssignments();
// // // // // // //   }, [fetchAssignments]);

// // // // // // //   const handleTextChange = (assignmentId, value) => {
// // // // // // //     setSubmissions((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [assignmentId]: {
// // // // // // //         ...prev[assignmentId],
// // // // // // //         text: value,
// // // // // // //       },
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleFileChange = (assignmentId, file) => {
// // // // // // //     setSubmissions((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [assignmentId]: {
// // // // // // //         ...prev[assignmentId],
// // // // // // //         file,
// // // // // // //       },
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const removeFile = (assignmentId) => {
// // // // // // //     setSubmissions((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [assignmentId]: {
// // // // // // //         ...prev[assignmentId],
// // // // // // //         file: null,
// // // // // // //       },
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const submitAssignment = async (assignmentId) => {
// // // // // // //     const submission = submissions[assignmentId];
// // // // // // //     if (!submission?.text && !submission?.file) {
// // // // // // //       toast.error("Please enter a description or upload a file");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append("assignmentId", assignmentId);
// // // // // // //     formData.append("userId", currentUserId || "unknownUserId");
// // // // // // //     if (submission.text) formData.append("submissionText", submission.text);
// // // // // // //     if (submission.file) formData.append("file", submission.file);

// // // // // // //     try {
// // // // // // //       setUploadingIds((ids) => [...ids, assignmentId]);

// // // // // // //       await toast.promise(
// // // // // // //         axios.post("/submissions", formData, {
// // // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // // //         }),
// // // // // // //         {
// // // // // // //           pending: "Uploading...",
// // // // // // //           success: "Assignment submitted successfully",
// // // // // // //           error: "Failed to submit assignment",
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setAssignments((prev) =>
// // // // // // //         prev.map((a) =>
// // // // // // //           a._id === assignmentId ? { ...a, submitted: true } : a
// // // // // // //         )
// // // // // // //       );

// // // // // // //       setSubmissions((prev) => ({ ...prev, [assignmentId]: {} }));
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Submission error:", error);
// // // // // // //     } finally {
// // // // // // //       setUploadingIds((ids) => ids.filter((id) => id !== assignmentId));
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen text-purple-100">
// // // // // // //       <h1 className="text-3xl font-bold mb-6">Your Assignments</h1>

// // // // // // //       {loading ? (
// // // // // // //         <p className="text-purple-300">Loading assignments...</p>
// // // // // // //       ) : (
// // // // // // //         <ul>
// // // // // // //           {assignments.map((a) => {
// // // // // // //             const isUploading = uploadingIds.includes(a._id);
// // // // // // //             const submission = submissions[a._id] || {};
// // // // // // //             const isSubmitted = a.submitted;

// // // // // // //             return (
// // // // // // //               <li key={a._id} className="mb-6 border-b border-purple-500/30 pb-4">
// // // // // // //                 <h3 className="font-semibold text-purple-200">{a.title}</h3>
// // // // // // //                 <p className="mb-2 text-purple-400">{a.description}</p>

// // // // // // //                 {isSubmitted ? (
// // // // // // //                   <p className="text-green-400 font-semibold mb-4">
// // // // // // //                     ✅ You have already submitted this assignment.
// // // // // // //                   </p>
// // // // // // //                 ) : (
// // // // // // //                   <>
// // // // // // //                     <textarea
// // // // // // //                       placeholder="Write your answer here..."
// // // // // // //                       value={submission.text || ""}
// // // // // // //                       onChange={(e) => handleTextChange(a._id, e.target.value)}
// // // // // // //                       className="w-full p-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
// // // // // // //                       rows={4}
// // // // // // //                       disabled={isUploading}
// // // // // // //                     />

// // // // // // //                     <input
// // // // // // //                       type="file"
// // // // // // //                       accept=".pdf,.doc,.docx"
// // // // // // //                       onChange={(e) =>
// // // // // // //                         handleFileChange(a._id, e.target.files[0] || null)
// // // // // // //                       }
// // // // // // //                       className="mb-2 text-purple-200 file:bg-purple-700 file:text-white file:rounded file:px-4 file:py-2 file:border-none file:cursor-pointer"
// // // // // // //                       disabled={isUploading}
// // // // // // //                     />

// // // // // // //                     {submission.file && (
// // // // // // //                       <div className="flex items-center gap-3 mb-2">
// // // // // // //                         <p className="text-sm text-purple-300 truncate max-w-xs">
// // // // // // //                           Selected file: {submission.file.name}
// // // // // // //                         </p>
// // // // // // //                         <button
// // // // // // //                           onClick={() => removeFile(a._id)}
// // // // // // //                           disabled={isUploading}
// // // // // // //                           className="text-red-500 hover:text-red-400 font-semibold"
// // // // // // //                           type="button"
// // // // // // //                           aria-label="Remove selected file"
// // // // // // //                         >
// // // // // // //                           Remove
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     )}

// // // // // // //                     {isUploading && (
// // // // // // //                       <p className="text-purple-300 mb-2 flex items-center gap-2">
// // // // // // //                         <svg
// // // // // // //                           className="animate-spin h-5 w-5 text-purple-400"
// // // // // // //                           xmlns="http://www.w3.org/2000/svg"
// // // // // // //                           fill="none"
// // // // // // //                           viewBox="0 0 24 24"
// // // // // // //                         >
// // // // // // //                           <circle
// // // // // // //                             className="opacity-25"
// // // // // // //                             cx="12"
// // // // // // //                             cy="12"
// // // // // // //                             r="10"
// // // // // // //                             stroke="currentColor"
// // // // // // //                             strokeWidth="4"
// // // // // // //                           ></circle>
// // // // // // //                           <path
// // // // // // //                             className="opacity-75"
// // // // // // //                             fill="currentColor"
// // // // // // //                             d="M4 12a8 8 0 018-8v8H4z"
// // // // // // //                           ></path>
// // // // // // //                         </svg>
// // // // // // //                         Uploading file, please wait...
// // // // // // //                       </p>
// // // // // // //                     )}

// // // // // // //                     <div className="flex gap-3">
// // // // // // //                       <button
// // // // // // //                         onClick={() => submitAssignment(a._id)}
// // // // // // //                         disabled={isUploading}
// // // // // // //                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// // // // // // //                           isUploading
// // // // // // //                             ? "bg-gray-600 cursor-not-allowed text-purple-300"
// // // // // // //                             : "bg-purple-600 hover:bg-purple-700 text-white"
// // // // // // //                         }`}
// // // // // // //                       >
// // // // // // //                         {isUploading ? "Uploading..." : "Submit"}
// // // // // // //                       </button>

// // // // // // //                       <button
// // // // // // //                         onClick={() =>
// // // // // // //                           setSubmissions((prev) => ({
// // // // // // //                             ...prev,
// // // // // // //                             [a._id]: {},
// // // // // // //                           }))
// // // // // // //                         }
// // // // // // //                         disabled={isUploading}
// // // // // // //                         className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
// // // // // // //                         type="button"
// // // // // // //                       >
// // // // // // //                         Cancel
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   </>
// // // // // // //                 )}
// // // // // // //               </li>
// // // // // // //             );
// // // // // // //           })}
// // // // // // //         </ul>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }













// // // // // // "use client";

// // // // // // import { useState, useEffect, useCallback } from "react";
// // // // // // import axios from "../../api/axiosConfig";
// // // // // // import { toast } from "react-toastify";

// // // // // // export default function UserAssignments({ currentUserId }) {
// // // // // //   const [assignments, setAssignments] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [submissions, setSubmissions] = useState({});
// // // // // //   const [uploadingIds, setUploadingIds] = useState([]);

// // // // // //   const fetchAssignments = useCallback(async () => {
// // // // // //     try {
// // // // // //       const res = await axios.get("/assignments", {
// // // // // //         params: { userId: currentUserId },
// // // // // //       });
// // // // // //       setAssignments(res.data);
// // // // // //     } catch (err) {
// // // // // //       toast.error("Failed to load assignments");
// // // // // //       console.error("Fetch assignments error:", err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, [currentUserId]);

// // // // // //   useEffect(() => {
// // // // // //     fetchAssignments();
// // // // // //   }, [fetchAssignments]);

// // // // // //   const handleTextChange = (assignmentId, value) => {
// // // // // //     setSubmissions((prev) => ({
// // // // // //       ...prev,
// // // // // //       [assignmentId]: {
// // // // // //         ...prev[assignmentId],
// // // // // //         text: value,
// // // // // //       },
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleFileChange = (assignmentId, file) => {
// // // // // //     setSubmissions((prev) => ({
// // // // // //       ...prev,
// // // // // //       [assignmentId]: {
// // // // // //         ...prev[assignmentId],
// // // // // //         file,
// // // // // //       },
// // // // // //     }));
// // // // // //   };

// // // // // //   const removeFile = (assignmentId) => {
// // // // // //     setSubmissions((prev) => ({
// // // // // //       ...prev,
// // // // // //       [assignmentId]: {
// // // // // //         ...prev[assignmentId],
// // // // // //         file: null,
// // // // // //       },
// // // // // //     }));
// // // // // //   };

// // // // // //   const submitAssignment = async (assignmentId) => {
// // // // // //     const submission = submissions[assignmentId];
// // // // // //     if (!submission?.text && !submission?.file) {
// // // // // //       toast.error("Please enter a description or upload a file");
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append("assignmentId", assignmentId);
// // // // // //     formData.append("userId", currentUserId || "unknownUserId");
// // // // // //     if (submission.text) formData.append("submissionText", submission.text);
// // // // // //     if (submission.file) formData.append("file", submission.file);

// // // // // //     try {
// // // // // //       setUploadingIds((ids) => [...ids, assignmentId]);

// // // // // //       await toast.promise(
// // // // // //         axios.post("/submissions", formData, {
// // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // //         }),
// // // // // //         {
// // // // // //           pending: "Uploading...",
// // // // // //           success: "Assignment submitted successfully",
// // // // // //           error: "Failed to submit assignment",
// // // // // //         }
// // // // // //       );

// // // // // //       setAssignments((prev) =>
// // // // // //         prev.map((a) =>
// // // // // //           a._id === assignmentId ? { ...a, submitted: true } : a
// // // // // //         )
// // // // // //       );

// // // // // //       setSubmissions((prev) => ({ ...prev, [assignmentId]: {} }));
// // // // // //     } catch (error) {
// // // // // //       console.error("Submission error:", error);
// // // // // //     } finally {
// // // // // //       setUploadingIds((ids) => ids.filter((id) => id !== assignmentId));
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-6 text-purple-100 space-y-6">
// // // // // //       <h1 className="text-3xl font-bold">Your Assignments</h1>

// // // // // //       {loading ? (
// // // // // //         <p className="text-purple-300">Loading assignments...</p>
// // // // // //       ) : (
// // // // // //         <ul>
// // // // // //           {assignments.map((a) => {
// // // // // //             const isUploading = uploadingIds.includes(a._id);
// // // // // //             const submission = submissions[a._id] || {};
// // // // // //             const isSubmitted = a.submitted;

// // // // // //             return (
// // // // // //               <li key={a._id} className="mb-6 border-b border-purple-500/30 pb-4">
// // // // // //                 <h3 className="font-semibold text-purple-200">{a.title}</h3>
// // // // // //                 <p className="mb-2 text-purple-400">{a.description}</p>

// // // // // //                 {isSubmitted ? (
// // // // // //                   <p className="text-green-400 font-semibold mb-4">
// // // // // //                     ✅ You have already submitted this assignment.
// // // // // //                   </p>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     <textarea
// // // // // //                       placeholder="Write your answer here..."
// // // // // //                       value={submission.text || ""}
// // // // // //                       onChange={(e) => handleTextChange(a._id, e.target.value)}
// // // // // //                       className="w-full p-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
// // // // // //                       rows={4}
// // // // // //                       disabled={isUploading}
// // // // // //                     />

// // // // // //                     <input
// // // // // //                       type="file"
// // // // // //                       accept=".pdf,.doc,.docx"
// // // // // //                       onChange={(e) =>
// // // // // //                         handleFileChange(a._id, e.target.files[0] || null)
// // // // // //                       }
// // // // // //                       className="mb-2 text-purple-200 file:bg-purple-700 file:text-white file:rounded file:px-4 file:py-2 file:border-none file:cursor-pointer"
// // // // // //                       disabled={isUploading}
// // // // // //                     />

// // // // // //                     {submission.file && (
// // // // // //                       <div className="flex items-center gap-3 mb-2">
// // // // // //                         <p className="text-sm text-purple-300 truncate max-w-xs">
// // // // // //                           Selected file: {submission.file.name}
// // // // // //                         </p>
// // // // // //                         <button
// // // // // //                           onClick={() => removeFile(a._id)}
// // // // // //                           disabled={isUploading}
// // // // // //                           className="text-red-500 hover:text-red-400 font-semibold"
// // // // // //                           type="button"
// // // // // //                           aria-label="Remove selected file"
// // // // // //                         >
// // // // // //                           Remove
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     )}

// // // // // //                     {isUploading && (
// // // // // //                       <p className="text-purple-300 mb-2 flex items-center gap-2">
// // // // // //                         <svg
// // // // // //                           className="animate-spin h-5 w-5 text-purple-400"
// // // // // //                           xmlns="http://www.w3.org/2000/svg"
// // // // // //                           fill="none"
// // // // // //                           viewBox="0 0 24 24"
// // // // // //                         >
// // // // // //                           <circle
// // // // // //                             className="opacity-25"
// // // // // //                             cx="12"
// // // // // //                             cy="12"
// // // // // //                             r="10"
// // // // // //                             stroke="currentColor"
// // // // // //                             strokeWidth="4"
// // // // // //                           ></circle>
// // // // // //                           <path
// // // // // //                             className="opacity-75"
// // // // // //                             fill="currentColor"
// // // // // //                             d="M4 12a8 8 0 018-8v8H4z"
// // // // // //                           ></path>
// // // // // //                         </svg>
// // // // // //                         Uploading file, please wait...
// // // // // //                       </p>
// // // // // //                     )}

// // // // // //                     <div className="flex gap-3">
// // // // // //                       <button
// // // // // //                         onClick={() => submitAssignment(a._id)}
// // // // // //                         disabled={isUploading}
// // // // // //                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// // // // // //                           isUploading
// // // // // //                             ? "bg-gray-600 cursor-not-allowed text-purple-300"
// // // // // //                             : "bg-purple-600 hover:bg-purple-700 text-white"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {isUploading ? "Uploading..." : "Submit"}
// // // // // //                       </button>

// // // // // //                       <button
// // // // // //                         onClick={() =>
// // // // // //                           setSubmissions((prev) => ({
// // // // // //                             ...prev,
// // // // // //                             [a._id]: {},
// // // // // //                           }))
// // // // // //                         }
// // // // // //                         disabled={isUploading}
// // // // // //                         className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
// // // // // //                         type="button"
// // // // // //                       >
// // // // // //                         Cancel
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </li>
// // // // // //             );
// // // // // //           })}
// // // // // //         </ul>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }







// // // // // // client/src/pages/dashboard/UserAssignments.jsx

// // // // // "use client";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { toast } from "react-toastify";

// // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // export default function Assignments() {
// // // // //   const [items, setItems] = useState([]);
// // // // //   const [uploads, setUploads] = useState({});

// // // // //   const load = async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${API}/assignments/visible`, { credentials: "include" });
// // // // //       const data = await res.json();
// // // // //       setItems(Array.isArray(data) ? data : []);
// // // // //     } catch {
// // // // //       toast.error("Failed to load assignments ❌");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => { load(); }, []);

// // // // //   const onFiles = (id, files) => setUploads(prev => ({ ...prev, [id]: files }));

// // // // //   const submit = async (id) => {
// // // // //     const fd = new FormData();
// // // // //     Array.from(uploads[id] || []).forEach(f => fd.append("files", f));
// // // // //     try {
// // // // //       const res = await fetch(`${API}/assignments/${id}/submit`, { method: "POST", body: fd, credentials: "include" });
// // // // //       const json = await res.json().catch(() => ({}));
// // // // //       if (!res.ok) return toast.error(json.message || "Submission failed ❌");
// // // // //       toast.success("Assignment submitted ✅");
// // // // //       await load();
// // // // //     } catch {
// // // // //       toast.error("Error submitting assignment ❌");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6 space-y-6">
// // // // //       {items.map(a => {
// // // // //         const now = Date.now();
// // // // //         const dueMs = new Date(a.dueAt).getTime();
// // // // //         const expired = now > dueMs;

// // // // //         return (
// // // // //           <div key={a._id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
// // // // //             <div className="flex justify-between">
// // // // //               <div>
// // // // //                 <div className="text-lg font-semibold">{a.title}</div>
// // // // //                 <div className="text-sm text-gray-400">{a.description}</div>
// // // // //                 <div className="text-sm mt-2">Starts: {new Date(a.startAt).toLocaleString()}</div>
// // // // //                 <div className="text-sm">Due: {new Date(a.dueAt).toLocaleString()}</div>
// // // // //               </div>
// // // // //               <div className="text-sm text-gray-300">Question files: {a.questionFiles?.length || 0}</div>
// // // // //             </div>
// // // // //             <div className="mt-4 flex items-center gap-3">
// // // // //               <input type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" onChange={(e)=>onFiles(a._id, e.target.files)} />
// // // // //               <button className="bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded" onClick={()=>submit(a._id)} disabled={expired}>
// // // // //                 {expired ? "Closed" : "Submit"}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         );
// // // // //       })}
// // // // //     </div>
// // // // //   );
// // // // // }










// // // // "use client"

// // // // import { useEffect, useState } from "react"

// // // // const api = (path, opts = {}) =>
// // // //   fetch(`/api/assignments${path}`, {
// // // //     credentials: "include",
// // // //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// // // //     ...opts,
// // // //   }).then(async (r) => {
// // // //     const json = await r.json().catch(() => ({}))
// // // //     if (!r.ok) throw new Error(json.message || "Request failed")
// // // //     return json
// // // //   })

// // // // export default function UserAssignments() {
// // // //   const [list, setList] = useState([])
// // // //   const [active, setActive] = useState(null)
// // // //   const [textAnswer, setTextAnswer] = useState("")
// // // //   const [fileUrl, setFileUrl] = useState("")
// // // //   const [fileObj, setFileObj] = useState(null) // { name, type, data }

// // // //   useEffect(() => {
// // // //     api("/available")
// // // //       .then((res) => setList(res.data || []))
// // // //       .catch((e) => console.error(e))
// // // //   }, [])

// // // //   const onChooseFile = (file) => {
// // // //     if (!file) return setFileObj(null)
// // // //     const allowed =
// // // //       /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name) ||
// // // //       [
// // // //         "application/pdf",
// // // //         "application/msword",
// // // //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// // // //         "application/vnd.ms-powerpoint",
// // // //         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
// // // //         "application/vnd.ms-excel",
// // // //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // //         "text/plain",
// // // //         "application/zip",
// // // //       ].includes(file.type)
// // // //     if (!allowed) {
// // // //       alert("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
// // // //       return
// // // //     }
// // // //     const reader = new FileReader()
// // // //     reader.onload = () =>
// // // //       setFileObj({ name: file.name, type: file.type || "application/octet-stream", data: reader.result })
// // // //     reader.readAsDataURL(file)
// // // //   }

// // // //   const submit = async () => {
// // // //     if (!active) return
// // // //     await api(`/${active}/submit`, {
// // // //       method: "POST",
// // // //       body: JSON.stringify({ textAnswer, fileUrl, file: fileObj || null }),
// // // //     })
// // // //       .then(() => {
// // // //         alert("Assignment submitted.")
// // // //         setActive(null)
// // // //         setTextAnswer("")
// // // //         setFileUrl("")
// // // //         setFileObj(null)
// // // //       })
// // // //       .catch((e) => alert(e.message))
// // // //   }

// // // //   if (active) {
// // // //     const a = list.find((x) => x._id === active)
// // // //     return (
// // // //       <div className="min-h-screen p-6 bg-neutral-50">
// // // //         <div className="space-y-3 max-w-3xl">
// // // //           <h2 className="text-2xl font-semibold">{a?.title || "Assignment"}</h2>
// // // //           <p className="text-sm text-neutral-600">{a?.instructions}</p>
// // // //           <textarea
// // // //             className="border rounded px-3 py-2 w-full min-h-40 text-black placeholder:text-neutral-500"
// // // //             placeholder="Enter your answer..."
// // // //             value={textAnswer}
// // // //             onChange={(e) => setTextAnswer(e.target.value)}
// // // //           />
// // // //           <input
// // // //             className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // // //             placeholder="Optional file URL (if using external storage)"
// // // //             value={fileUrl}
// // // //             onChange={(e) => setFileUrl(e.target.value)}
// // // //           />
// // // //           <div className="space-y-1">
// // // //             <label className="text-sm font-medium">Upload file (once):</label>
// // // //             <input
// // // //               type="file"
// // // //               accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
// // // //               onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
// // // //             />
// // // //             {fileObj?.name && <div className="text-xs text-neutral-600">Selected: {fileObj.name}</div>}
// // // //           </div>
// // // //           <div className="flex gap-2">
// // // //             <button className="px-3 py-2 border rounded" onClick={() => setActive(null)}>
// // // //               Cancel
// // // //             </button>
// // // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={submit}>
// // // //               Submit
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen p-6 bg-neutral-50">
// // // //       <h1 className="text-3xl font-semibold mb-4">Assignments</h1>
// // // //       <div className="grid gap-3">
// // // //         {list.map((a) => (
// // // //           <div key={a._id} className="border rounded p-4 flex items-center justify-between">
// // // //             <div>
// // // //               <div className="font-medium">{a.title}</div>
// // // //               <div className="text-sm text-neutral-600">{a.description}</div>
// // // //             </div>
// // // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setActive(a._id)}>
// // // //               Submit
// // // //             </button>
// // // //           </div>
// // // //         ))}
// // // //         {list.length === 0 && <div className="text-sm text-neutral-600">No assignments available.</div>}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }














// // // "use client"

// // // import { useEffect, useState } from "react"

// // // const api = (path, opts = {}) =>
// // //   fetch(`/api/assignments${path}`, {
// // //     credentials: "include",
// // //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// // //     ...opts,
// // //   }).then(async (r) => {
// // //     const json = await r.json().catch(() => ({}))
// // //     if (!r.ok) throw new Error(json.message || "Request failed")
// // //     return json
// // //   })

// // // export default function UserAssignments() {
// // //   const [list, setList] = useState([])
// // //   const [active, setActive] = useState(null)
// // //   const [textAnswer, setTextAnswer] = useState("")
// // //   const [fileUrl, setFileUrl] = useState("")
// // //   const [fileObj, setFileObj] = useState(null) // { name, type, data }

// // //   useEffect(() => {
// // //     api("/available")
// // //       .then((res) => setList(res.data || []))
// // //       .catch((e) => console.error(e))
// // //   }, [])

// // //   const onChooseFile = (file) => {
// // //     if (!file) return setFileObj(null)
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
// // //       setFileObj({ name: file.name, type: file.type || "application/octet-stream", data: reader.result })
// // //     reader.readAsDataURL(file)
// // //   }

// // //   const submit = async () => {
// // //     if (!active) return
// // //     await api(`/${active}/submit`, {
// // //       method: "POST",
// // //       body: JSON.stringify({ textAnswer, fileUrl, file: fileObj || null }),
// // //     })
// // //       .then(() => {
// // //         alert("Assignment submitted.")
// // //         setActive(null)
// // //         setTextAnswer("")
// // //         setFileUrl("")
// // //         setFileObj(null)
// // //       })
// // //       .catch((e) => alert(e.message))
// // //   }

// // //   if (active) {
// // //     const a = list.find((x) => x._id === active)
// // //     return (
// // //       <div className="min-h-screen p-6 bg-neutral-50">
// // //         <div className="space-y-3 max-w-3xl">
// // //           <h2 className="text-2xl font-semibold">{a?.title || "Assignment"}</h2>
// // //           <p className="text-sm text-neutral-600">{a?.instructions}</p>
// // //           <textarea
// // //             className="border rounded px-3 py-2 w-full min-h-40 text-black placeholder:text-neutral-500"
// // //             placeholder="Enter your answer..."
// // //             value={textAnswer}
// // //             onChange={(e) => setTextAnswer(e.target.value)}
// // //           />
// // //           <input
// // //             className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //             placeholder="Optional file URL (if using external storage)"
// // //             value={fileUrl}
// // //             onChange={(e) => setFileUrl(e.target.value)}
// // //           />
// // //           <div className="space-y-1">
// // //             <label className="text-sm font-medium">Upload file (once):</label>
// // //             <input
// // //               type="file"
// // //               accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
// // //               onChange={(e) => onChooseFile(e.target.files?.[0] || null)}
// // //             />
// // //             {fileObj?.name && <div className="text-xs text-neutral-600">Selected: {fileObj.name}</div>}
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <button className="px-3 py-2 border rounded" onClick={() => setActive(null)}>
// // //               Cancel
// // //             </button>
// // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={submit}>
// // //               Submit
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-neutral-50">
// // //       <h1 className="text-3xl font-semibold mb-4">Assignments</h1>
// // //       <div className="grid gap-3">
// // //         {list.map((a) => (
// // //           <div key={a._id} className="border rounded p-4 flex items-center justify-between">
// // //             <div>
// // //               <div className="font-medium">{a.title}</div>
// // //               <div className="text-sm text-neutral-600">{a.description}</div>
// // //             </div>
// // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setActive(a._id)}>
// // //               Submit
// // //             </button>
// // //           </div>
// // //         ))}
// // //         {list.length === 0 && <div className="text-sm text-neutral-600">No assignments available.</div>}
// // //       </div>
// // //     </div>
// // //   )
// // // }










// // //client/src/pages/dashboard/UserAssignments.jsx

// // "use client"

// // import { useEffect, useState } from "react"
// // import dayjs from "dayjs"
// // import relativeTime from "dayjs/plugin/relativeTime"
// // import { 
// //   FileText, 
// //   Clock, 
// //   CheckCircle, 
// //   AlertCircle, 
// //   Calendar,
// //   Upload,
// //   Download,
// //   Eye,
// //   Send,
// //   XCircle,
// //   Award,
// //   BookOpen,
// //   Bell
// // } from "lucide-react"
// // import { toast, ToastContainer } from "react-toastify"
// // import "react-toastify/dist/ReactToastify.css"

// // dayjs.extend(relativeTime)

// // const api = (path, opts = {}) =>
// //   fetch(`/api/assignments${path}`, {
// //     credentials: "include",
// //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// //     ...opts,
// //   }).then(async (r) => {
// //     const json = await r.json().catch(() => ({}))
// //     if (!r.ok) {
// //       throw new Error(json.message || "Request failed")
// //     }
// //     return json
// //   })

// // export default function UserAssignments() {
// //   const [assignments, setAssignments] = useState([])
// //   const [selectedAssignment, setSelectedAssignment] = useState(null)
// //   const [submissionFile, setSubmissionFile] = useState(null)
// //   const [submissionText, setSubmissionText] = useState("")
// //   const [loading, setLoading] = useState(false)
// //   const [filter, setFilter] = useState("all") // all, pending, submitted, overdue
// //   const [notifications, setNotifications] = useState([])

// //   const loadAssignments = async () => {
// //     try {
// //       const r = await api("/user")
// //       setAssignments(r.data || [])
      
// //       // Check for new assignments (simulated notifications)
// //       const newAssignments = (r.data || []).filter(a => {
// //         const createdAt = dayjs(a.createdAt)
// //         const hoursSinceCreation = dayjs().diff(createdAt, 'hour')
// //         return hoursSinceCreation < 24 && !a.submission
// //       })
      
// //       if (newAssignments.length > 0) {
// //         setNotifications(newAssignments.map(a => ({
// //           id: a._id,
// //           message: `New assignment: ${a.title}`,
// //           type: 'new'
// //         })))
// //       }
// //     } catch (e) {
// //       console.error(e)
// //       toast.error(e.message || "Failed to load assignments")
// //     }
// //   }

// //   useEffect(() => {
// //     loadAssignments()
// //   }, [])

// //   const handleFileSelect = (file) => {
// //     if (!file) {
// //       setSubmissionFile(null)
// //       return
// //     }
    
// //     const allowed = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip)$/i.test(file.name)
// //     if (!allowed) {
// //       toast.error("Unsupported file type. Allowed: pdf, doc, docx, ppt, pptx, xls, xlsx, txt, zip")
// //       return
// //     }
    
// //     const reader = new FileReader()
// //     reader.onload = () => {
// //       setSubmissionFile({
// //         name: file.name,
// //         type: file.type || "application/octet-stream",
// //         data: reader.result
// //       })
// //     }
// //     reader.readAsDataURL(file)
// //   }

// //   const submitAssignment = async () => {
// //     if (!selectedAssignment) return
    
// //     if (!submissionFile && !submissionText.trim()) {
// //       toast.error("Please provide either a file or text submission")
// //       return
// //     }

// //     setLoading(true)
// //     try {
// //       const payload = {
// //         text: submissionText,
// //         attachment: submissionFile
// //       }
      
// //       await api(`/${selectedAssignment._id}/submit`, {
// //         method: "POST",
// //         body: JSON.stringify(payload)
// //       })
      
// //       toast.success("Assignment submitted successfully!")
// //       setSelectedAssignment(null)
// //       setSubmissionFile(null)
// //       setSubmissionText("")
// //       await loadAssignments()
// //     } catch (e) {
// //       toast.error(e.message || "Failed to submit assignment")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const getStatusColor = (assignment) => {
// //     if (assignment.submission) {
// //       if (assignment.submission.grade !== undefined) {
// //         return assignment.submission.grade >= 50 ? "green" : "red"
// //       }
// //       return "blue"
// //     }
    
// //     if (assignment.dueAt && dayjs().isAfter(dayjs(assignment.dueAt))) {
// //       return "red"
// //     }
    
// //     return "orange"
// //   }

// //   const getStatusText = (assignment) => {
// //     if (assignment.submission) {
// //       if (assignment.submission.grade !== undefined) {
// //         return `Graded: ${assignment.submission.grade}%`
// //       }
// //       return "Submitted"
// //     }
    
// //     if (assignment.dueAt && dayjs().isAfter(dayjs(assignment.dueAt))) {
// //       return "Overdue"
// //     }
    
// //     return "Pending"
// //   }

// //   const filteredAssignments = assignments.filter(a => {
// //     if (filter === "all") return true
// //     if (filter === "pending") return !a.submission
// //     if (filter === "submitted") return a.submission
// //     if (filter === "overdue") return !a.submission && a.dueAt && dayjs().isAfter(dayjs(a.dueAt))
// //     return true
// //   })

// //   const stats = {
// //     total: assignments.length,
// //     pending: assignments.filter(a => !a.submission).length,
// //     submitted: assignments.filter(a => a.submission).length,
// //     overdue: assignments.filter(a => !a.submission && a.dueAt && dayjs().isAfter(dayjs(a.dueAt))).length
// //   }

// //   const dismissNotification = (id) => {
// //     setNotifications(prev => prev.filter(n => n.id !== id))
// //   }

// //   return (
// //     <div className="min-h-screen p-6">
// //       <ToastContainer position="bottom-right" theme="colored" />
      
// //       {/* Header */}
// //       <div className="max-w-7xl mx-auto mb-8">
// //         <div className="flex items-center gap-3 mb-2">
// //           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
// //             <FileText className="w-6 h-6 text-white" />
// //           </div>
// //           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
// //             My Assignments
// //           </h1>
// //         </div>
// //         <p className="text-slate-400 ml-15">View and submit your course assignments</p>
// //       </div>

// //       {/* Notifications */}
// //       {notifications.length > 0 && (
// //         <div className="max-w-7xl mx-auto mb-6 space-y-2">
// //           {notifications.map(notif => (
// //             <div key={notif.id} className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex items-start gap-3">
// //               <Bell className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
// //               <div className="flex-1">
// //                 <p className="text-blue-400 font-medium">New Assignment</p>
// //                 <p className="text-blue-300 text-sm mt-1">{notif.message}</p>
// //               </div>
// //               <button
// //                 onClick={() => dismissNotification(notif.id)}
// //                 className="text-blue-400 hover:text-blue-300"
// //               >
// //                 <XCircle className="w-5 h-5" />
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Stats Cards */}
// //       <div className="max-w-7xl mx-auto mb-8">
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setFilter("all")}>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-slate-500 text-sm font-medium">Total</p>
// //                 <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
// //                 <FileText className="w-6 h-6 text-blue-600" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setFilter("pending")}>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-slate-500 text-sm font-medium">Pending</p>
// //                 <p className="text-3xl font-bold text-orange-600 mt-1">{stats.pending}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
// //                 <Clock className="w-6 h-6 text-orange-600" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setFilter("submitted")}>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-slate-500 text-sm font-medium">Submitted</p>
// //                 <p className="text-3xl font-bold text-green-600 mt-1">{stats.submitted}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
// //                 <CheckCircle className="w-6 h-6 text-green-600" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setFilter("overdue")}>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-slate-500 text-sm font-medium">Overdue</p>
// //                 <p className="text-3xl font-bold text-red-600 mt-1">{stats.overdue}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
// //                 <AlertCircle className="w-6 h-6 text-red-600" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filter Tabs */}
// //       <div className="max-w-7xl mx-auto mb-6">
// //         <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2">
// //           {[
// //             { value: "all", label: "All Assignments" },
// //             { value: "pending", label: "Pending" },
// //             { value: "submitted", label: "Submitted" },
// //             { value: "overdue", label: "Overdue" }
// //           ].map(tab => (
// //             <button
// //               key={tab.value}
// //               onClick={() => setFilter(tab.value)}
// //               className={`px-6 py-2 rounded-xl font-semibold transition-all ${
// //                 filter === tab.value
// //                   ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
// //                   : "text-slate-600 hover:bg-slate-100"
// //               }`}
// //             >
// //               {tab.label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Assignments Grid */}
// //       <div className="max-w-7xl mx-auto">
// //         {filteredAssignments.length === 0 ? (
// //           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
// //             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <FileText className="w-8 h-8 text-slate-400" />
// //             </div>
// //             <h3 className="text-xl font-semibold text-slate-900 mb-2">No assignments found</h3>
// //             <p className="text-slate-500">
// //               {filter === "all" 
// //                 ? "You don't have any assignments yet"
// //                 : `No ${filter} assignments at the moment`
// //               }
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredAssignments.map((assignment) => {
// //               const statusColor = getStatusColor(assignment)
// //               const statusText = getStatusText(assignment)
              
// //               return (
// //                 <div
// //                   key={assignment._id}
// //                   className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
// //                 >
// //                   {/* Header */}
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className="flex-1">
// //                       <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
// //                         {assignment.title}
// //                       </h3>
// //                       <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
// //                         statusColor === "green" ? "bg-green-100 text-green-700" :
// //                         statusColor === "blue" ? "bg-blue-100 text-blue-700" :
// //                         statusColor === "orange" ? "bg-orange-100 text-orange-700" :
// //                         "bg-red-100 text-red-700"
// //                       }`}>
// //                         {statusText}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Course Info */}
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <BookOpen className="w-4 h-4 text-slate-500" />
// //                     <span className="text-sm text-slate-600 font-medium">
// //                       {assignment.course?.title || assignment.course}
// //                     </span>
// //                   </div>

// //                   {/* Description */}
// //                   <p className="text-slate-600 text-sm mb-4 line-clamp-3">
// //                     {assignment.description || "No description provided"}
// //                   </p>

// //                   {/* Due Date */}
// //                   {assignment.dueAt && (
// //                     <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
// //                       <Calendar className="w-4 h-4 text-slate-500" />
// //                       <div className="flex-1">
// //                         <p className="text-xs text-slate-500 font-medium">Due Date</p>
// //                         <p className="text-sm text-slate-900 font-semibold">
// //                           {dayjs(assignment.dueAt).format("MMM DD, YYYY HH:mm")}
// //                         </p>
// //                         <p className="text-xs text-slate-500">
// //                           ({dayjs(assignment.dueAt).fromNow()})
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Grade Display */}
// //                   {assignment.submission?.grade !== undefined && (
// //                     <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
// //                       <Award className="w-5 h-5 text-purple-600" />
// //                       <div className="flex-1">
// //                         <p className="text-xs text-purple-600 font-medium">Your Grade</p>
// //                         <p className="text-2xl font-bold text-purple-700">
// //                           {assignment.submission.grade}%
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Feedback */}
// //                   {assignment.submission?.feedback && (
// //                     <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
// //                       <p className="text-xs text-blue-600 font-semibold mb-1">Instructor Feedback</p>
// //                       <p className="text-sm text-blue-900">{assignment.submission.feedback}</p>
// //                     </div>
// //                   )}

// //                   {/* Actions */}
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => setSelectedAssignment(assignment)}
// //                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-sm shadow-md"
// //                     >
// //                       <Eye className="w-4 h-4" />
// //                       View Details
// //                     </button>
// //                     {assignment.attachment && (
// //                       <button
// //                         onClick={() => window.open(assignment.attachment.data, '_blank')}
// //                         className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all"
// //                         title="Download attachment"
// //                       >
// //                         <Download className="w-4 h-4" />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               )
// //             })}
// //           </div>
// //         )}
// //       </div>

// //       {/* Assignment Detail Modal */}
// //       {selectedAssignment && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
// //               <h2 className="text-2xl font-bold text-slate-900">{selectedAssignment.title}</h2>
// //               <button
// //                 onClick={() => {
// //                   setSelectedAssignment(null)
// //                   setSubmissionFile(null)
// //                   setSubmissionText("")
// //                 }}
// //                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// //               >
// //                 <XCircle className="w-6 h-6 text-slate-500" />
// //               </button>
// //             </div>

// //             <div className="p-6 space-y-6">
// //               {/* Course */}
// //               <div>
// //                 <p className="text-sm font-semibold text-slate-500 mb-1">Course</p>
// //                 <p className="text-lg text-slate-900">{selectedAssignment.course?.title || selectedAssignment.course}</p>
// //               </div>

// //               {/* Description */}
// //               <div>
// //                 <p className="text-sm font-semibold text-slate-500 mb-2">Description</p>
// //                 <p className="text-slate-700">{selectedAssignment.description || "No description provided"}</p>
// //               </div>

// //               {/* Instructions */}
// //               {selectedAssignment.instructions && (
// //                 <div>
// //                   <p className="text-sm font-semibold text-slate-500 mb-2">Instructions</p>
// //                   <div className="bg-slate-50 rounded-xl p-4">
// //                     <p className="text-slate-700 whitespace-pre-wrap">{selectedAssignment.instructions}</p>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Reference Attachment */}
// //               {selectedAssignment.attachment && (
// //                 <div>
// //                   <p className="text-sm font-semibold text-slate-500 mb-2">Reference Material</p>
// //                   <button
// //                     onClick={() => window.open(selectedAssignment.attachment.data, '_blank')}
// //                     className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors w-full"
// //                   >
// //                     <FileText className="w-5 h-5 text-blue-600" />
// //                     <span className="text-blue-700 font-medium">{selectedAssignment.attachment.name}</span>
// //                     <Download className="w-4 h-4 text-blue-600 ml-auto" />
// //                   </button>
// //                 </div>
// //               )}

// //               {/* Submission Section */}
// //               {!selectedAssignment.submission ? (
// //                 <div className="border-t border-slate-200 pt-6">
// //                   <h3 className="text-lg font-bold text-slate-900 mb-4">Submit Your Work</h3>
                  
// //                   {/* Text Submission */}
// //                   <div className="mb-4">
// //                     <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                       Text Submission (Optional)
// //                     </label>
// //                     <textarea
// //                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
// //                       placeholder="Enter your submission text here..."
// //                       rows={6}
// //                       value={submissionText}
// //                       onChange={(e) => setSubmissionText(e.target.value)}
// //                     />
// //                   </div>

// //                   {/* File Upload */}
// //                   <div className="mb-6">
// //                     <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                       File Submission (Optional)
// //                     </label>
// //                     <input
// //                       type="file"
// //                       accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip"
// //                       onChange={(e) => handleFileSelect(e.target.files?.[0])}
// //                       className="hidden"
// //                       id="submission-file"
// //                     />
// //                     <label
// //                       htmlFor="submission-file"
// //                       className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
// //                     >
// //                       <Upload className="w-5 h-5 text-slate-500" />
// //                       <span className="text-sm font-medium text-slate-600">
// //                         Click to upload file
// //                       </span>
// //                     </label>
// //                     {submissionFile && (
// //                       <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
// //                         <FileText className="w-4 h-4 text-blue-600" />
// //                         <span className="text-sm text-blue-700 font-medium flex-1">{submissionFile.name}</span>
// //                         <button
// //                           onClick={() => setSubmissionFile(null)}
// //                           className="text-red-500 hover:text-red-700"
// //                         >
// //                           <XCircle className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Submit Button */}
// //                   <button
// //                     onClick={submitAssignment}
// //                     disabled={loading || (!submissionFile && !submissionText.trim())}
// //                     className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg"
// //                   >
// //                     <Send className="w-5 h-5" />
// //                     {loading ? "Submitting..." : "Submit Assignment"}
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="border-t border-slate-200 pt-6">
// //                   <h3 className="text-lg font-bold text-slate-900 mb-4">Your Submission</h3>
                  
// //                   {selectedAssignment.submission.text && (
// //                     <div className="mb-4">
// //                       <p className="text-sm font-semibold text-slate-500 mb-2">Submitted Text</p>
// //                       <div className="bg-slate-50 rounded-xl p-4">
// //                         <p className="text-slate-700 whitespace-pre-wrap">{selectedAssignment.submission.text}</p>
// //                       </div>
// //                     </div>
// //                   )}
                  
// //                   {selectedAssignment.submission.attachment && (
// //                     <div className="mb-4">
// //                       <p className="text-sm font-semibold text-slate-500 mb-2">Submitted File</p>
// //                       <button
// //                         onClick={() => window.open(selectedAssignment.submission.attachment.data, '_blank')}
// //                         className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors w-full"
// //                       >
// //                         <FileText className="w-5 h-5 text-green-600" />
// //                         <span className="text-green-700 font-medium">{selectedAssignment.submission.attachment.name}</span>
// //                         <Download className="w-4 h-4 text-green-600 ml-auto" />
// //                       </button>
// //                     </div>
// //                   )}

// //                   <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
// //                     <CheckCircle className="w-6 h-6 text-green-600" />
// //                     <p className="text-green-700 font-medium">Submitted on {dayjs(selectedAssignment.submission.submittedAt).format("MMM DD, YYYY HH:mm")}</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }






// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "../../components/Layouts/Button"
// import { Card } from "../../components/Layouts/Card"

// export default function UserAssignments({ courseId }) {
//   const [assignments, setAssignments] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await fetch(`/api/assignments/course/${courseId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setAssignments(data)
//         }
//       } catch (error) {
//         console.error("Error fetching assignments:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAssignments()
//   }, [courseId])

//   if (loading) return <div className="text-center py-8">Loading assignments...</div>

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-6">Assignments</h2>
//       <div className="space-y-4">
//         {assignments.map((assignment) => (
//           <Card key={assignment._id} className="p-6">
//             <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
//             <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">
//                 Due: {new Date(assignment.dueDate).toLocaleDateString()}
//               </span>
//               <Button size="sm">Submit</Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }






///client/src/pages/dashboard/UserAssignments.js

import { useEffect, useState } from "react"
import { Card } from "../../components/Layouts/Card"
import { Button } from "../../components/Layouts/Button"

export default function UserAssignments({ courseId }) {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`/api/assignments/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          const result = await response.json()
          setAssignments(result.data || result)
        }
      } catch (error) {
        console.error("Error fetching assignments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [courseId])

  if (loading) return <div className="text-center py-8">Loading assignments...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment._id} className="p-6">
            <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <Button size="sm">Submit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
