// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { motion } from "framer-motion"
// // // import { Award, Download, Eye, Share2, Calendar, CheckCircle } from "lucide-react"
// // // import { certificateApi } from "../../api/certificateApi"
// // // import { toast } from "react-toastify"

// // // export default function Certificates() {
// // //   const [certificates, setCertificates] = useState([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [selectedCertificate, setSelectedCertificate] = useState(null)

// // //   useEffect(() => {
// // //     fetchCertificates()
// // //   }, [])

// // //   const fetchCertificates = async () => {
// // //     try {
// // //       const response = await certificateApi.getUserCertificates()
// // //       setCertificates(response.data.data || [])
// // //     } catch (error) {
// // //       toast.error("Failed to fetch certificates")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleDownload = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.downloadCertificate(certificateId)
// // //       toast.success("Certificate downloaded successfully!")
// // //       // Here you would handle the actual file download
// // //       console.log("Certificate data:", response.data.data)
// // //     } catch (error) {
// // //       toast.error("Failed to download certificate")
// // //     }
// // //   }

// // //   const handleShare = (certificate) => {
// // //     const shareUrl = `${window.location.origin}/verify/${certificate.certificateId}`
// // //     navigator.clipboard.writeText(shareUrl)
// // //     toast.success("Certificate verification link copied to clipboard!")
// // //   }

// // //   const handleViewDetails = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.getCertificate(certificateId)
// // //       setSelectedCertificate(response.data.data)
// // //     } catch (error) {
// // //       toast.error("Failed to fetch certificate details")
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
// // //       {/* Header */}
// // //       <div>
// // //         <h1 className="text-2xl font-bold text-white">My Certificates</h1>
// // //         <p className="text-gray-400">View and manage your earned certificates</p>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-400 text-sm">Total Certificates</p>
// // //               <p className="text-2xl font-bold text-white">{certificates.length}</p>
// // //             </div>
// // //             <Award className="text-yellow-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           delay={0.1}
// // //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-400 text-sm">Verified Certificates</p>
// // //               <p className="text-2xl font-bold text-white">{certificates.filter((c) => c.isVerified).length}</p>
// // //             </div>
// // //             <CheckCircle className="text-green-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           delay={0.2}
// // //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-400 text-sm">This Month</p>
// // //               <p className="text-2xl font-bold text-white">
// // //                 {
// // //                   certificates.filter((c) => {
// // //                     const certDate = new Date(c.issuedAt)
// // //                     const now = new Date()
// // //                     return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear()
// // //                   }).length
// // //                 }
// // //               </p>
// // //             </div>
// // //             <Calendar className="text-purple-500" size={24} />
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Certificates Grid */}
// // //       {certificates.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {certificates.map((certificate) => (
// // //             <motion.div
// // //               key={certificate._id}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500 transition-colors"
// // //             >
// // //               {/* Certificate Header */}
// // //               <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4">
// // //                 <div className="flex items-center justify-between">
// // //                   <Award className="text-white" size={24} />
// // //                   <div
// // //                     className={`px-2 py-1 rounded text-xs font-medium ${
// // //                       certificate.isVerified ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
// // //                     }`}
// // //                   >
// // //                     {certificate.isVerified ? "Verified" : "Pending"}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="p-6">
// // //                 {/* Course Info */}
// // //                 <h3 className="text-lg font-semibold text-white mb-2">{certificate.course.title}</h3>
// // //                 <p className="text-sm text-gray-400 mb-4">Certificate of Completion</p>

// // //                 {/* Certificate Details */}
// // //                 <div className="space-y-2 mb-4">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-400">Certificate ID:</span>
// // //                     <span className="text-white font-mono text-xs">{certificate.certificateId}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-400">Issued:</span>
// // //                     <span className="text-white">{new Date(certificate.issuedAt).toLocaleDateString()}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-400">Grade:</span>
// // //                     <span className="text-white">{certificate.grade}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-400">Valid Until:</span>
// // //                     <span className="text-white">{new Date(certificate.validUntil).toLocaleDateString()}</span>
// // //                   </div>
// // //                 </div>

// // //                 {/* Action Buttons */}
// // //                 <div className="flex gap-2">
// // //                   <button
// // //                     onClick={() => handleViewDetails(certificate._id)}
// // //                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                   >
// // //                     <Eye size={16} />
// // //                     View
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDownload(certificate._id)}
// // //                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                   >
// // //                     <Download size={16} />
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleShare(certificate)}
// // //                     className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                   >
// // //                     <Share2 size={16} />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <Award size={48} className="text-gray-600 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">No certificates yet</h3>
// // //           <p className="text-gray-500">Complete courses to earn certificates</p>
// // //         </div>
// // //       )}

// // //       {/* Certificate Details Modal */}
// // //       {selectedCertificate && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // //           >
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-white">Certificate Details</h2>
// // //               <button onClick={() => setSelectedCertificate(null)} className="text-gray-400 hover:text-white">
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             {/* Certificate Preview */}
// // //             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 mb-6 text-center border-4 border-yellow-400">
// // //               <div className="text-yellow-800">
// // //                 <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>
// // //                 <p className="text-lg mb-2">This is to certify that</p>
// // //                 <h2 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.user.name}</h2>
// // //                 <p className="text-lg mb-2">has successfully completed the course</p>
// // //                 <h3 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.course.title}</h3>
// // //                 <div className="flex justify-between items-center mt-8">
// // //                   <div>
// // //                     <p className="text-sm">Issued on</p>
// // //                     <p className="font-semibold">{new Date(selectedCertificate.issuedAt).toLocaleDateString()}</p>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <Award size={32} className="text-yellow-600 mx-auto mb-2" />
// // //                     <p className="text-sm font-semibold">Grade: {selectedCertificate.grade}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm">Certificate ID</p>
// // //                     <p className="font-mono text-xs">{selectedCertificate.certificateId}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={() => handleDownload(selectedCertificate._id)}
// // //                 className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// // //               >
// // //                 <Download size={16} />
// // //                 Download PDF
// // //               </button>
// // //               <button
// // //                 onClick={() => handleShare(selectedCertificate)}
// // //                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// // //               >
// // //                 <Share2 size={16} />
// // //                 Share Link
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }



// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { motion } from "framer-motion"
// // // import { Award, Download, Eye, Share2, Calendar, CheckCircle } from "lucide-react"
// // // import { certificateApi } from "../../api/certificateApi"
// // // import { toast } from "react-toastify"

// // // export default function Certificates() {
// // //   const [certificates, setCertificates] = useState([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [selectedCertificate, setSelectedCertificate] = useState(null)

// // //   useEffect(() => {
// // //     fetchCertificates()
// // //   }, [])

// // //   const fetchCertificates = async () => {
// // //     try {
// // //       const response = await certificateApi.getUserCertificates()
// // //       setCertificates(response.data.data || [])
// // //     } catch (error) {
// // //       toast.error("Failed to fetch certificates")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleDownload = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.downloadCertificate(certificateId)
// // //       toast.success("Certificate downloaded successfully!")
// // //       console.log("Certificate data:", response.data.data)
// // //     } catch (error) {
// // //       toast.error("Failed to download certificate")
// // //     }
// // //   }

// // //   const handleShare = (certificate) => {
// // //     const shareUrl = `${window.location.origin}/verify/${certificate.certificateId}`
// // //     navigator.clipboard.writeText(shareUrl)
// // //     toast.success("Certificate verification link copied to clipboard!")
// // //   }

// // //   const handleViewDetails = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.getCertificate(certificateId)
// // //       setSelectedCertificate(response.data.data)
// // //     } catch (error) {
// // //       toast.error("Failed to fetch certificate details")
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
// // //     <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-sm">
// // //       {/* Header */}
// // //       <div>
// // //         <h1 className="text-2xl font-bold text-black">My Certificates</h1>
// // //         <p className="text-gray-600">View and manage your earned certificates</p>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="bg-white rounded-lg p-6 border border-gray-300"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">Total Certificates</p>
// // //               <p className="text-2xl font-bold text-black">{certificates.length}</p>
// // //             </div>
// // //             <Award className="text-yellow-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           delay={0.1}
// // //           className="bg-white rounded-lg p-6 border border-gray-300"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">Verified Certificates</p>
// // //               <p className="text-2xl font-bold text-black">{certificates.filter((c) => c.isVerified).length}</p>
// // //             </div>
// // //             <CheckCircle className="text-green-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           delay={0.2}
// // //           className="bg-white rounded-lg p-6 border border-gray-300"
// // //         >
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">This Month</p>
// // //               <p className="text-2xl font-bold text-black">
// // //                 {
// // //                   certificates.filter((c) => {
// // //                     const certDate = new Date(c.issuedAt)
// // //                     const now = new Date()
// // //                     return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear()
// // //                   }).length
// // //                 }
// // //               </p>
// // //             </div>
// // //             <Calendar className="text-purple-500" size={24} />
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Certificates Grid */}
// // //       {certificates.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {certificates.map((certificate) => (
// // //             <motion.div
// // //               key={certificate._id}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-yellow-500 transition-colors"
// // //             >
// // //               {/* Certificate Header */}
// // //               <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4">
// // //                 <div className="flex items-center justify-between">
// // //                   <Award className="text-white" size={24} />
// // //                   <div
// // //                     className={`px-2 py-1 rounded text-xs font-medium ${
// // //                       certificate.isVerified ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
// // //                     }`}
// // //                   >
// // //                     {certificate.isVerified ? "Verified" : "Pending"}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="p-6">
// // //                 {/* Course Info */}
// // //                 <h3 className="text-lg font-semibold text-black mb-2">{certificate.course.title}</h3>
// // //                 <p className="text-sm text-gray-600 mb-4">Certificate of Completion</p>

// // //                 {/* Certificate Details */}
// // //                 <div className="space-y-2 mb-4">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Certificate ID:</span>
// // //                     <span className="text-black font-mono text-xs">{certificate.certificateId}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Issued:</span>
// // //                     <span className="text-black">{new Date(certificate.issuedAt).toLocaleDateString()}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Grade:</span>
// // //                     <span className="text-black">{certificate.grade}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Valid Until:</span>
// // //                     <span className="text-black">{new Date(certificate.validUntil).toLocaleDateString()}</span>
// // //                   </div>
// // //                 </div>

// // //                 {/* Action Buttons */}
// // //                 <div className="flex gap-2">
// // //                   <button
// // //                     onClick={() => handleViewDetails(certificate._id)}
// // //                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                   >
// // //                     <Eye size={16} />
// // //                     View
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDownload(certificate._id)}
// // //                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                   >
// // //                     <Download size={16} />
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleShare(certificate)}
// // //                     className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //                   >
// // //                     <Share2 size={16} />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <Award size={48} className="text-gray-400 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-600 mb-2">No certificates yet</h3>
// // //           <p className="text-gray-500">Complete courses to earn certificates</p>
// // //         </div>
// // //       )}

// // //       {/* Certificate Details Modal */}
// // //       {selectedCertificate && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// // //           >
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-black">Certificate Details</h2>
// // //               <button onClick={() => setSelectedCertificate(null)} className="text-gray-500 hover:text-black">
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             {/* Certificate Preview */}
// // //             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 mb-6 text-center border-4 border-yellow-400">
// // //               <div className="text-yellow-800">
// // //                 <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>
// // //                 <p className="text-lg mb-2">This is to certify that</p>
// // //                 <h2 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.user.name}</h2>
// // //                 <p className="text-lg mb-2">has successfully completed the course</p>
// // //                 <h3 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.course.title}</h3>
// // //                 <div className="flex justify-between items-center mt-8">
// // //                   <div>
// // //                     <p className="text-sm">Issued on</p>
// // //                     <p className="font-semibold">{new Date(selectedCertificate.issuedAt).toLocaleDateString()}</p>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <Award size={32} className="text-yellow-600 mx-auto mb-2" />
// // //                     <p className="text-sm font-semibold">Grade: {selectedCertificate.grade}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm">Certificate ID</p>
// // //                     <p className="font-mono text-xs">{selectedCertificate.certificateId}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={() => handleDownload(selectedCertificate._id)}
// // //                 className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// // //               >
// // //                 <Download size={16} />
// // //                 Download PDF
// // //               </button>
// // //               <button
// // //                 onClick={() => handleShare(selectedCertificate)}
// // //                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// // //               >
// // //                 <Share2 size={16} />
// // //                 Share Link
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }










// // //client/src/pages/dashboard/Certificates.js

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import { Award, Download, Eye, Share2, Calendar, CheckCircle } from "lucide-react";
// // // import { certificateApi } from "../../api/certificateApi";
// // // import { toast } from "react-toastify";
// // // import { useTheme } from "../../context/ThemeContext";

// // // export default function Certificates() {
// // //   const [certificates, setCertificates] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedCertificate, setSelectedCertificate] = useState(null);

// // //   const theme = useTheme(); // consistent gradient background

// // //   useEffect(() => {
// // //     fetchCertificates();
// // //   }, []);

// // //   const fetchCertificates = async () => {
// // //     try {
// // //       const response = await certificateApi.getUserCertificates();
// // //       setCertificates(response.data.data || []);
// // //     } catch {
// // //       toast.error("Failed to fetch certificates");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDownload = async (certificateId) => {
// // //     try {
// // //       await certificateApi.downloadCertificate(certificateId);
// // //       toast.success("Certificate downloaded successfully!");
// // //     } catch {
// // //       toast.error("Failed to download certificate");
// // //     }
// // //   };

// // //   const handleShare = (certificate) => {
// // //     const shareUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
// // //     navigator.clipboard.writeText(shareUrl);
// // //     toast.success("Certificate verification link copied!");
// // //   };

// // //   const handleViewDetails = async (certificateId) => {
// // //     try {
// // //       const response = await certificateApi.getCertificate(certificateId);
// // //       setSelectedCertificate(response.data.data);
// // //     } catch {
// // //       toast.error("Failed to fetch certificate details");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center flex-1 h-full min-h-screen">
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
// // //         <h1 className="text-2xl font-bold text-white">My Certificates</h1>
// // //         <p className="text-gray-200">View and manage your earned certificates</p>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 border border-gray-300">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">Total Certificates</p>
// // //               <p className="text-2xl font-bold text-black">{certificates.length}</p>
// // //             </div>
// // //             <Award className="text-yellow-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg p-6 border border-gray-300">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">Verified Certificates</p>
// // //               <p className="text-2xl font-bold text-black">{certificates.filter(c => c.isVerified).length}</p>
// // //             </div>
// // //             <CheckCircle className="text-green-500" size={24} />
// // //           </div>
// // //         </motion.div>

// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg p-6 border border-gray-300">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <p className="text-gray-600 text-sm">This Month</p>
// // //               <p className="text-2xl font-bold text-black">
// // //                 {certificates.filter(c => {
// // //                   const certDate = new Date(c.issuedAt);
// // //                   const now = new Date();
// // //                   return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
// // //                 }).length}
// // //               </p>
// // //             </div>
// // //             <Calendar className="text-purple-500" size={24} />
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Certificates Grid */}
// // //       {certificates.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {certificates.map(certificate => (
// // //             <motion.div key={certificate._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-yellow-500 transition-colors">
// // //               {/* Header */}
// // //               <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 flex justify-between items-center">
// // //                 <Award className="text-white" size={24} />
// // //                 <div className={`px-2 py-1 rounded text-xs font-medium ${certificate.isVerified ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
// // //                   {certificate.isVerified ? "Verified" : "Pending"}
// // //                 </div>
// // //               </div>

// // //               <div className="p-6">
// // //                 <h3 className="text-lg font-semibold text-black mb-2">{certificate.course.title}</h3>
// // //                 <p className="text-sm text-gray-600 mb-4">Certificate of Completion</p>

// // //                 <div className="space-y-2 mb-4">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Certificate ID:</span>
// // //                     <span className="text-black font-mono text-xs">{certificate.certificateId}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Issued:</span>
// // //                     <span className="text-black">{new Date(certificate.issuedAt).toLocaleDateString()}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Grade:</span>
// // //                     <span className="text-black">{certificate.grade}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Valid Until:</span>
// // //                     <span className="text-black">{new Date(certificate.validUntil).toLocaleDateString()}</span>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-2">
// // //                   <button onClick={() => handleViewDetails(certificate._id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"><Eye size={16}/> View</button>
// // //                   <button onClick={() => handleDownload(certificate._id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"><Download size={16}/></button>
// // //                   <button onClick={() => handleShare(certificate)} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"><Share2 size={16}/></button>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <Award size={48} className="text-gray-400 mx-auto mb-4"/>
// // //           <h3 className="text-lg font-semibold text-gray-600 mb-2">No certificates yet</h3>
// // //           <p className="text-gray-500">Complete courses to earn certificates</p>
// // //         </div>
// // //       )}

// // //       {/* Certificate Modal */}
// // //       {selectedCertificate && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-black">Certificate Details</h2>
// // //               <button onClick={() => setSelectedCertificate(null)} className="text-gray-500 hover:text-black">✕</button>
// // //             </div>

// // //             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 mb-6 text-center border-4 border-yellow-400">
// // //               <div className="text-yellow-800">
// // //                 <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>
// // //                 <p className="text-lg mb-2">This is to certify that</p>
// // //                 <h2 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.user.name}</h2>
// // //                 <p className="text-lg mb-2">has successfully completed the course</p>
// // //                 <h3 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.course.title}</h3>
// // //                 <div className="flex justify-between items-center mt-8">
// // //                   <div>
// // //                     <p className="text-sm">Issued on</p>
// // //                     <p className="font-semibold">{new Date(selectedCertificate.issuedAt).toLocaleDateString()}</p>
// // //                   </div>
// // //                   <div className="text-center">
// // //                     <Award size={32} className="text-yellow-600 mx-auto mb-2" />
// // //                     <p className="text-sm font-semibold">Grade: {selectedCertificate.grade}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm">Certificate ID</p>
// // //                     <p className="font-mono text-xs">{selectedCertificate.certificateId}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-3">
// // //               <button onClick={() => handleDownload(selectedCertificate._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"><Download size={16}/> Download PDF</button>
// // //               <button onClick={() => handleShare(selectedCertificate)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"><Share2 size={16}/> Share Link</button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }






// // // client/src/pages/dashboard/Certificates.js
// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Award, Download, Eye, Share2, Calendar, CheckCircle } from "lucide-react";
// // import { certificateApi } from "../../api/certificateApi";
// // import { toast } from "react-toastify";
// // import { Card } from "../../components/Layouts/Card";


// // export default function Certificates() {
// //   const [certificates, setCertificates] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCertificate, setSelectedCertificate] = useState(null);

// //   useEffect(() => {
// //     fetchCertificates();
// //   }, []);

// //   const fetchCertificates = async () => {
// //     try {
// //       const response = await certificateApi.getUserCertificates();
// //       setCertificates(response.data.data || []);
// //     } catch {
// //       toast.error("Failed to fetch certificates");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDownload = async (certificateId) => {
// //     try {
// //       await certificateApi.downloadCertificate(certificateId);
// //       toast.success("Certificate downloaded successfully!");
// //     } catch {
// //       toast.error("Failed to download certificate");
// //     }
// //   };

// //   const handleShare = (certificate) => {
// //     const shareUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
// //     navigator.clipboard.writeText(shareUrl);
// //     toast.success("Certificate verification link copied!");
// //   };

// //   const handleViewDetails = async (certificateId) => {
// //     try {
// //       const response = await certificateApi.getCertificate(certificateId);
// //       setSelectedCertificate(response.data.data);
// //     } catch {
// //       toast.error("Failed to fetch certificate details");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center flex-1 h-full min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col flex-1 space-y-6 p-4 md:p-6 min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-bold text-gray-800">My Certificates</h1>
// //         <p className="text-gray-600">View and manage your earned certificates</p>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
// //           <Card className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">Total Certificates</p>
// //                 <p className="text-2xl font-bold text-black">{certificates.length}</p>
// //               </div>
// //               <Award className="text-yellow-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>

// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
// //           <Card className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">Verified Certificates</p>
// //                 <p className="text-2xl font-bold text-black">{certificates.filter(c => c.isVerified).length}</p>
// //               </div>
// //               <CheckCircle className="text-green-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>

// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
// //           <Card className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-gray-600 text-sm">This Month</p>
// //                 <p className="text-2xl font-bold text-black">
// //                   {certificates.filter(c => {
// //                     const certDate = new Date(c.issuedAt);
// //                     const now = new Date();
// //                     return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
// //                   }).length}
// //                 </p>
// //               </div>
// //               <Calendar className="text-purple-500" size={24} />
// //             </div>
// //           </Card>
// //         </motion.div>
// //       </div>

// //       {/* Certificates Grid */}
// //       {certificates.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {certificates.map(certificate => (
// //             <motion.div key={certificate._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
// //               <Card className="overflow-hidden hover:border-yellow-500 transition-colors">
// //                 {/* Header */}
// //                 <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 flex justify-between items-center">
// //                   <Award className="text-white" size={24} />
// //                   <div
// //                     className={`px-2 py-1 rounded text-xs font-medium ${
// //                       certificate.isVerified ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
// //                     }`}
// //                   >
// //                     {certificate.isVerified ? "Verified" : "Pending"}
// //                   </div>
// //                 </div>

// //                 <div className="p-6">
// //                   <h3 className="text-lg font-semibold text-black mb-2">{certificate.course.title}</h3>
// //                   <p className="text-sm text-gray-600 mb-4">Certificate of Completion</p>

// //                   <div className="space-y-2 mb-4">
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-600">Certificate ID:</span>
// //                       <span className="text-black font-mono text-xs">{certificate.certificateId}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-600">Issued:</span>
// //                       <span className="text-black">{new Date(certificate.issuedAt).toLocaleDateString()}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-600">Grade:</span>
// //                       <span className="text-black">{certificate.grade}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-600">Valid Until:</span>
// //                       <span className="text-black">{new Date(certificate.validUntil).toLocaleDateString()}</span>
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => handleViewDetails(certificate._id)}
// //                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// //                     >
// //                       <Eye size={16} /> View
// //                     </button>
// //                     <button
// //                       onClick={() => handleDownload(certificate._id)}
// //                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
// //                     >
// //                       <Download size={16} />
// //                     </button>
// //                     <button
// //                       onClick={() => handleShare(certificate)}
// //                       className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
// //                     >
// //                       <Share2 size={16} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </Card>
// //             </motion.div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center py-12">
// //           <Award size={48} className="text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold text-gray-600 mb-2">No certificates yet</h3>
// //           <p className="text-gray-500">Complete courses to earn certificates</p>
// //         </div>
// //       )}

// //       {/* Certificate Modal */}
// //       {selectedCertificate && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// //           >
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-xl font-bold text-black">Certificate Details</h2>
// //               <button onClick={() => setSelectedCertificate(null)} className="text-gray-500 hover:text-black">
// //                 ✕
// //               </button>
// //             </div>

// //             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 mb-6 text-center border-4 border-yellow-400">
// //               <div className="text-yellow-800">
// //                 <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>
// //                 <p className="text-lg mb-2">This is to certify that</p>
// //                 <h2 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.user.name}</h2>
// //                 <p className="text-lg mb-2">has successfully completed the course</p>
// //                 <h3 className="text-xl font-bold text-yellow-900 mb-4">{selectedCertificate.course.title}</h3>
// //                 <div className="flex justify-between items-center mt-8">
// //                   <div>
// //                     <p className="text-sm">Issued on</p>
// //                     <p className="font-semibold">
// //                       {new Date(selectedCertificate.issuedAt).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                   <div className="text-center">
// //                     <Award size={32} className="text-yellow-600 mx-auto mb-2" />
// //                     <p className="text-sm font-semibold">Grade: {selectedCertificate.grade}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm">Certificate ID</p>
// //                     <p className="font-mono text-xs">{selectedCertificate.certificateId}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => handleDownload(selectedCertificate._id)}
// //                 className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// //               >
// //                 <Download size={16} /> Download PDF
// //               </button>
// //               <button
// //                 onClick={() => handleShare(selectedCertificate)}
// //                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
// //               >
// //                 <Share2 size={16} /> Share Link
// //               </button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }















// //client/src/pages/dashboard/Certificates.js
// "use client"

// import { useEffect, useState } from "react"
// import { Card } from "../../components/Layouts/Card"
// import { Button } from "../../components/Layouts/Button"


// import { Download, Share2 } from "lucide-react"

// export default function Certificates() {
//   const [certificates, setCertificates] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await fetch("/api/certificates/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setCertificates(data)
//         }
//       } catch (error) {
//         console.error("Error fetching certificates:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCertificates()
//   }, [])

//   const handleDownload = async (certificateId) => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/certificates/${certificateId}/download`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.ok) {
//         const blob = await response.blob()
//         const url = window.URL.createObjectURL(blob)
//         const a = document.createElement("a")
//         a.href = url
//         a.download = `certificate-${certificateId}.pdf`
//         a.click()
//       }
//     } catch (error) {
//       console.error("Error downloading certificate:", error)
//     }
//   }

//   const handleShare = async (certificateId) => {
//     try {
//       const shareUrl = `${window.location.origin}/certificates/view/${certificateId}`
//       await navigator.clipboard.writeText(shareUrl)
//       alert("Certificate link copied to clipboard!")
//     } catch (error) {
//       console.error("Error sharing certificate:", error)
//     }
//   }

//   if (loading) return <div className="text-center py-8">Loading certificates...</div>

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold mb-6">My Certificates</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {certificates.map((cert) => (
//           <Card key={cert._id} className="p-6">
//             <h3 className="text-lg font-semibold mb-2">{cert.courseName}</h3>
//             <p className="text-gray-600 text-sm mb-4">
//               Issued on {new Date(cert.issuedDate).toLocaleDateString()}
//             </p>
//             <div className="flex gap-2">
//               <Button size="sm" variant="outline" onClick={() => handleDownload(cert._id)}>
//                 <Download size={16} className="mr-2" />
//                 Download
//               </Button>
//               <Button size="sm" variant="outline" onClick={() => handleShare(cert._id)}>
//                 <Share2 size={16} className="mr-2" />
//                 Share
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }









//client/src/pages/dashboard/Certificates.js
import { useEffect, useState } from "react"
import { Button } from "../../components/Layouts/Button"
import { Card } from "../../components/Layouts/Card"
import { Download, Share2 } from "lucide-react"

export default function Certificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/certificates/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          const result = await response.json()
          setCertificates(result.data || result)
        }
      } catch (error) {
        console.error("Error fetching certificates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  const handleDownload = async (certificateId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/certificates/${certificateId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `certificate-${certificateId}.pdf`
        a.click()
      }
    } catch (error) {
      console.error("Error downloading certificate:", error)
    }
  }

  const handleShare = async (certificateId) => {
    try {
      const shareUrl = `${window.location.origin}/certificates/view/${certificateId}`
      await navigator.clipboard.writeText(shareUrl)
      alert("Certificate link copied to clipboard!")
    } catch (error) {
      console.error("Error sharing certificate:", error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading certificates...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card key={cert._id} className="p-6">
            <h3 className="text-lg font-semibold mb-2">{cert.courseName || cert.course?.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              Issued on {new Date(cert.issuedDate || cert.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleDownload(cert._id)}>
                <Download size={16} className="mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleShare(cert._id)}>
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
