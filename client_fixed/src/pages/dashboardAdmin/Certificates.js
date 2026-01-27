"use client"

import { useEffect, useState } from "react"
import { Award, Download, Eye, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCert, setSelectedCert] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/certificates/admin", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to load certificates")
      setCertificates(data.data || [])
    } catch (e) {
      setError(e.message)
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDownload = async (certId) => {
    try {
      const res = await fetch(`/api/certificates/${certId}/download`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!res.ok) throw new Error("Failed to download certificate")
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `certificate-${certId}.png`
      a.click()
      window.URL.revokeObjectURL(url)
      toast.success("Certificate downloaded")
    } catch (e) {
      toast.error(e.message)
    }
  }

  const stats = {
    total: certificates.length,
    thisMonth: certificates.filter((c) => {
      const date = new Date(c.issuedAt)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length,
    users: new Set(certificates.map((c) => c.userId)).size,
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <ToastContainer position="bottom-right" theme="colored" />

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Certificates
          </h1>
        </div>
        <p className="text-slate-400 ml-15">Monitor and manage student certificates</p>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Certificates</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.thisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Students Certified</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.users}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">All Certificates</h2>
          <span className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl text-sm shadow-md">
            {certificates.length} Total
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <p className="text-slate-500 mt-2">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No certificates yet</h3>
            <p className="text-slate-500">Certificates will appear here when students complete courses</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-bold text-slate-900">{cert.courseName}</h3>
                    </div>
                    <p className="text-sm text-slate-600">Student: {cert.userName}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Award className="w-4 h-4" />
                    <span>ID: {cert.certificateId.slice(0, 8)}...</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCert(cert)
                      setShowModal(true)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(cert._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors font-semibold text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Certificate Preview</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 mb-6 border-2 border-amber-200">
              <div className="text-center space-y-4">
                <Award className="w-16 h-16 text-amber-600 mx-auto" />
                <h3 className="text-3xl font-bold text-amber-900">Certificate of Completion</h3>
                <p className="text-lg text-amber-800">This is to certify that</p>
                <p className="text-2xl font-bold text-amber-900">{selectedCert.userName}</p>
                <p className="text-lg text-amber-800">has successfully completed the course</p>
                <p className="text-2xl font-bold text-amber-900">{selectedCert.courseName}</p>
                <p className="text-sm text-amber-700 pt-4">
                  Issued on {new Date(selectedCert.issuedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDownload(selectedCert._id)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
