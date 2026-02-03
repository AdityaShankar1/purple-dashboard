// //client/src/pages/dashboardAdmin/AdminSubmissions.js


// import { useState, useEffect } from "react"
// import axios from "../../api/axiosConfig"
// import { toast } from "react-toastify"

// export default function AdminSubmissions() {
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchSubmissions()
//   }, [])

//   const fetchSubmissions = async () => {
//     try {
//       const res = await axios.get("/submissions/admin/all") // Adjust API endpoint
//       setSubmissions(res.data)
//     } catch (err) {
//       toast.error("Failed to load submissions")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen text-purple-100">
//       <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>

//       {loading ? (
//         <p className="text-purple-300">Loading submissions...</p>
//       ) : submissions.length === 0 ? (
//         <p className="text-purple-300">No submissions found.</p>
//       ) : (
//         <table className="w-full text-left border-collapse border border-purple-500/30">
//           <thead>
//             <tr className="bg-purple-800/50">
//               <th className="border border-purple-500/30 p-2">Assignment Title</th>
//               <th className="border border-purple-500/30 p-2">User </th>
//               <th className="border border-purple-500/30 p-2">Text Submission</th>
//               <th className="border border-purple-500/30 p-2">File</th>
//               <th className="border border-purple-500/30 p-2">Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr key={sub._id} className="border-t border-purple-500/20">
//                 <td className="border border-purple-500/30 p-2">{sub.assignmentTitle}</td>
//                 <td className="border border-purple-500/30 p-2">{sub.userName || sub.userId}</td>
//                 <td className="border border-purple-500/30 p-2 whitespace-pre-wrap max-w-xs">
//                   {sub.submissionText || "-"}
//                 </td>
//                 <td className="border border-purple-500/30 p-2">
//                   {sub.fileUrl ? (
//                     <a
//                       href={sub.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-purple-400 underline"
//                     >
//                       View File
//                     </a>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="border border-purple-500/30 p-2">
//                   {new Date(sub.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }




// // //client/src/pages/dashboardAdmin/AdminSubmissions.js

// import { useState, useEffect } from "react"
// import axios from "../../api/axiosConfig"
// import { toast } from "react-toastify"

// export default function AdminSubmissions() {
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchSubmissions()
//   }, [])

//   const fetchSubmissions = async () => {
//     try {
//       const res = await axios.get("/submissions/admin/all")
//       setSubmissions(res.data)
//     } catch (err) {
//       toast.error("Failed to load submissions")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-6 w-full h-full text-blue-900">
//       <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>

//       {loading ? (
//         <p className="text-blue-600">Loading submissions...</p>
//       ) : submissions.length === 0 ? (
//         <p className="text-blue-600">No submissions found.</p>
//       ) : (
//         <table className="w-full text-left border-collapse border border-blue-500/30">
//           <thead>
//             <tr className="bg-blue-200/50">
//               <th className="border border-blue-500/30 p-2">Assignment Title</th>
//               <th className="border border-blue-500/30 p-2">User</th>
//               <th className="border border-blue-500/30 p-2">Text Submission</th>
//               <th className="border border-blue-500/30 p-2">File</th>
//               <th className="border border-blue-500/30 p-2">Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr key={sub._id} className="border-t border-blue-500/20">
//                 <td className="border border-blue-500/30 p-2">{sub.assignmentTitle}</td>
//                 <td className="border border-blue-500/30 p-2">{sub.userName || sub.userId}</td>
//                 <td className="border border-blue-500/30 p-2 whitespace-pre-wrap max-w-xs">
//                   {sub.submissionText || "-"}
//                 </td>
//                 <td className="border border-blue-500/30 p-2">
//                   {sub.fileUrl ? (
//                     <a
//                       href={sub.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       View File
//                     </a>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="border border-blue-500/30 p-2">
//                   {new Date(sub.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }










import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import { toast } from "react-toastify";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("/submissions/admin/all");
      setSubmissions(res.data);
    } catch (err) {
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full py-6 text-blue-900">
      <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>

      {loading ? (
        <p className="text-blue-600">Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p className="text-blue-600">No submissions found.</p>
      ) : (
        <table className="w-full text-left border-collapse border border-blue-500/30">
          <thead>
            <tr className="bg-blue-200/50">
              <th className="border border-blue-500/30 p-2">Assignment Title</th>
              <th className="border border-blue-500/30 p-2">User</th>
              <th className="border border-blue-500/30 p-2">Text Submission</th>
              <th className="border border-blue-500/30 p-2">File</th>
              <th className="border border-blue-500/30 p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-t border-blue-500/20">
                <td className="border border-blue-500/30 p-2">{sub.assignmentTitle}</td>
                <td className="border border-blue-500/30 p-2">{sub.userName || sub.userId}</td>
                <td className="border border-blue-500/30 p-2 whitespace-pre-wrap">
                  {sub.submissionText || "-"}
                </td>
                <td className="border border-blue-500/30 p-2">
                  {sub.fileUrl ? (
                    <a
                      href={sub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-blue-500/30 p-2">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
