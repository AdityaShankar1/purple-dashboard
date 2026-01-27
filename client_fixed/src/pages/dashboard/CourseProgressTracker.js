// client/src/pages/dashboard/CourseProgressTracker.js

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { progressApi } from "../../api/progressApi"
import { toast } from "react-toastify"

export default function CourseProgressTracker({ courseId }) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [courseId])

  const fetchProgress = async () => {
    try {
      const response = await progressApi.getCourseProgress(courseId)
      setProgress(response.data.data)
    } catch (error) {
      toast.error("Failed to fetch progress")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  }

  if (!progress) {
    return <p className="text-gray-500">No progress data available</p>
  }

  const progressItems = [
    {
      label: "Materials",
      completed: progress.materialsCompleted,
      total: progress.totalMaterials,
      color: "bg-blue-500",
    },
    {
      label: "Quizzes",
      completed: progress.quizzesCompleted,
      total: progress.totalQuizzes,
      color: "bg-green-500",
    },
    {
      label: "Assignments",
      completed: progress.assignmentsCompleted,
      total: progress.totalAssignments,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Progress</h2>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Overall Progress</span>
            <span className="text-2xl font-bold text-purple-600">{progress.overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.overallProgress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-purple-600 h-3 rounded-full"
            />
          </div>
        </motion.div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                <span className="text-lg font-bold text-gray-900">
                  {item.completed}/{item.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-300`}
                  style={{
                    width: item.total > 0 ? `${(item.completed / item.total) * 100}%` : "0%",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {progress.certificateGenerated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 border-2 border-yellow-400"
        >
          <p className="text-yellow-800 font-semibold">
            🎉 Congratulations! You have completed this course and earned a certificate!
          </p>
        </motion.div>
      )}
    </div>
  )
}
