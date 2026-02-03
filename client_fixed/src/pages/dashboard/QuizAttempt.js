"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, CheckCircle } from "lucide-react"
import { quizApi } from "../../api/quizApi"
import { toast } from "react-toastify"
import sessionManager from "../../utils/sessionManager" // Declare sessionManager variable

export default function QuizAttempt() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await quizApi.getQuiz(quizId)
        setQuiz(response.data.data.quiz)
        setSubmission(response.data.data.submission)

        // Try to restore from localStorage first
        const savedState = localStorage.getItem(`quiz-${quizId}`)
        if (savedState) {
          const { questionIndex } = JSON.parse(savedState)
          setCurrentQuestionIndex(questionIndex)
        }

        // Update session
        sessionManager.updateCurrentPage(`/user/quizzes/${quizId}`, {
          quizId,
          submissionId: response.data.data.submission._id,
        })
      } catch (error) {
        toast.error("Failed to load quiz")
      } finally {
        setLoading(false)
      }
    }

    loadQuiz()
  }, [quizId])

  // Save state to localStorage on every change
  useEffect(() => {
    if (quiz && submission) {
      localStorage.setItem(
        `quiz-${quizId}`,
        JSON.stringify({
          questionIndex: currentQuestionIndex,
          submissionId: submission._id,
          answers: submission.answers,
        }),
      )
    }
  }, [currentQuestionIndex, submission, quizId])

  // Timer
  useEffect(() => {
    if (!quiz || submission?.submitted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null) {
          const dueDate = new Date(quiz.dueAt)
          return Math.max(0, Math.floor((dueDate - new Date()) / 1000))
        }
        return Math.max(0, prev - 1)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz, submission])

  const handleAnswerChange = async (answer) => {
    const updatedSubmission = { ...submission }
    const question = quiz.questions[currentQuestionIndex]

    const answerIndex = updatedSubmission.answers.findIndex((a) => a.questionId === question._id)

    if (answerIndex >= 0) {
      updatedSubmission.answers[answerIndex].answer = answer
    } else {
      updatedSubmission.answers.push({
        questionId: question._id,
        answer,
      })
    }

    setSubmission(updatedSubmission)

    // Auto-save answer
    try {
      await quizApi.saveAnswer(submission._id, question._id, answer)
    } catch (error) {
      console.error("Failed to save answer")
    }
  }

  const handleSubmitQuiz = async () => {
    if (!window.confirm("Are you sure you want to submit the quiz?")) return

    setSubmitting(true)
    try {
      const response = await quizApi.submitQuiz(submission._id)
      toast.success("Quiz submitted successfully!")
      localStorage.removeItem(`quiz-${quizId}`)
      navigate(`/user/quiz-results/${response.data.data._id}`)
    } catch (error) {
      toast.error("Failed to submit quiz")
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

  if (!quiz || !submission) {
    return <div className="text-center py-12">Quiz not found</div>
  }

  if (submission.submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-8 text-center border-2 border-green-500"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your score: {submission.percentage}% ({submission.score}/{submission.totalPoints} points)
          </p>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const currentAnswer = submission.answers.find((a) => a.questionId === currentQuestion._id)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <Clock className="w-5 h-5" />
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 mb-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentQuestion.prompt}</h2>

        {/* Options */}
        {(currentQuestion.type === "single" || currentQuestion.type === "multiple") && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors"
              >
                <input
                  type={currentQuestion.type === "single" ? "radio" : "checkbox"}
                  name={`question-${currentQuestion._id}`}
                  value={option.text}
                  checked={
                    currentQuestion.type === "single"
                      ? currentAnswer?.answer === option.text
                      : currentAnswer?.answer?.includes(option.text)
                  }
                  onChange={(e) => {
                    if (currentQuestion.type === "single") {
                      handleAnswerChange(e.target.value)
                    } else {
                      const newAnswers = currentAnswer?.answer || []
                      if (e.target.checked) {
                        handleAnswerChange([...newAnswers, e.target.value])
                      } else {
                        handleAnswerChange(newAnswers.filter((a) => a !== e.target.value))
                      }
                    }
                  }}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-gray-900">{option.text}</span>
              </label>
            ))}
          </div>
        )}

        {/* Fill-up */}
        {currentQuestion.type === "fill" && (
          <input
            type="text"
            value={currentAnswer?.answer || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your answer"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
          />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                index === currentQuestionIndex
                  ? "bg-purple-600 text-white"
                  : submission.answers.some((a) => a.questionId === quiz.questions[index]._id)
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
