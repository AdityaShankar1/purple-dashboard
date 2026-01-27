// // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // import axios from "../../api/axiosConfig";
// // // // // // // // // // import { toast } from "react-toastify";

// // // // // // // // // // export default function UserQuizzes() {
// // // // // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [answers, setAnswers] = useState({});
// // // // // // // // // //   const [showResults, setShowResults] = useState(false);
// // // // // // // // // //   const [score, setScore] = useState(0);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     fetchQuizzes();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const fetchQuizzes = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await axios.get("/quizzes");
// // // // // // // // // //       setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       toast.error("Failed to load quizzes");
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const quiz = quizzes[0]; // simplified since index isn't changing

// // // // // // // // // //   const handleAnswerSelect = (questionIndex, optionIndex) => {
// // // // // // // // // //     setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
// // // // // // // // // //   };

// // // // // // // // // //   const calculateScore = () => {
// // // // // // // // // //     let correct = 0;
// // // // // // // // // //     quiz.questions.forEach((q, i) => {
// // // // // // // // // //       if (answers[i] === q.correctAnswerIndex) correct++;
// // // // // // // // // //     });
// // // // // // // // // //     setScore(correct);
// // // // // // // // // //     setShowResults(true);
// // // // // // // // // //   };

// // // // // // // // // //   const resetQuiz = () => {
// // // // // // // // // //     setAnswers({});
// // // // // // // // // //     setShowResults(false);
// // // // // // // // // //     setScore(0);
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) return <p className="p-6 text-purple-300">Loading quizzes...</p>;
// // // // // // // // // //   if (quizzes.length === 0) return <p className="p-6 text-purple-300">No quizzes available.</p>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen text-purple-100 max-w-3xl mx-auto">
// // // // // // // // // //       <h1 className="text-3xl font-bold mb-6">Take Quiz: {quiz.title}</h1>

// // // // // // // // // //       {!showResults ? (
// // // // // // // // // //         <div>
// // // // // // // // // //           {quiz.questions.map((q, i) => (
// // // // // // // // // //             <div key={i} className="mb-6 border-b border-purple-500/30 pb-4">
// // // // // // // // // //               <p className="mb-2 font-semibold text-purple-200">
// // // // // // // // // //                 {i + 1}. {q.question}
// // // // // // // // // //               </p>
// // // // // // // // // //               <div className="space-y-2">
// // // // // // // // // //                 {q.options.map((opt, idx) => (
// // // // // // // // // //                   <label
// // // // // // // // // //                     key={idx}
// // // // // // // // // //                     className="flex items-center space-x-2 cursor-pointer text-purple-100"
// // // // // // // // // //                   >
// // // // // // // // // //                     <input
// // // // // // // // // //                       type="radio"
// // // // // // // // // //                       name={`question-${i}`}
// // // // // // // // // //                       checked={answers[i] === idx}
// // // // // // // // // //                       onChange={() => handleAnswerSelect(i, idx)}
// // // // // // // // // //                       className="accent-purple-500"
// // // // // // // // // //                     />
// // // // // // // // // //                     <span>{opt}</span>
// // // // // // // // // //                   </label>
// // // // // // // // // //                 ))}
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}

// // // // // // // // // //           <button
// // // // // // // // // //             onClick={calculateScore}
// // // // // // // // // //             disabled={Object.keys(answers).length !== quiz.questions.length}
// // // // // // // // // //             className={`px-4 py-2 rounded font-medium transition-colors ${
// // // // // // // // // //               Object.keys(answers).length === quiz.questions.length
// // // // // // // // // //                 ? "bg-purple-600 hover:bg-purple-700 text-white"
// // // // // // // // // //                 : "bg-gray-600 cursor-not-allowed text-purple-300"
// // // // // // // // // //             }`}
// // // // // // // // // //           >
// // // // // // // // // //             Submit Quiz
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       ) : (
// // // // // // // // // //         <div className="text-purple-100">
// // // // // // // // // //           <h2 className="text-2xl font-bold mb-4">
// // // // // // // // // //             Your Score: {score} / {quiz.questions.length}
// // // // // // // // // //           </h2>
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={resetQuiz}
// // // // // // // // // //             className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
// // // // // // // // // //           >
// // // // // // // // // //             Retake Quiz
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }





// // // // // // // // // "use client";

// // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // import axios from "../../api/axiosConfig";
// // // // // // // // // import { toast } from "react-toastify";

// // // // // // // // // export default function UserQuizzes() {
// // // // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [answers, setAnswers] = useState({});
// // // // // // // // //   const [showResults, setShowResults] = useState(false);
// // // // // // // // //   const [score, setScore] = useState(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchQuizzes();
// // // // // // // // //   }, []);

// // // // // // // // //   const fetchQuizzes = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.get("/quizzes");
// // // // // // // // //       setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       toast.error("Failed to load quizzes");
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const quiz = quizzes[0];

// // // // // // // // //   const handleAnswerSelect = (questionIndex, optionIndex) => {
// // // // // // // // //     setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
// // // // // // // // //   };

// // // // // // // // //   const calculateScore = () => {
// // // // // // // // //     let correct = 0;
// // // // // // // // //     quiz.questions.forEach((q, i) => {
// // // // // // // // //       if (answers[i] === q.correctAnswerIndex) correct++;
// // // // // // // // //     });
// // // // // // // // //     setScore(correct);
// // // // // // // // //     setShowResults(true);
// // // // // // // // //   };

// // // // // // // // //   const resetQuiz = () => {
// // // // // // // // //     setAnswers({});
// // // // // // // // //     setShowResults(false);
// // // // // // // // //     setScore(0);
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <p className="p-6 text-purple-300">Loading quizzes...</p>;
// // // // // // // // //   if (quizzes.length === 0) return <p className="p-6 text-purple-300">No quizzes available.</p>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-6 text-purple-100 max-w-3xl mx-auto space-y-6">
// // // // // // // // //       <h1 className="text-3xl font-bold">Take Quiz: {quiz.title}</h1>

// // // // // // // // //       {!showResults ? (
// // // // // // // // //         <div className="space-y-6">
// // // // // // // // //           {quiz.questions.map((q, i) => (
// // // // // // // // //             <div key={i} className="border-b border-purple-500/30 pb-4">
// // // // // // // // //               <p className="mb-2 font-semibold text-purple-200">
// // // // // // // // //                 {i + 1}. {q.question}
// // // // // // // // //               </p>
// // // // // // // // //               <div className="space-y-2">
// // // // // // // // //                 {q.options.map((opt, idx) => (
// // // // // // // // //                   <label
// // // // // // // // //                     key={idx}
// // // // // // // // //                     className="flex items-center space-x-2 cursor-pointer text-purple-100"
// // // // // // // // //                   >
// // // // // // // // //                     <input
// // // // // // // // //                       type="radio"
// // // // // // // // //                       name={`question-${i}`}
// // // // // // // // //                       checked={answers[i] === idx}
// // // // // // // // //                       onChange={() => handleAnswerSelect(i, idx)}
// // // // // // // // //                       className="accent-purple-500"
// // // // // // // // //                     />
// // // // // // // // //                     <span>{opt}</span>
// // // // // // // // //                   </label>
// // // // // // // // //                 ))}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}

// // // // // // // // //           <button
// // // // // // // // //             onClick={calculateScore}
// // // // // // // // //             disabled={Object.keys(answers).length !== quiz.questions.length}
// // // // // // // // //             className={`px-4 py-2 rounded font-medium transition-colors ${
// // // // // // // // //               Object.keys(answers).length === quiz.questions.length
// // // // // // // // //                 ? "bg-purple-600 hover:bg-purple-700 text-white"
// // // // // // // // //                 : "bg-gray-600 cursor-not-allowed text-purple-300"
// // // // // // // // //             }`}
// // // // // // // // //           >
// // // // // // // // //             Submit Quiz
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       ) : (
// // // // // // // // //         <div className="text-purple-100 space-y-4">
// // // // // // // // //           <h2 className="text-2xl font-bold">
// // // // // // // // //             Your Score: {score} / {quiz.questions.length}
// // // // // // // // //           </h2>
// // // // // // // // //           <button
// // // // // // // // //             onClick={resetQuiz}
// // // // // // // // //             className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
// // // // // // // // //           >
// // // // // // // // //             Retake Quiz
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }






// // // // // // // // // client/src/pages/dashboard/UserQuizzes.js
// // // // // // // // "use client";
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { toast } from "react-toastify";

// // // // // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // // // // export default function UserQuizzes({ userId, courseId }) {
// // // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // // //   const [answers, setAnswers] = useState({}); // { quizId: { questionIndex: selectedIndex } }

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchQuizzes = async () => {
// // // // // // // //       try {
// // // // // // // //         const res = await axios.get(`${API}/quizzes/visible?courseId=${courseId}`);
// // // // // // // //         setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // // // //       } catch (err) {
// // // // // // // //         toast.error("Failed to load quizzes ❌");
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchQuizzes();
// // // // // // // //   }, [courseId]);

// // // // // // // //   const handleSelect = (quizId, questionIndex, selectedIndex) => {
// // // // // // // //     setAnswers((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [quizId]: {
// // // // // // // //         ...prev[quizId],
// // // // // // // //         [questionIndex]: selectedIndex,
// // // // // // // //       },
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async (quizId) => {
// // // // // // // //     const payload = {
// // // // // // // //       quizId,
// // // // // // // //       userId,
// // // // // // // //       answers: Object.entries(answers[quizId] || {}).map(([questionIndex, selectedIndex]) => ({
// // // // // // // //         questionIndex: parseInt(questionIndex),
// // // // // // // //         selectedIndex,
// // // // // // // //       })),
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       await axios.post(`${API}/quizzes/submit`, payload);
// // // // // // // //       toast.success("Quiz submitted ✅");
// // // // // // // //     } catch (err) {
// // // // // // // //       toast.error("Submission failed ❌");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="w-full h-full py-6 px-4 md:px-6 space-y-6 bg-gray-50 text-gray-900">
// // // // // // // //       {quizzes.map((quiz) => (
// // // // // // // //         <div key={quiz._id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
// // // // // // // //           <div className="text-xl font-semibold">{quiz.title}</div>
// // // // // // // //           <div className="text-sm text-gray-600">{quiz.description}</div>

// // // // // // // //           {quiz.questions.map((q, qi) => (
// // // // // // // //             <div key={qi} className="space-y-2">
// // // // // // // //               <div className="font-medium">{`Q${qi + 1}: ${q.text}`}</div>
// // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // // // //                 {q.options.map((opt, oi) => (
// // // // // // // //                   <label key={oi} className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
// // // // // // // //                     <input
// // // // // // // //                       type="radio"
// // // // // // // //                       name={`quiz-${quiz._id}-q-${qi}`}
// // // // // // // //                       checked={answers[quiz._id]?.[qi] === oi}
// // // // // // // //                       onChange={() => handleSelect(quiz._id, qi, oi)}
// // // // // // // //                       className="accent-teal-600"
// // // // // // // //                     />
// // // // // // // //                     <span>{opt}</span>
// // // // // // // //                   </label>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}

// // // // // // // //           <button
// // // // // // // //             onClick={() => handleSubmit(quiz._id)}
// // // // // // // //             className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
// // // // // // // //           >
// // // // // // // //             Submit Quiz
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       ))}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }













// // // // // // // // // client/src/pages/dashboard/UserQuizzes.js

// // // // // // // // "use client";
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { toast } from "react-toastify";
// // // // // // // // import { Play } from "lucide-react"; // Assuming you have an icon for an empty state

// // // // // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // // // // export default function UserQuizzes({ userId, courseId }) {
// // // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [errorMessage, setErrorMessage] = useState(null);
// // // // // // // //   const [answers, setAnswers] = useState({}); // { quizId: { questionIndex: selectedIndex } }

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchQuizzes = async () => {
// // // // // // // //       setLoading(true);
// // // // // // // //       setErrorMessage(null); // Clear previous error
// // // // // // // //       try {
// // // // // // // //         // The API call uses the courseId passed from the parent component
// // // // // // // //         const res = await axios.get(`${API}/quizzes/visible?courseId=${courseId}`);
// // // // // // // //         setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // // // //       } catch (err) {
// // // // // // // //         // ✅ FIX: Check for specific HTTP errors
// // // // // // // //         if (err.response && (err.response.status === 403 || err.response.status === 404)) {
// // // // // // // //           // If 403 (Not Enrolled) or 404 (Course/Quiz not found)
// // // // // // // //           setErrorMessage(
// // // // // // // //             err.response.data?.message || "You are not enrolled in this course or the course was not found."
// // // // // // // //           );
// // // // // // // //         } else {
// // // // // // // //           // Generic failure (network, server crash, etc.)
// // // // // // // //           setErrorMessage("Failed to load quizzes due to a server error.");
// // // // // // // //           toast.error("Failed to load quizzes ❌");
// // // // // // // //         }
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     if (courseId) {
// // // // // // // //         fetchQuizzes();
// // // // // // // //     } else {
// // // // // // // //         setLoading(false);
// // // // // // // //         setErrorMessage("No course ID provided to fetch quizzes.");
// // // // // // // //     }
// // // // // // // //   }, [courseId]);

// // // // // // // //   const handleSelect = (quizId, questionIndex, selectedIndex) => {
// // // // // // // //     setAnswers((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [quizId]: {
// // // // // // // //         ...prev[quizId],
// // // // // // // //         [questionIndex]: selectedIndex,
// // // // // // // //       },
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async (quizId) => {
// // // // // // // //     // You should ensure the user is logged in (userId is present) before submitting
// // // // // // // //     if (!userId) {
// // // // // // // //         toast.error("User authentication failed. Please log in.");
// // // // // // // //         return;
// // // // // // // //     }

// // // // // // // //     const payload = {
// // // // // // // //       quizId,
// // // // // // // //       userId,
// // // // // // // //       // You should send a more complete answer structure for fill-in-the-blank too,
// // // // // // // //       // but sticking to your current structure for now:
// // // // // // // //       answers: Object.entries(answers[quizId] || {}).map(([questionIndex, selectedIndex]) => ({
// // // // // // // //         questionIndex: parseInt(questionIndex),
// // // // // // // //         selectedIndex,
// // // // // // // //       })),
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       // You may need to update this route to include quizId in the path if the server expects it
// // // // // // // //       await axios.post(`${API}/quizzes/submit`, payload); 
// // // // // // // //       toast.success("Quiz submitted ✅");
// // // // // // // //     } catch (err) {
// // // // // // // //       toast.error(err.response?.data?.message || "Submission failed ❌");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="flex items-center justify-center h-48">
// // // // // // // //         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (errorMessage) {
// // // // // // // //     return (
// // // // // // // //       <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
// // // // // // // //         <p className="font-bold">Access Denied</p>
// // // // // // // //         <p>{errorMessage}</p>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (quizzes.length === 0) {
// // // // // // // //     return (
// // // // // // // //       <div className="text-center py-12">
// // // // // // // //           <Play size={48} className="text-gray-400 mx-auto mb-4" />
// // // // // // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // // // // // //             No active quizzes found
// // // // // // // //           </h3>
// // // // // // // //           <p className="text-gray-500">
// // // // // // // //             Check back later for new assessments or ensure you are enrolled in the course.
// // // // // // // //           </p>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="w-full h-full py-6 px-4 md:px-6 space-y-6 bg-gray-50 text-gray-900">
// // // // // // // //       {quizzes.map((quiz) => (
// // // // // // // //         <div key={quiz._id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
// // // // // // // //           <div className="text-xl font-semibold">{quiz.title}</div>
// // // // // // // //           <div className="text-sm text-gray-600">{quiz.description}</div>

// // // // // // // //           {quiz.questions.map((q, qi) => (
// // // // // // // //             <div key={qi} className="space-y-2">
// // // // // // // //               <div className="font-medium">{`Q${qi + 1}: ${q.text}`}</div>
// // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // // // //                 {/* Assuming all quizzes here are single-choice MCQs based on your handleSubmit logic */}
// // // // // // // //                 {q.options.map((opt, oi) => (
// // // // // // // //                   <label key={oi} className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
// // // // // // // //                     <input
// // // // // // // //                       type="radio"
// // // // // // // //                       name={`quiz-${quiz._id}-q-${qi}`}
// // // // // // // //                       checked={answers[quiz._id]?.[qi] === oi}
// // // // // // // //                       onChange={() => handleSelect(quiz._id, qi, oi)}
// // // // // // // //                       className="accent-teal-600"
// // // // // // // //                     />
// // // // // // // //                     <span>{opt}</span>
// // // // // // // //                   </label>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}

// // // // // // // //           <button
// // // // // // // //             onClick={() => handleSubmit(quiz._id)}
// // // // // // // //             className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
// // // // // // // //           >
// // // // // // // //             Submit Quiz
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       ))}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }









// // // // // // // // client/src/pages/dashboard/UserQuizzes.js

// // // // // // // "use client";
// // // // // // // import React, { useEffect, useState, useMemo } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { toast } from "react-toastify";
// // // // // // // import { Play } from "lucide-react"; 
// // // // // // // import dayjs from 'dayjs'; 

// // // // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // // // export default function UserQuizzes({ userId, courseId }) {
// // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [errorMessage, setErrorMessage] = useState(null);
  
// // // // // // //   // State structure for answers:
// // // // // // //   const [answers, setAnswers] = useState({}); 

// // // // // // //   // Use a memoized axios instance to reuse the configuration
// // // // // // //   const axiosInstance = useMemo(() => {
// // // // // // //     return axios.create({
// // // // // // //       baseURL: API,
// // // // // // //       headers: {
// // // // // // //         "Content-Type": "application/json",
// // // // // // //         Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is used for authentication
// // // // // // //       },
// // // // // // //       withCredentials: true,
// // // // // // //     });
// // // // // // //   }, []);

// // // // // // //   // --- Quiz Fetching Logic ---
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchQuizzes = async () => {
// // // // // // //       setLoading(true);
// // // // // // //       setErrorMessage(null);
// // // // // // //       try {
// // // // // // //         // This GET request relies on the BACKEND to:
// // // // // // //         // 1. Verify the user (via token) is enrolled in the course linked by courseId.
// // // // // // //         // 2. Return only active quizzes added by the admin for that course.
// // // // // // //         const res = await axiosInstance.get(`/quizzes/visible?courseId=${courseId}`);
// // // // // // //         setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // // //       } catch (err) {
// // // // // // //         const message = err.response?.data?.message;
// // // // // // //         if (err.response && (err.response.status === 403 || err.response.status === 404)) {
// // // // // // //           setErrorMessage(
// // // // // // //             message || "You are not enrolled in this course or the course was not found."
// // // // // // //           );
// // // // // // //         } else {
// // // // // // //           setErrorMessage("Failed to load quizzes due to a server error.");
// // // // // // //           toast.error(message || "Failed to load quizzes ❌");
// // // // // // //         }
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     if (courseId) {
// // // // // // //         fetchQuizzes();
// // // // // // //     } else {
// // // // // // //         setLoading(false);
// // // // // // //         setErrorMessage("No course ID provided to fetch quizzes.");
// // // // // // //     }
// // // // // // //   }, [courseId, axiosInstance]);


// // // // // // //   // --- Answer Handling Logic ---
// // // // // // //   const handleAnswerChange = (quizId, questionIndex, questionType, value) => {
// // // // // // //     setAnswers((prev) => {
// // // // // // //       const currentQuizAnswers = prev[quizId] || {};
// // // // // // //       let newAnswer = { type: questionType };

// // // // // // //       if (questionType === 'single') {
// // // // // // //         newAnswer.answer = value; 
// // // // // // //       } else if (questionType === 'multiple') {
// // // // // // //         const currentIndices = currentQuizAnswers[questionIndex]?.answer || [];
// // // // // // //         const index = value;
        
// // // // // // //         if (currentIndices.includes(index)) {
// // // // // // //           newAnswer.answer = currentIndices.filter(i => i !== index);
// // // // // // //         } else {
// // // // // // //           newAnswer.answer = [...currentIndices, index];
// // // // // // //         }
// // // // // // //       } else if (questionType === 'fill') {
// // // // // // //         newAnswer.answer = value;
// // // // // // //       }

// // // // // // //       return {
// // // // // // //         ...prev,
// // // // // // //         [quizId]: {
// // // // // // //           ...currentQuizAnswers,
// // // // // // //           [questionIndex]: newAnswer,
// // // // // // //         },
// // // // // // //       };
// // // // // // //     });
// // // // // // //   };

// // // // // // //   // --- Quiz Submission Logic ---
// // // // // // //   const handleSubmit = async (quizId) => {
// // // // // // //     if (!userId) {
// // // // // // //         toast.error("User authentication failed. Please log in.");
// // // // // // //         return;
// // // // // // //     }

// // // // // // //     const quizAnswers = answers[quizId] || {};
    
// // // // // // //     // Transform the answers state into the backend-expected payload format
// // // // // // //     const submissionAnswers = Object.entries(quizAnswers).map(([qIndex, qData]) => {
// // // // // // //       const questionIndex = parseInt(qIndex);
// // // // // // //       const payload = { questionIndex };

// // // // // // //       if (qData.type === 'single') {
// // // // // // //         payload.selectedIndex = qData.answer;
// // // // // // //       } else if (qData.type === 'multiple') {
// // // // // // //         payload.selectedIndices = qData.answer;
// // // // // // //       } else if (qData.type === 'fill') {
// // // // // // //         payload.answerText = qData.answer;
// // // // // // //       }
// // // // // // //       return payload;
// // // // // // //     }).filter(a => a.selectedIndex !== undefined || a.selectedIndices?.length > 0 || (a.answerText && a.answerText.trim() !== ''));

// // // // // // //     if (submissionAnswers.length === 0) {
// // // // // // //         toast.error("Please answer at least one question before submitting.");
// // // // // // //         return;
// // // // // // //     }

// // // // // // //     const payload = {
// // // // // // //       quizId,
// // // // // // //       answers: submissionAnswers,
// // // // // // //     };
    
// // // // // // //     try {
// // // // // // //       // POST /api/quizzes/submit
// // // // // // //       await axiosInstance.post(`/quizzes/submit`, payload); 
// // // // // // //       toast.success("Quiz submitted successfully! ✅");
      
// // // // // // //       // Remove the submitted quiz from the visible list
// // // // // // //       setQuizzes(prev => prev.filter(q => q._id !== quizId));
// // // // // // //       setAnswers(prev => {
// // // // // // //         const {[quizId]: removed, ...rest} = prev;
// // // // // // //         return rest;
// // // // // // //       });
      
// // // // // // //     } catch (err) {
// // // // // // //       toast.error(err.response?.data?.message || "Submission failed ❌");
// // // // // // //     }
// // // // // // //   };
  
// // // // // // //   // --- RENDERING ---

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center h-48">
// // // // // // //         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (errorMessage) {
// // // // // // //     return (
// // // // // // //       <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
// // // // // // //         <p className="font-bold">Access Denied</p>
// // // // // // //         <p>{errorMessage}</p>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (quizzes.length === 0) {
// // // // // // //     return (
// // // // // // //       <div className="text-center py-12">
// // // // // // //           <Play size={48} className="text-gray-400 mx-auto mb-4" />
// // // // // // //           <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // // // // //             No active quizzes found
// // // // // // //           </h3>
// // // // // // //           <p className="text-gray-500">
// // // // // // //             All quizzes completed or no active assessments available for this course.
// // // // // // //           </p>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="w-full h-full py-6 px-4 md:px-6 space-y-6 bg-gray-50 text-gray-900">
// // // // // // //       <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
// // // // // // //       {quizzes.map((quiz) => (
// // // // // // //         <div key={quiz._id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-md space-y-4">
// // // // // // //           <div className="text-2xl font-bold text-teal-700">{quiz.title}</div>
// // // // // // //           <div className="text-sm text-gray-600 border-b pb-3 mb-3">
// // // // // // //               <p>{quiz.description}</p>
// // // // // // //               <p className="mt-2 text-xs">
// // // // // // //                   **Due:** {dayjs(quiz.dueAt).format("DD MMM YYYY, h:mm A")}
// // // // // // //               </p>
// // // // // // //           </div>

// // // // // // //           {/* Quiz Questions */}
// // // // // // //           {quiz.questions.map((q, qi) => {
// // // // // // //             const currentAnswer = answers[quiz._id]?.[qi]?.answer;
// // // // // // //             const isMultipleChecked = (optionIndex) => 
// // // // // // //                 q.type === 'multiple' && Array.isArray(currentAnswer) && currentAnswer.includes(optionIndex);
            
// // // // // // //             return (
// // // // // // //                 <div key={qi} className="space-y-3 bg-gray-50 p-4 rounded border border-gray-100">
// // // // // // //                     <div className="font-medium text-gray-800">{`Q${qi + 1} (${q.type}): ${q.text}`}</div>
                    
// // // // // // //                     {/* Single Choice */}
// // // // // // //                     {q.type === 'single' && (
// // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // // //                             {q.options.map((opt, oi) => (
// // // // // // //                                 <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // // // //                                     <input
// // // // // // //                                         type="radio"
// // // // // // //                                         name={`quiz-${quiz._id}-q-${qi}`}
// // // // // // //                                         checked={currentAnswer === oi}
// // // // // // //                                         onChange={() => handleAnswerChange(quiz._id, qi, 'single', oi)}
// // // // // // //                                         className="accent-teal-600"
// // // // // // //                                     />
// // // // // // //                                     <span className="text-sm">{opt}</span>
// // // // // // //                                 </label>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* Multiple Choice */}
// // // // // // //                     {q.type === 'multiple' && (
// // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // // //                             {q.options.map((opt, oi) => (
// // // // // // //                                 <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // // // //                                     <input
// // // // // // //                                         type="checkbox"
// // // // // // //                                         name={`quiz-${quiz._id}-q-${qi}`}
// // // // // // //                                         checked={isMultipleChecked(oi)}
// // // // // // //                                         onChange={() => handleAnswerChange(quiz._id, qi, 'multiple', oi)}
// // // // // // //                                         className="accent-teal-600"
// // // // // // //                                     />
// // // // // // //                                     <span className="text-sm">{opt}</span>
// // // // // // //                                 </label>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* Fill-in-the-Blank */}
// // // // // // //                     {q.type === 'fill' && (
// // // // // // //                         <input
// // // // // // //                             type="text"
// // // // // // //                             value={currentAnswer || ''}
// // // // // // //                             onChange={(e) => handleAnswerChange(quiz._id, qi, 'fill', e.target.value)}
// // // // // // //                             placeholder="Enter your answer here"
// // // // // // //                             className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
// // // // // // //                         />
// // // // // // //                     )}
// // // // // // //                 </div>
// // // // // // //             )
// // // // // // //           })}

// // // // // // //           <button
// // // // // // //             onClick={() => handleSubmit(quiz._id)}
// // // // // // //             className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded transition"
// // // // // // //           >
// // // // // // //             Submit Quiz
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }












// // // // // // "use client";
// // // // // // import React, { useEffect, useState, useMemo } from "react";
// // // // // // import axios from "axios";
// // // // // // import { toast } from "react-toastify";
// // // // // // import { Play } from "lucide-react";
// // // // // // import dayjs from "dayjs";

// // // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // // export default function UserQuizzes({ userId, courseId }) {
// // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [errorMessage, setErrorMessage] = useState(null);
// // // // // //   const [answers, setAnswers] = useState({});
// // // // // //   const [activeQuizId, setActiveQuizId] = useState(null);

// // // // // //   const axiosInstance = useMemo(() => {
// // // // // //     return axios.create({
// // // // // //       baseURL: API,
// // // // // //       headers: {
// // // // // //         "Content-Type": "application/json",
// // // // // //         Authorization: `Bearer ${localStorage.getItem("token")}`,
// // // // // //       },
// // // // // //       withCredentials: true,
// // // // // //     });
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const fetchQuizzes = async () => {
// // // // // //       setLoading(true);
// // // // // //       setErrorMessage(null);
// // // // // //       try {
// // // // // //         const res = await axiosInstance.get(`/quizzes/visible?courseId=${courseId}`);
// // // // // //         setQuizzes(Array.isArray(res.data) ? res.data : []);
// // // // // //       } catch (err) {
// // // // // //         const message = err.response?.data?.message;
// // // // // //         if (err.response && (err.response.status === 403 || err.response.status === 404)) {
// // // // // //           setErrorMessage(message || "You are not enrolled in this course or the course was not found.");
// // // // // //         } else {
// // // // // //           setErrorMessage("Failed to load quizzes due to a server error.");
// // // // // //           toast.error(message || "Failed to load quizzes ❌");
// // // // // //         }
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     if (courseId) {
// // // // // //       fetchQuizzes();
// // // // // //     } else {
// // // // // //       setLoading(false);
// // // // // //       setErrorMessage("Please go to 'Ongoing' courses and select a course to view its quizzes.");
// // // // // //     }
// // // // // //   }, [courseId, axiosInstance]);

// // // // // //   const handleAnswerChange = (quizId, questionIndex, questionType, value) => {
// // // // // //     setAnswers((prev) => {
// // // // // //       const currentQuizAnswers = prev[quizId] || {};
// // // // // //       let newAnswer = { type: questionType };

// // // // // //       if (questionType === "single") {
// // // // // //         newAnswer.answer = value;
// // // // // //       } else if (questionType === "multiple") {
// // // // // //         const currentIndices = currentQuizAnswers[questionIndex]?.answer || [];
// // // // // //         newAnswer.answer = currentIndices.includes(value)
// // // // // //           ? currentIndices.filter((i) => i !== value)
// // // // // //           : [...currentIndices, value];
// // // // // //       } else if (questionType === "fill") {
// // // // // //         newAnswer.answer = value;
// // // // // //       }

// // // // // //       return {
// // // // // //         ...prev,
// // // // // //         [quizId]: {
// // // // // //           ...currentQuizAnswers,
// // // // // //           [questionIndex]: newAnswer,
// // // // // //         },
// // // // // //       };
// // // // // //     });
// // // // // //   };

// // // // // //   const handleSubmit = async (quizId) => {
// // // // // //     const quizAnswers = answers[quizId] || {};
// // // // // //     const submissionAnswers = Object.entries(quizAnswers)
// // // // // //       .map(([qIndex, qData]) => {
// // // // // //         const questionIndex = parseInt(qIndex);
// // // // // //         const payload = { questionIndex };
// // // // // //         if (qData.type === "single") payload.selectedIndex = qData.answer;
// // // // // //         else if (qData.type === "multiple") payload.selectedIndices = qData.answer;
// // // // // //         else if (qData.type === "fill") payload.answerText = qData.answer;
// // // // // //         return payload;
// // // // // //       })
// // // // // //       .filter(
// // // // // //         (a) =>
// // // // // //           a.selectedIndex !== undefined ||
// // // // // //           a.selectedIndices?.length > 0 ||
// // // // // //           (a.answerText && a.answerText.trim() !== "")
// // // // // //       );

// // // // // //     if (submissionAnswers.length === 0) {
// // // // // //       toast.error("Please answer at least one question before submitting.");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       await axiosInstance.post(`/quizzes/submit`, { quizId, answers: submissionAnswers });
// // // // // //       toast.success("Quiz submitted successfully! ✅");
// // // // // //       setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
// // // // // //       setAnswers((prev) => {
// // // // // //         const { [quizId]: removed, ...rest } = prev;
// // // // // //         return rest;
// // // // // //       });
// // // // // //       setActiveQuizId(null);
// // // // // //     } catch (err) {
// // // // // //       toast.error(err.response?.data?.message || "Submission failed ❌");
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex items-center justify-center h-48">
// // // // // //         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (errorMessage) {
// // // // // //     return (
// // // // // //       <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
// // // // // //         <p className="font-bold">Access Denied</p>
// // // // // //         <p>{errorMessage}</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (quizzes.length === 0) {
// // // // // //     return (
// // // // // //       <div className="text-center py-12">
// // // // // //         <Play size={48} className="text-gray-400 mx-auto mb-4" />
// // // // // //         <h3 className="text-lg font-semibold text-gray-400 mb-2">No active quizzes found</h3>
// // // // // //         <p className="text-gray-500">All quizzes completed or no active assessments available for this course.</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="w-full h-full py-6 px-4 md:px-6 space-y-6 bg-gray-50 text-gray-900">
// // // // // //       <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
// // // // // //       {quizzes.map((quiz) => (
// // // // // //         <div key={quiz._id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-md space-y-4">
// // // // // //           <div className="text-xl font-bold text-teal-700">{quiz.title}</div>
// // // // // //           <div className="text-sm text-gray-600">
// // // // // //             <p>Course: <span className="font-semibold">{quiz.courseId}</span></p>
// // // // // //             <p className="mt-1 text-xs">Due: {dayjs(quiz.dueAt).format("DD MMM YYYY, h:mm A")}</p>
// // // // // //           </div>

// // // // // //           {activeQuizId !== quiz._id ? (
// // // // // //             <button
// // // // // //               onClick={() => setActiveQuizId(quiz._id)}
// // // // // //               className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // // // // //             >
// // // // // //               Attend Quiz
// // // // // //             </button>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               {quiz.questions.map((q, qi) => {
// // // // // //                 const currentAnswer = answers[quiz._id]?.[qi]?.answer;
// // // // // //                 const isMultipleChecked = (optionIndex) =>
// // // // // //                   q.type === "multiple" && Array.isArray(currentAnswer) && currentAnswer.includes(optionIndex);

// // // // // //                 return (
// // // // // //                   <div key={qi} className="space-y-3 bg-gray-50 p-4 rounded border border-gray-100">
// // // // // //                     <div className="font-medium text-gray-800">{`Q${qi + 1} (${q.type}): ${q.text}`}</div>

// // // // // //                     {q.type === "single" && (
// // // // // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // //                         {q.options.map((opt, oi) => (
// // // // // //                           <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // // //                             <input
// // // // // //                               type="radio"
// // // // // //                               name={`quiz-${quiz._id}-q-${qi}`}
// // // // // //                               checked={currentAnswer === oi}
// // // // // //                               onChange={() => handleAnswerChange(quiz._id, qi, "single", oi)}
// // // // // //                               className="accent-teal-600"
// // // // // //                             />
// // // // // //                             <span className="text-sm">{opt}</span>
// // // // // //                           </label>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     )}

// // // // // //                     {q.type === "multiple" && (
// // // // // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // //                         {q.options.map((opt, oi) => (
// // // // // //                           <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // // //                             <input
// // // // // //                               type="checkbox"
// // // // // //                               name={`quiz-${quiz._id}-q-${qi}`}
// // // // // //                               checked={isMultipleChecked(oi)}
// // // // // //                               onChange={() => handleAnswerChange(quiz._id, qi, "multiple", oi)}
// // // // // //                               className="accent-teal-600"
// // // // // //                             />
// // // // // //                             <span className="text-sm">{opt}</span>
// // // // // //                           </label>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     )}

// // // // // //                     {q.type === "fill" && (
// // // // // //                                             <input
// // // // // //                         type="text"
// // // // // //                         value={currentAnswer || ""}
// // // // // //                         onChange={(e) => handleAnswerChange(quiz._id, qi, "fill", e.target.value)}
// // // // // //                         placeholder="Enter your answer here"
// // // // // //                         className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
// // // // // //                       />
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 );
// // // // // //               })}

// // // // // //               <button
// // // // // //                 onClick={() => handleSubmit(quiz._id)}
// // // // // //                 className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded transition"
// // // // // //               >
// // // // // //                 Submit Quiz
// // // // // //               </button>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // }







// // // // // import React, { useEffect, useState, useMemo } from "react";
// // // // // import { useParams } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import dayjs from "dayjs";
// // // // // import { toast } from "react-toastify";

// // // // // const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // // // // export default function UserQuizzes() {
// // // // //   const { courseId } = useParams();
// // // // //   const userId = localStorage.getItem("userId");
// // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // //   const [answers, setAnswers] = useState({});
// // // // //   const [activeQuizId, setActiveQuizId] = useState(null);
// // // // //   const [submittedQuizIds, setSubmittedQuizIds] = useState([]);
// // // // //   const [timers, setTimers] = useState({});
// // // // //   const [progress, setProgress] = useState({});
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [errorMessage, setErrorMessage] = useState(null);

// // // // //   const axiosInstance = useMemo(() => {
// // // // //     return axios.create({
// // // // //       baseURL: API,
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         Authorization: `Bearer ${localStorage.getItem("token")}`,
// // // // //       },
// // // // //       withCredentials: true,
// // // // //     });
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const fetchQuizzes = async () => {
// // // // //       try {
// // // // //         const res = await axiosInstance.get(`/quizzes/visible?courseId=${courseId}`);
// // // // //         setQuizzes(res.data || []);
// // // // //       } catch (err) {
// // // // //         setErrorMessage("Please go to 'Ongoing' courses and select a course to view its quizzes.");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     const fetchSubmitted = async () => {
// // // // //       try {
// // // // //         const res = await axiosInstance.get(`/quizzes/status?courseId=${courseId}`);
// // // // //         const submitted = res.data
// // // // //           .filter((entry) => entry.user.id === userId && entry.status === "Completed")
// // // // //           .map((entry) => entry.quizId);
// // // // //         setSubmittedQuizIds(submitted);
// // // // //       } catch (err) {
// // // // //         console.warn("Could not fetch submission status");
// // // // //       }
// // // // //     };

// // // // //     if (courseId) {
// // // // //       fetchQuizzes();
// // // // //       fetchSubmitted();
// // // // //     } else {
// // // // //       setLoading(false);
// // // // //       setErrorMessage("Please go to 'Ongoing' courses and select a course to view its quizzes.");
// // // // //     }
// // // // //   }, [courseId, axiosInstance, userId]);

// // // // //   const handleAnswerChange = (quizId, questionIndex, questionType, value) => {
// // // // //     setAnswers((prev) => {
// // // // //       const currentQuizAnswers = prev[quizId] || {};
// // // // //       let newAnswer = { type: questionType };

// // // // //       if (questionType === "single") {
// // // // //         newAnswer.answer = value;
// // // // //       } else if (questionType === "multiple") {
// // // // //         const currentIndices = currentQuizAnswers[questionIndex]?.answer || [];
// // // // //         newAnswer.answer = currentIndices.includes(value)
// // // // //           ? currentIndices.filter((i) => i !== value)
// // // // //           : [...currentIndices, value];
// // // // //       } else if (questionType === "fill") {
// // // // //         newAnswer.answer = value;
// // // // //       }

// // // // //       const updatedQuizAnswers = {
// // // // //         ...currentQuizAnswers,
// // // // //         [questionIndex]: newAnswer,
// // // // //       };

// // // // //       setProgress((prevProgress) => ({
// // // // //         ...prevProgress,
// // // // //         [quizId]: Object.keys(updatedQuizAnswers).length,
// // // // //       }));

// // // // //       return {
// // // // //         ...prev,
// // // // //         [quizId]: updatedQuizAnswers,
// // // // //       };
// // // // //     });
// // // // //   };

// // // // //   const handleSubmit = async (quizId) => {
// // // // //     const quizAnswers = answers[quizId] || {};
// // // // //     const submissionAnswers = Object.entries(quizAnswers)
// // // // //       .map(([qIndex, qData]) => {
// // // // //         const questionIndex = parseInt(qIndex);
// // // // //         const payload = { questionIndex };
// // // // //         if (qData.type === "single") payload.selectedIndex = qData.answer;
// // // // //         else if (qData.type === "multiple") payload.selectedIndices = qData.answer;
// // // // //         else if (qData.type === "fill") payload.answerText = qData.answer;
// // // // //         return payload;
// // // // //       })
// // // // //       .filter(
// // // // //         (a) =>
// // // // //           a.selectedIndex !== undefined ||
// // // // //           a.selectedIndices?.length > 0 ||
// // // // //           (a.answerText && a.answerText.trim() !== "")
// // // // //       );

// // // // //     if (submissionAnswers.length === 0) {
// // // // //       toast.error("Please answer at least one question before submitting.");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       await axiosInstance.post(`/quizzes/submit`, { quizId, answers: submissionAnswers });
// // // // //       toast.success("Quiz submitted successfully! ✅");
// // // // //       setSubmittedQuizIds((prev) => [...prev, quizId]);
// // // // //       setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
// // // // //       setAnswers((prev) => {
// // // // //         const { [quizId]: removed, ...rest } = prev;
// // // // //         return rest;
// // // // //       });
// // // // //       setActiveQuizId(null);
// // // // //     } catch (err) {
// // // // //       toast.error(err.response?.data?.message || "Submission failed ❌");
// // // // //     }
// // // // //   };

// // // // //   const startTimer = (quizId, dueAt) => {
// // // // //     const endTime = new Date(dueAt).getTime();
// // // // //     const interval = setInterval(() => {
// // // // //       const now = new Date().getTime();
// // // // //       const remaining = endTime - now;
// // // // //       if (remaining <= 0) {
// // // // //         clearInterval(interval);
// // // // //         setTimers((prev) => ({ ...prev, [quizId]: "Time's up!" }));
// // // // //       } else {
// // // // //         const minutes = Math.floor(remaining / 60000);
// // // // //         const seconds = Math.floor((remaining % 60000) / 1000);
// // // // //         setTimers((prev) => ({ ...prev, [quizId]: `${minutes}m ${seconds}s` }));
// // // // //       }
// // // // //     }, 1000);
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <div className="text-center py-12">Loading quizzes...</div>;
// // // // //   }

// // // // //   if (errorMessage) {
// // // // //     return (
// // // // //       <div className="text-center py-12">
// // // // //         <h3 className="text-lg font-semibold text-gray-400 mb-2">Quizzes</h3>
// // // // //         <p className="text-gray-500">{errorMessage}</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="w-full h-full py-6 px-4 md:px-6 space-y-6 bg-gray-50 text-gray-900">
// // // // //       <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
// // // // //       {quizzes.map((quiz) => {
// // // // //         const alreadySubmitted = submittedQuizIds.includes(quiz._id);
// // // // //         const totalQuestions = quiz.questions.length;
// // // // //         const answered = progress[quiz._id] || 0;

// // // // //         return (
// // // // //           <div key={quiz._id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-md space-y-4">
// // // // //             <div className="text-xl font-bold text-teal-700">{quiz.title}</div>
// // // // //             <div className="text-sm text-gray-600">
// // // // //               <p>Course: <span className="font-semibold">{quiz.courseId}</span></p>
// // // // //               <p className="mt-1 text-xs">Due: {dayjs(quiz.dueAt).format("DD MMM YYYY, h:mm A")}</p>
// // // // //               <p className="mt-1 text-xs text-red-500">Time Left: {timers[quiz._id] || "Starting..."}</p>
// // // // //               <p className="mt-1 text-xs text-gray-500">Progress: {answered} of {totalQuestions} answered</p>
// // // // //               {alreadySubmitted && (
// // // // //                 <p className="mt-1 text-xs text-green-600 font-semibold">✅ Already Submitted</p>
// // // // //               )}
// // // // //             </div>

// // // // //             {!alreadySubmitted && activeQuizId !== quiz._id && (
// // // // //               <button
// // // // //                 onClick={() => {
// // // // //                   setActiveQuizId(quiz._id);
// // // // //                   startTimer(quiz._id, quiz.dueAt);
// // // // //                 }}
// // // // //                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // // // //               >
// // // // //                 Attend Quiz
// // // // //               </button>
// // // // //             )}

// // // // //             {activeQuizId === quiz._id && !alreadySubmitted && (
// // // // //               <>
// // // // //                 {quiz.questions.map((q, qi) => {
// // // // //                   const currentAnswer = answers[quiz._id]?.[qi]?.answer;
// // // // //                   const isMultipleChecked = (optionIndex) =>
// // // // //                     q.type === "multiple" && Array.isArray(currentAnswer) && currentAnswer.includes(optionIndex);

// // // // //                   return (
// // // // //                     <div key={qi} className="space-y-3 bg-gray-50 p-4 rounded border border-gray-100">
// // // // //                       <div className="font-medium text-gray-800">{`Q${qi + 1} (${q.type}): ${q.text}`}</div>

// // // // //                                             {q.type === "single" && (
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // //                           {q.options.map((opt, oi) => (
// // // // //                             <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // //                               <input
// // // // //                                 type="radio"
// // // // //                                 name={`quiz-${quiz._id}-q-${qi}`}
// // // // //                                 checked={currentAnswer === oi}
// // // // //                                 onChange={() => handleAnswerChange(quiz._id, qi, "single", oi)}
// // // // //                                 className="accent-teal-600"
// // // // //                               />
// // // // //                               <span className="text-sm">{opt}</span>
// // // // //                             </label>
// // // // //                           ))}
// // // // //                         </div>
// // // // //                       )}

// // // // //                       {q.type === "multiple" && (
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // //                           {q.options.map((opt, oi) => (
// // // // //                             <label key={oi} className="flex items-center gap-2 bg-white p-2 rounded border cursor-pointer hover:bg-teal-50">
// // // // //                               <input
// // // // //                                 type="checkbox"
// // // // //                                 name={`quiz-${quiz._id}-q-${qi}`}
// // // // //                                 checked={isMultipleChecked(oi)}
// // // // //                                 onChange={() => handleAnswerChange(quiz._id, qi, "multiple", oi)}
// // // // //                                 className="accent-teal-600"
// // // // //                               />
// // // // //                               <span className="text-sm">{opt}</span>
// // // // //                             </label>
// // // // //                           ))}
// // // // //                         </div>
// // // // //                       )}

// // // // //                       {q.type === "fill" && (
// // // // //                         <input
// // // // //                           type="text"
// // // // //                           value={currentAnswer || ""}
// // // // //                           onChange={(e) => handleAnswerChange(quiz._id, qi, "fill", e.target.value)}
// // // // //                           placeholder="Enter your answer here"
// // // // //                           className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
// // // // //                         />
// // // // //                       )}
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}

// // // // //                 <button
// // // // //                   onClick={() => handleSubmit(quiz._id)}
// // // // //                   className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded transition"
// // // // //                 >
// // // // //                   Submit Quiz
// // // // //                 </button>
// // // // //               </>
// // // // //             )}
// // // // //           </div>
// // // // //         );
// // // // //       })}
// // // // //     </div>
// // // // //   );
// // // // // }








// // // // "use client"

// // // // import { useEffect, useMemo, useState } from "react"

// // // // const api = (path, opts = {}) =>
// // // //   fetch(`/api/quizzes${path}`, {
// // // //     credentials: "include",
// // // //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// // // //     ...opts,
// // // //   }).then(async (r) => {
// // // //     const json = await r.json().catch(() => ({}))
// // // //     if (!r.ok) throw new Error(json.message || "Request failed")
// // // //     return json
// // // //   })

// // // // function Attempt({ quizId, onClose }) {
// // // //   const [quiz, setQuiz] = useState(null)
// // // //   const [idx, setIdx] = useState(0)
// // // //   const [answers, setAnswers] = useState({})
// // // //   const [timers, setTimers] = useState({}) // qid -> seconds spent
// // // //   const [lastTick, setLastTick] = useState(Date.now())
// // // //   const [currentQStart, setCurrentQStart] = useState(Date.now())
// // // //   const [submitting, setSubmitting] = useState(false)
// // // //   const [result, setResult] = useState(null)

// // // //   useEffect(() => {
// // // //     api(`/${quizId}`).then((res) => setQuiz(res.data))
// // // //   }, [quizId])

// // // //   // Tick timer for current question
// // // //   useEffect(() => {
// // // //     const t = setInterval(() => {
// // // //       setLastTick(Date.now())
// // // //     }, 1000)
// // // //     return () => clearInterval(t)
// // // //   }, [])

// // // //   // Accumulate time on tick
// // // //   useEffect(() => {
// // // //     if (!quiz) return
// // // //     const q = quiz.questions[idx]
// // // //     if (!q) return
// // // //     const qid = q._id
// // // //     const delta = Math.floor((Date.now() - currentQStart) / 1000)
// // // //     setTimers((prev) => ({ ...prev, [qid]: (prev[qid] || 0) + delta }))
// // // //     setCurrentQStart(Date.now())
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [lastTick])

// // // //   const current = useMemo(() => (quiz ? quiz.questions[idx] : null), [quiz, idx])

// // // //   const onNext = () => {
// // // //     if (!quiz) return
// // // //     if (idx < quiz.questions.length - 1) {
// // // //       setCurrentQStart(Date.now())
// // // //       setIdx((i) => i + 1)
// // // //     }
// // // //   }

// // // //   const onPrev = () => {
// // // //     if (idx > 0) {
// // // //       setCurrentQStart(Date.now())
// // // //       setIdx((i) => i - 1)
// // // //     }
// // // //   }

// // // //   const setAnswer = (qid, val) => {
// // // //     setAnswers((prev) => ({ ...prev, [qid]: val }))
// // // //   }

// // // //   const handleSubmit = async () => {
// // // //     if (!quiz) return
// // // //     setSubmitting(true)
// // // //     try {
// // // //       const payload = {
// // // //         answers: quiz.questions.map((q) => ({
// // // //           questionId: q._id,
// // // //           value: answers[q._id] ?? (q.type === "multiple" ? [] : ""),
// // // //           timeTakenSec: timers[q._id] || 0,
// // // //         })),
// // // //       }
// // // //       const res = await api(`/${quiz._id}/submit`, {
// // // //         method: "POST",
// // // //         body: JSON.stringify(payload),
// // // //       })
// // // //       setResult(res.data)
// // // //     } catch (e) {
// // // //       alert(e.message)
// // // //     } finally {
// // // //       setSubmitting(false)
// // // //     }
// // // //   }

// // // //   if (!quiz) return <div className="p-4">Loading quiz...</div>
// // // //   if (result) {
// // // //     return (
// // // //       <div className="p-4 space-y-4">
// // // //         <h3 className="text-xl font-semibold">Submission received</h3>
// // // //         <p>Your score: {result.score}</p>
// // // //         <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={onClose}>
// // // //           Close
// // // //         </button>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   const q = current
// // // //   if (!q) return null

// // // //   return (
// // // //     <div className="p-6 space-y-4 max-w-3xl mx-auto">
// // // //       <h2 className="text-2xl font-semibold">{quiz.title}</h2>
// // // //       <p className="text-sm text-neutral-600">{quiz.description}</p>

// // // //       <div className="border rounded p-4 bg-white">
// // // //         <div className="flex items-center justify-between mb-3">
// // // //           <div className="text-sm">
// // // //             Question {idx + 1} of {quiz.questions.length}
// // // //           </div>
// // // //           <div className="text-sm">Time spent: {timers[q._id] || 0}s</div>
// // // //         </div>
// // // //         <div className="font-medium mb-3">{q.prompt}</div>

// // // //         {q.type === "single" && (
// // // //           <div className="space-y-2">
// // // //             {(q.options || []).map((opt, i) => (
// // // //               <label key={i} className="flex items-center gap-2">
// // // //                 <input
// // // //                   type="radio"
// // // //                   name={`q-${q._id}`}
// // // //                   checked={answers[q._id] === opt.text}
// // // //                   onChange={() => setAnswer(q._id, opt.text)}
// // // //                 />
// // // //                 <span>{opt.text}</span>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {q.type === "multiple" && (
// // // //           <div className="space-y-2">
// // // //             {(q.options || []).map((opt, i) => {
// // // //               const selected = new Set(answers[q._id] || [])
// // // //               const toggle = () => {
// // // //                 const next = new Set(selected)
// // // //                 if (selected.has(opt.text)) next.delete(opt.text)
// // // //                 else next.add(opt.text)
// // // //                 setAnswer(q._id, [...next])
// // // //               }
// // // //               return (
// // // //                 <label key={i} className="flex items-center gap-2">
// // // //                   <input type="checkbox" checked={selected.has(opt.text)} onChange={toggle} />
// // // //                   <span>{opt.text}</span>
// // // //                 </label>
// // // //               )
// // // //             })}
// // // //           </div>
// // // //         )}

// // // //         {q.type === "fill" && (
// // // //           <input
// // // //             className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // // //             placeholder="Type your answer"
// // // //             value={answers[q._id] || ""}
// // // //             onChange={(e) => setAnswer(q._id, e.target.value)}
// // // //           />
// // // //         )}
// // // //       </div>

// // // //       <div className="flex items-center justify-between">
// // // //         <button className="px-3 py-2 bg-neutral-200 rounded disabled:opacity-50" onClick={onPrev} disabled={idx === 0}>
// // // //           Previous
// // // //         </button>
// // // //         {idx < (quiz.questions?.length || 0) - 1 ? (
// // // //           <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={onNext}>
// // // //             Next
// // // //           </button>
// // // //         ) : (
// // // //           <button className="px-3 py-2 bg-green-600 text-white rounded" disabled={submitting} onClick={handleSubmit}>
// // // //             {submitting ? "Submitting..." : "Submit"}
// // // //           </button>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default function UserQuizzes() {
// // // //   const [list, setList] = useState([])
// // // //   const [activeQuiz, setActiveQuiz] = useState(null)

// // // //   useEffect(() => {
// // // //     api("/available")
// // // //       .then((res) => setList(res.data || []))
// // // //       .catch((e) => console.error(e))
// // // //   }, [])

// // // //   if (activeQuiz) {
// // // //     return (
// // // //       <div className="min-h-screen bg-neutral-50">
// // // //         <Attempt quizId={activeQuiz} onClose={() => setActiveQuiz(null)} />
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen p-6 bg-neutral-50">
// // // //       <h1 className="text-3xl font-semibold mb-4">Available Quizzes</h1>
// // // //       <div className="grid gap-3 max-w-5xl">
// // // //         {list.map((q) => (
// // // //           <div key={q._id} className="border rounded p-4 flex items-center justify-between">
// // // //             <div>
// // // //               <div className="font-medium">{q.title}</div>
// // // //               <div className="text-sm text-neutral-600">{q.description}</div>
// // // //             </div>
// // // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setActiveQuiz(q._id)}>
// // // //               Start
// // // //             </button>
// // // //           </div>
// // // //         ))}
// // // //         {list.length === 0 && <div className="text-sm text-neutral-600">No quizzes available.</div>}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

















// // // "use client"

// // // import { useEffect, useMemo, useState } from "react"

// // // const api = (path, opts = {}) =>
// // //   fetch(`/api/quizzes${path}`, {
// // //     credentials: "include",
// // //     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
// // //     ...opts,
// // //   }).then(async (r) => {
// // //     const json = await r.json().catch(() => ({}))
// // //     if (!r.ok) throw new Error(json.message || "Request failed")
// // //     return json
// // //   })

// // // function Attempt({ quizId, onClose }) {
// // //   const [quiz, setQuiz] = useState(null)
// // //   const [idx, setIdx] = useState(0)
// // //   const [answers, setAnswers] = useState({})
// // //   const [timers, setTimers] = useState({}) // qid -> seconds spent
// // //   const [lastTick, setLastTick] = useState(Date.now())
// // //   const [currentQStart, setCurrentQStart] = useState(Date.now())
// // //   const [submitting, setSubmitting] = useState(false)
// // //   const [result, setResult] = useState(null)

// // //   useEffect(() => {
// // //     api(`/${quizId}`).then((res) => setQuiz(res.data))
// // //   }, [quizId])

// // //   // Tick timer for current question
// // //   useEffect(() => {
// // //     const t = setInterval(() => {
// // //       setLastTick(Date.now())
// // //     }, 1000)
// // //     return () => clearInterval(t)
// // //   }, [])

// // //   // Accumulate time on tick
// // //   useEffect(() => {
// // //     if (!quiz) return
// // //     const q = quiz.questions[idx]
// // //     if (!q) return
// // //     const qid = q._id
// // //     const delta = Math.floor((Date.now() - currentQStart) / 1000)
// // //     setTimers((prev) => ({ ...prev, [qid]: (prev[qid] || 0) + delta }))
// // //     setCurrentQStart(Date.now())
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [lastTick])

// // //   const current = useMemo(() => (quiz ? quiz.questions[idx] : null), [quiz, idx])

// // //   const onNext = () => {
// // //     if (!quiz) return
// // //     if (idx < quiz.questions.length - 1) {
// // //       setCurrentQStart(Date.now())
// // //       setIdx((i) => i + 1)
// // //     }
// // //   }

// // //   const onPrev = () => {
// // //     if (idx > 0) {
// // //       setCurrentQStart(Date.now())
// // //       setIdx((i) => i - 1)
// // //     }
// // //   }

// // //   const setAnswer = (qid, val) => {
// // //     setAnswers((prev) => ({ ...prev, [qid]: val }))
// // //   }

// // //   const handleSubmit = async () => {
// // //     if (!quiz) return
// // //     setSubmitting(true)
// // //     try {
// // //       const payload = {
// // //         answers: quiz.questions.map((q) => ({
// // //           questionId: q._id,
// // //           value: answers[q._id] ?? (q.type === "multiple" ? [] : ""),
// // //           timeTakenSec: timers[q._id] || 0,
// // //         })),
// // //       }
// // //       const res = await api(`/${quiz._id}/submit`, {
// // //         method: "POST",
// // //         body: JSON.stringify(payload),
// // //       })
// // //       setResult(res.data)
// // //     } catch (e) {
// // //       alert(e.message)
// // //     } finally {
// // //       setSubmitting(false)
// // //     }
// // //   }

// // //   if (!quiz) return <div className="p-4">Loading quiz...</div>
// // //   if (result) {
// // //     return (
// // //       <div className="p-4 space-y-4">
// // //         <h3 className="text-xl font-semibold">Submission received</h3>
// // //         <p>Your score: {result.score}</p>
// // //         <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={onClose}>
// // //           Close
// // //         </button>
// // //       </div>
// // //     )
// // //   }

// // //   const q = current
// // //   if (!q) return null

// // //   return (
// // //     <div className="p-6 space-y-4 max-w-3xl mx-auto">
// // //       <h2 className="text-2xl font-semibold">{quiz.title}</h2>
// // //       <p className="text-sm text-neutral-600">{quiz.description}</p>

// // //       <div className="border rounded p-4 bg-white">
// // //         <div className="flex items-center justify-between mb-3">
// // //           <div className="text-sm">
// // //             Question {idx + 1} of {quiz.questions.length}
// // //           </div>
// // //           <div className="text-sm">Time spent: {timers[q._id] || 0}s</div>
// // //         </div>
// // //         <div className="font-medium mb-3">{q.prompt}</div>

// // //         {q.type === "single" && (
// // //           <div className="space-y-2">
// // //             {(q.options || []).map((opt, i) => (
// // //               <label key={i} className="flex items-center gap-2">
// // //                 <input
// // //                   type="radio"
// // //                   name={`q-${q._id}`}
// // //                   checked={answers[q._id] === opt.text}
// // //                   onChange={() => setAnswer(q._id, opt.text)}
// // //                 />
// // //                 <span>{opt.text}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {q.type === "multiple" && (
// // //           <div className="space-y-2">
// // //             {(q.options || []).map((opt, i) => {
// // //               const selected = new Set(answers[q._id] || [])
// // //               const toggle = () => {
// // //                 const next = new Set(selected)
// // //                 if (selected.has(opt.text)) next.delete(opt.text)
// // //                 else next.add(opt.text)
// // //                 setAnswer(q._id, [...next])
// // //               }
// // //               return (
// // //                 <label key={i} className="flex items-center gap-2">
// // //                   <input type="checkbox" checked={selected.has(opt.text)} onChange={toggle} />
// // //                   <span>{opt.text}</span>
// // //                 </label>
// // //               )
// // //             })}
// // //           </div>
// // //         )}

// // //         {q.type === "fill" && (
// // //           <input
// // //             className="border rounded px-3 py-2 w-full text-black placeholder:text-neutral-500"
// // //             placeholder="Type your answer"
// // //             value={answers[q._id] || ""}
// // //             onChange={(e) => setAnswer(q._id, e.target.value)}
// // //           />
// // //         )}
// // //       </div>

// // //       <div className="flex items-center justify-between">
// // //         <button className="px-3 py-2 bg-neutral-200 rounded disabled:opacity-50" onClick={onPrev} disabled={idx === 0}>
// // //           Previous
// // //         </button>
// // //         {idx < (quiz.questions?.length || 0) - 1 ? (
// // //           <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={onNext}>
// // //             Next
// // //           </button>
// // //         ) : (
// // //           <button className="px-3 py-2 bg-green-600 text-white rounded" disabled={submitting} onClick={handleSubmit}>
// // //             {submitting ? "Submitting..." : "Submit"}
// // //           </button>
// // //         )}
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default function UserQuizzes() {
// // //   const [list, setList] = useState([])
// // //   const [activeQuiz, setActiveQuiz] = useState(null)

// // //   useEffect(() => {
// // //     api("/available")
// // //       .then((res) => setList(res.data || []))
// // //       .catch((e) => console.error(e))
// // //   }, [])

// // //   if (activeQuiz) {
// // //     return (
// // //       <div className="min-h-screen bg-neutral-50">
// // //         <Attempt quizId={activeQuiz} onClose={() => setActiveQuiz(null)} />
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen p-6 bg-neutral-50">
// // //       <h1 className="text-3xl font-semibold mb-4">Available Quizzes</h1>
// // //       <div className="grid gap-3 max-w-5xl">
// // //         {list.map((q) => (
// // //           <div key={q._id} className="border rounded p-4 flex items-center justify-between">
// // //             <div>
// // //               <div className="font-medium">{q.title}</div>
// // //               <div className="text-sm text-neutral-600">{q.description}</div>
// // //             </div>
// // //             <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setActiveQuiz(q._id)}>
// // //               Start
// // //             </button>
// // //           </div>
// // //         ))}
// // //         {list.length === 0 && <div className="text-sm text-neutral-600">No quizzes available.</div>}
// // //       </div>
// // //     </div>
// // //   )
// // // }






// // "use client"

// // import { useEffect, useState } from "react"

// // const api = (path, opts = {}) =>
// //   fetch(`/api/quizzes${path}`, {
// //     credentials: "include",
// //     headers: { "Content-Type": "application/json" },
// //     ...opts,
// //   }).then(async (r) => {
// //     const json = await r.json().catch(() => ({}))
// //     if (!r.ok) throw new Error(json.message || "Request failed")
// //     return json
// //   })

// // function Attempt({ quizId, onClose }) {
// //   const [quiz, setQuiz] = useState(null)
// //   const [idx, setIdx] = useState(0)
// //   const [answers, setAnswers] = useState({})
// //   const [submitting, setSubmitting] = useState(false)
// //   const [result, setResult] = useState(null)

// //   useEffect(() => {
// //     console.log("Loading quiz:", quizId)
// //     api(`/${quizId}`).then((res) => {
// //       console.log("Loaded quiz:", res.data)
// //       setQuiz(res.data)
// //     })
// //   }, [quizId])

// //   const current = quiz?.questions?.[idx]

// //   const setAnswer = (qid, val) => {
// //     setAnswers((prev) => ({ ...prev, [qid]: val }))
// //   }

// //   const handleSubmit = async () => {
// //     if (!quiz) return
// //     setSubmitting(true)
// //     try {
// //       const payload = {
// //         answers: quiz.questions.map((q) => ({
// //           questionId: q._id,
// //           value: answers[q._id] ?? (q.type === "multiple" ? [] : ""),
// //           timeTakenSec: 0,
// //         })),
// //       }
// //       const res = await api(`/${quiz._id}/submit`, {
// //         method: "POST",
// //         body: JSON.stringify(payload),
// //       })
// //       setResult(res.data)
// //     } catch (e) {
// //       alert(e.message)
// //     } finally {
// //       setSubmitting(false)
// //     }
// //   }

// //   if (!quiz) return null
// //   if (result) {
// //     return (
// //       <div className="p-4 space-y-4">
// //         <h3 className="text-xl font-semibold">Submission received</h3>
// //         <p>Your score: {result.score}</p>
// //         <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={onClose}>
// //           Close
// //         </button>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="p-6 space-y-4 max-w-3xl mx-auto">
// //       <h2 className="text-2xl font-semibold">{quiz.title}</h2>
// //       <p className="text-sm text-neutral-600">{quiz.description}</p>

// //       <div className="border rounded p-4 bg-white">
// //         <div className="font-medium mb-3">{current?.prompt}</div>

// //         {current?.type === "single" && (
// //           <div className="space-y-2">
// //             {(current.options || []).map((opt, i) => (
// //               <label key={i} className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   name={`q-${current._id}`}
// //                   checked={answers[current._id] === opt.text}
// //                   onChange={() => setAnswer(current._id, opt.text)}
// //                 />
// //                 <span>{opt.text}</span>
// //               </label>
// //             ))}
// //           </div>
// //         )}

// //         {current?.type === "multiple" && (
// //           <div className="space-y-2">
// //             {(current.options || []).map((opt, i) => {
// //               const selected = new Set(answers[current._id] || [])
// //               const toggle = () => {
// //                 const next = new Set(selected)
// //                 selected.has(opt.text) ? next.delete(opt.text) : next.add(opt.text)
// //                 setAnswer(current._id, [...next])
// //               }
// //               return (
// //                 <label key={i} className="flex items-center gap-2">
// //                   <input type="checkbox" checked={selected.has(opt.text)} onChange={toggle} />
// //                   <span>{opt.text}</span>
// //                 </label>
// //               )
// //             })}
// //           </div>
// //         )}

// //         {current?.type === "fill" && (
// //           <input
// //             className="border rounded px-3 py-2 w-full text-black"
// //             placeholder="Type your answer"
// //             value={answers[current._id] || ""}
// //             onChange={(e) => setAnswer(current._id, e.target.value)}
// //           />
// //         )}
// //       </div>

// //       <div className="flex justify-end">
// //         {idx < quiz.questions.length - 1 ? (
// //           <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setIdx((i) => i + 1)}>
// //             Next
// //           </button>
// //         ) : (
// //           <button className="px-3 py-2 bg-green-600 text-white rounded" disabled={submitting} onClick={handleSubmit}>
// //             {submitting ? "Submitting..." : "Submit"}
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default function UserQuizzes() {
// //   const [list, setList] = useState([])
// //   const [activeQuiz, setActiveQuiz] = useState(null)

// //   useEffect(() => {
// //     api("/available")
// //       .then((res) => {
// //         console.log("Available quizzes:", res.data)
// //         setList(res.data || [])
// //       })
// //       .catch((e) => console.error("Failed to load quizzes:", e))
// //   }, [])

// //   if (activeQuiz) {
// //     return <Attempt quizId={activeQuiz} onClose={() => setActiveQuiz(null)} />
// //   }

// //   return (
// //     <div className="min-h-screen p-6 bg-neutral-50">
// //       <h1 className="text-3xl font-semibold mb-4">Your Course Quizzes</h1>
// //       <div className="grid gap-3 max-w-5xl">
// //         {list.map((q) => (
// //           <div key={q._id} className="border rounded p-4 flex items-center justify-between">
// //             <div>
// //               <div className="font-medium">{q.courseName} (Quiz Created)</div>
// //               <div className="text-sm text-neutral-600">{q.title}</div>
// //               <div className="text-sm text-neutral-500">{q.description}</div>
// //             </div>
// //             {q.submitted ? (
// //               <div className="text-sm text-green-600 font-medium">Already Attempted</div>
// //             ) : (
// //               <button className="px-3 py-2 bg-neutral-900 text-white rounded" onClick={() => setActiveQuiz(q._id)}>
// //                 Attend
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }













// /////below code is v0 dev code 23/10/25////////


// "use client"

// import { useEffect, useState } from "react"
// import { quizApi } from "../../api/quizApi"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { Clock, CheckCircle, AlertCircle } from "lucide-react"

// export default function UserQuizzes() {
//   const [quizzes, setQuizzes] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedQuiz, setSelectedQuiz] = useState(null)
//   const [answers, setAnswers] = useState([])
//   const [submitting, setSubmitting] = useState(false)
//   const [startTime, setStartTime] = useState(null)

//   useEffect(() => {
//     loadQuizzes()
//   }, [])

//   const loadQuizzes = async () => {
//     try {
//       setLoading(true)
//       const res = await quizApi.getUserQuizzes()
//       setQuizzes(res.data.data || [])
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load quizzes")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const startQuiz = async (quiz) => {
//     try {
//       const res = await quizApi.getQuiz(quiz._id)
//       setSelectedQuiz(res.data.data)
//       setAnswers(res.data.data.questions.map(() => ({ userAnswers: [] })))
//       setStartTime(Date.now())
//     } catch (error) {
//       toast.error("Failed to load quiz")
//     }
//   }

//   const handleAnswerChange = (questionIndex, answer) => {
//     const newAnswers = [...answers]
//     newAnswers[questionIndex] = { userAnswers: answer }
//     setAnswers(newAnswers)
//   }

//   const submitQuiz = async () => {
//     try {
//       setSubmitting(true)
//       const timeTaken = Math.floor((Date.now() - startTime) / 1000)
//       const res = await quizApi.submitQuiz(selectedQuiz._id, {
//         answers,
//         timeTaken,
//       })
//       toast.success(`Quiz submitted! Score: ${res.data.data.percentage}%`)
//       setSelectedQuiz(null)
//       loadQuizzes()
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to submit quiz")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500"></div>
//       </div>
//     )
//   }

//   if (selectedQuiz) {
//     return (
//       <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-50">
//         <ToastContainer position="bottom-right" theme="colored" />
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedQuiz.title}</h1>
//             <p className="text-slate-600 mb-6">{selectedQuiz.description}</p>

//             <div className="space-y-6">
//               {selectedQuiz.questions.map((question, idx) => (
//                 <div key={idx} className="border rounded-lg p-6 bg-slate-50">
//                   <h3 className="font-semibold text-lg text-slate-900 mb-4">
//                     {idx + 1}. {question.prompt} ({question.points} pts)
//                   </h3>

//                   {question.type === "fill" ? (
//                     <input
//                       type="text"
//                       className="w-full px-4 py-2 border rounded-lg text-slate-900"
//                       placeholder="Enter your answer"
//                       value={answers[idx]?.userAnswers?.[0] || ""}
//                       onChange={(e) => handleAnswerChange(idx, [e.target.value])}
//                     />
//                   ) : (
//                     <div className="space-y-2">
//                       {question.options.map((option, optIdx) => (
//                         <label key={optIdx} className="flex items-center gap-3 cursor-pointer">
//                           <input
//                             type={question.type === "single" ? "radio" : "checkbox"}
//                             name={`question-${idx}`}
//                             value={option.text}
//                             checked={answers[idx]?.userAnswers?.includes(option.text) || false}
//                             onChange={(e) => {
//                               if (question.type === "single") {
//                                 handleAnswerChange(idx, [option.text])
//                               } else {
//                                 const current = answers[idx]?.userAnswers || []
//                                 if (e.target.checked) {
//                                   handleAnswerChange(idx, [...current, option.text])
//                                 } else {
//                                   handleAnswerChange(
//                                     idx,
//                                     current.filter((a) => a !== option.text),
//                                   )
//                                 }
//                               }
//                             }}
//                             className="w-4 h-4"
//                           />
//                           <span className="text-slate-700">{option.text}</span>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-4 mt-8">
//               <button
//                 onClick={submitQuiz}
//                 disabled={submitting}
//                 className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 font-semibold"
//               >
//                 {submitting ? "Submitting..." : "Submit Quiz"}
//               </button>
//               <button
//                 onClick={() => setSelectedQuiz(null)}
//                 className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-semibold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-50">
//       <ToastContainer position="bottom-right" theme="colored" />
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-slate-900 mb-8">My Quizzes</h1>

//         {quizzes.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-slate-900 mb-2">No quizzes available</h3>
//             <p className="text-slate-600">Enroll in a course to see available quizzes</p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {quizzes.map((quiz) => (
//               <div
//                 key={quiz._id}
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
//               >
//                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
//                   <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
//                   <p className="text-indigo-100 text-sm">{quiz.course?.title}</p>
//                 </div>

//                 <div className="p-6">
//                   <p className="text-slate-600 text-sm mb-4">{quiz.description}</p>

//                   <div className="space-y-2 mb-6">
//                     <div className="flex items-center gap-2 text-slate-700">
//                       <Clock className="w-4 h-4" />
//                       <span className="text-sm">{quiz.questions?.length || 0} questions</span>
//                     </div>
//                     {quiz.userSubmission && (
//                       <div className="flex items-center gap-2 text-green-600">
//                         <CheckCircle className="w-4 h-4" />
//                         <span className="text-sm">Score: {quiz.userSubmission.percentage}%</span>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={() => startQuiz(quiz)}
//                     disabled={quiz.hasSubmitted && !quiz.allowResubmit}
//                     className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 font-semibold transition-colors"
//                   >
//                     {quiz.hasSubmitted ? "Already Submitted" : "Attempt Quiz"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }






"use client"

import { useEffect, useState } from "react"
import { Button } from "../../components/Layouts/Button"
import { Card } from "../../components/Layouts/Card"

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
          const data = await response.json()
          setAssignments(data)
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
