"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { quizApi } from "../../api/quizApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Clock, CheckCircle, AlertCircle, ArrowLeft, Play, FileQuestion } from "lucide-react"

export default function UserQuizzes() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [answers, setAnswers] = useState({}) // Local state for UI feedback
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadQuizzes()
  }, [courseId])

  const loadQuizzes = async () => {
    try {
      setLoading(true)
      const res = await quizApi.getUserQuizzes(courseId)
      let fetchedQuizzes = res.data.data || res.data || []
      
      // If we are in the global 'Quiz History' view (no specific course), only show submitted quizzes
      if (!courseId) {
        fetchedQuizzes = fetchedQuizzes.filter(q => q.submission)
      }
      setQuizzes(fetchedQuizzes)
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Failed to load quizzes")
    } finally {
      setLoading(false)
    }
  }

  const startQuiz = async (quiz) => {
    try {
      const res = await quizApi.getQuiz(quiz._id)
      const { quiz: quizData, submission: submissionData } = res.data.data

      setSelectedQuiz(quizData)
      setSubmission(submissionData)

      // Initialize answers from existing submission if any
      const initialAnswers = {}
      if (submissionData.answers) {
        submissionData.answers.forEach(a => {
          initialAnswers[a.questionId] = a.answer
        })
      }
      setAnswers(initialAnswers)

    } catch (error) {
      console.error(error)
      toast.error("Failed to load quiz")
    }
  }

  const handleAnswerChange = async (questionId, answer) => {
    // Update local state immediately
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))

    // Save to backend
    if (submission) {
      try {
        await quizApi.saveAnswer(submission._id, questionId, answer)
      } catch (error) {
        console.error("Failed to save answer", error)
      }
    }
  }

  const submitQuiz = async () => {
    if (!submission) return
    try {
      setSubmitting(true)
      await quizApi.submitQuiz(submission._id)
      toast.success("Quiz submitted successfully!")
      setSelectedQuiz(null)
      setSubmission(null)
      loadQuizzes() // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit quiz")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Quiz Taking View
  if (selectedQuiz) {
    return (
      <div className="min-h-screen p-6 text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors">
        <ToastContainer position="bottom-right" theme="colored" />
        <button
          onClick={() => setSelectedQuiz(null)}
          className="mb-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={20} /> Back to Quizzes
        </button>

        <div className="max-w-4xl mx-auto bg-[var(--card-bg)] rounded-2xl shadow-xl p-8 border border-[var(--card-border)]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">{selectedQuiz.title}</h1>
            <p className="text-[var(--text-secondary)]">{selectedQuiz.description}</p>
          </div>

          <div className="space-y-8">
            {selectedQuiz.questions.map((question, idx) => (
              <div key={question._id} className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--card-border)]">
                <h3 className="text-lg font-semibold mb-4 flex gap-3 text-[var(--text-primary)]">
                  <span className="text-purple-600">{idx + 1}.</span>
                  {question.questionText || question.question}
                </h3>

                {question.type === "fillup" ? (
                  <input
                    type="text"
                    value={answers[question._id] || ""}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Type your answer here..."
                  />
                ) : (
                  <div className="space-y-3">
                    {question.options.map((option, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${answers[question._id] === option
                          ? "bg-purple-600/10 border-purple-500 border"
                          : "bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:bg-[var(--bg-primary)]"
                          }`}
                      >
                        <input
                          type="radio" // Using radio for both mcq and multiple for now to ensure consistency
                          name={`question-${question._id}`}
                          value={option}
                          checked={answers[question._id] === option}
                          onChange={() => handleAnswerChange(question._id, option)}
                          className="w-5 h-5 text-purple-600 focus:ring-purple-500 bg-gray-900 border-gray-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              onClick={submitQuiz}
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
              {!submitting && <CheckCircle size={20} />}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz List View
  return (
    <div className="p-6 md:p-10 min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors">
      <ToastContainer position="bottom-right" theme="colored" />

      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate('/user')} // Navigate back to courses
          className="mb-4 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={20} /> Back to Courses
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileQuestion className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{courseId ? "Course Quizzes" : "Quiz History"}</h1>
            <p className="text-[var(--text-secondary)]">{courseId ? "Test your knowledge" : "Review your previous quiz scores"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {quizzes.length === 0 ? (
          <div className="bg-[var(--card-bg)] rounded-2xl p-12 text-center border border-[var(--card-border)] transition-colors">
            <FileQuestion className="w-16 h-16 text-[var(--text-secondary)] opacity-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No quizzes available</h3>
            <p className="text-[var(--text-secondary)]">There are no quizzes for this course yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--card-border)] shadow-lg hover:border-purple-500/50 transition-all group">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-purple-600 transition-colors">{quiz.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2">{quiz.description}</p>
                </div>

                <div className="flex items-center gap-4 mb-6 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{quiz.questions?.length || 0} Questions</span>
                  </div>
                  {quiz.submission && (
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <CheckCircle size={16} />
                      <span>{quiz.submission.percentage}% Score</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${quiz.submission
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25"
                    }`}
                >
                  {quiz.submission ? "Retake Quiz" : "Start Quiz"}
                  {!quiz.submission && <Play size={16} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
