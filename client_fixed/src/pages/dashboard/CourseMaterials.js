// client/src/pages/dashboard/CourseMaterials.js

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Video, Download, Eye, Clock } from "lucide-react"
import { materialApi } from "../../api/materialApi"
import { toast } from "react-toastify"

export default function CourseMaterials({ courseId }) {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMaterials()
  }, [courseId])

  const fetchMaterials = async () => {
    try {
      const response = await materialApi.getCourseMaterials(courseId)
      setMaterials(response.data.data || [])
    } catch (error) {
      toast.error("Failed to fetch materials")
    } finally {
      setLoading(false)
    }
  }

  const handleViewMaterial = async (materialId) => {
    try {
      await materialApi.markMaterialViewed(courseId, materialId, 0)
      fetchMaterials()
    } catch (error) {
      toast.error("Failed to mark material as viewed")
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />
      case "pdf":
      case "document":
        return <FileText className="w-5 h-5" />
      default:
        return <Download className="w-5 h-5" />
    }
  }

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Course Materials</h2>
      {materials.length === 0 ? (
        <p className="text-gray-500">No materials available yet</p>
      ) : (
        <div className="space-y-3">
          {materials.map((material) => (
            <motion.div
              key={material._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-purple-600 mt-1">{getIcon(material.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{material.title}</h3>
                    <p className="text-sm text-gray-600">{material.description}</p>
                    {material.duration && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Clock className="w-3 h-3" />
                        {Math.round(material.duration / 60)} minutes
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleViewMaterial(material._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  {material.viewed ? "Viewed" : "View"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
