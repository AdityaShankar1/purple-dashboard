//client/src/pages/dashboard/AssignmentSubmit.js
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Save, Send, AlertCircle } from "lucide-react"
import { assignmentApi } from "../../api/assignmentApi"
import { toast } from "react-toastify"
import { sessionManager } from "../../utils/sessionManager"

export default function AssignmentSubmit() {
  const { assignmentId } = useParams()
  const navigate = useNavigate()
  const [assignment, setAssignment] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        const response = await assignmentApi.getAssignment(assignmentId)
        setAssignment(response.data.data.assignment)
        setSubmission(response.data.data.submission)

        // Restore from localStorage
        const savedText = localStorage.getItem(`assignment-${assignmentId}`)
        if (savedText) {
          setText(savedText)
        } else if (response.data.data.submission?.submissionText) {
          setText(response.data.data.submission.submissionText)
        }

        // Update session
        sessionManager.updateCurrentPage(`/user/assignments/${assignmentId}`, {
          assignmentId,
          submissionId: response.data.data.submission._id,
        })
      } catch (error) {
        toast.error("Failed to load assignment")
      } finally {
        setLoading(false)
      }
    }

    loadAssignment()
  }, [assignmentId])

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(`assignment-${assignmentId}`, text)
  }, [text, assignmentId])

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      await assignmentApi.saveDraft(submission._id, text)
      toast.success("Draft saved successfully")
    } catch (error) {
      toast.error("Failed to save draft")
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter your submission")
      return
    }

    if (!window.confirm("Are you sure you want to submit? You won't be able to edit after submission.")) {
      return
    }

    setSubmitting(true)
    try {
      await assignmentApi.submitAssignment(submission._id, text)
      toast.success("Assignment submitted successfully!")
      localStorage.removeItem(`assignment-${assignmentId}`)
      navigate("/user/dashboard")
    } catch (error) {
      toast.error("Failed to submit assignment")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!assignment || !submission) {
    return <div className="text-center py-12">Assignment not found</div>
  }

  const isOverdue = new Date() > new Date(assignment.dueDate)
  const isSubmitted = submission.submitted

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 mb-6 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
        <p className="text-gray-600 mb-4">{assignment.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            {isOverdue && !isSubmitted && (
              <div className="flex items-center gap-2 text-red-600 mt-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">This assignment is overdue</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Max Grade: {assignment.maxGrade}</p>
            {isSubmitted && <p className="text-sm text-green-600 font-semibold">Submitted</p>}
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200"
      >
        <h2 className="font-semibold text-gray-900 mb-2">Instructions</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{assignment.instructions}</p>
      </motion.div>

      {/* Submission Area */}
      {!isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <label className="block text-sm font-semibold text-gray-900 mb-3">Your Submission</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your assignment submission here..."
            rows={12}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none resize-none"
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Submitting..." : "Submit Assignment"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 rounded-lg p-6 border-2 border-green-500"
        >
          <h2 className="text-lg font-bold text-green-700 mb-2">Assignment Submitted</h2>
          <p className="text-green-600 mb-4">Submitted on: {new Date(submission.submittedAt).toLocaleString()}</p>
          {submission.feedback && (
            <div className="bg-white rounded p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Feedback:</p>
              <p className="text-gray-700">{submission.feedback}</p>
            </div>
          )}
          {submission.grade !== undefined && (
            <p className="text-lg font-bold text-gray-900">
              Grade: {submission.grade}/{submission.maxGrade}
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}
