// //client/src/pages/dashboardAdmin/Quizzes.js

// "use client"

// import { useEffect, useState } from "react"
// import dayjs from "dayjs"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
// import { createQuiz, updateQuiz } from "../../api/quizApi"
// import axios from "../../api/axiosConfig"

// function QuestionEditor({ value, onChange }) {
//   const [local, setLocal] = useState(value)
//   useEffect(() => setLocal(value), [value])
//   const update = (patch) => {
//     const next = { ...local, ...patch }
//     setLocal(next)
//     onChange(next)
//   }

//   return (
//     <div className="border rounded p-3 space-y-3 bg-white text-black">
//       <div className="flex flex-col md:flex-row gap-2">
//         <input
//           className="border rounded px-3 py-2 flex-1 text-black placeholder:text-neutral-500"
//           placeholder="Question prompt"
//           value={local.prompt}
//           onChange={(e) => update({ prompt: e.target.value })}
//         />
//         <select
//           className="border rounded px-3 py-2 text-black"
//           value={local.type}
//           onChange={(e) => update({ type: e.target.value })}
//         >
//           <option value="single">Single MCQ</option>
//           <option value="multiple">Multiple MCQ</option>
//           <option value="fill">Fill ups</option>
//         </select>
//       </div>
//       <div className="flex items-center gap-2">
//         <label className="text-sm font-medium text-black">Points</label>
//         <select
//           className="border rounded px-2 py-1 w-24 text-black"
//           value={local.points || 1}
//           onChange={(e) => update({ points: Number(e.target.value || 1) })}
//         >
//           {[...Array(10)].map((_, i) => (
//             <option key={i + 1} value={i + 1}>{i + 1}</option>
//           ))}
//         </select>
//       </div>
//       {(local.type === "single" || local.type === "multiple") && (
//         <div className="space-y-1">
//           <div className="text-sm font-medium text-black">Options</div>
//           {(local.options || []).map((opt, i) => (
//             <div key={i} className="flex gap-2">
//               <input
//                 className="border rounded px-3 py-2 flex-1 text-black"
//                 value={opt.text}
//                 onChange={(e) => {
//                   const next = [...(local.options || [])]
//                   next[i] = { text: e.target.value }
//                   update({ options: next })
//                 }}
//               />
//               <button
//                 className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
//                 onClick={() => update({ options: (local.options || []).filter((_, idx) => idx !== i) })}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             className="px-2 py-1 border rounded text-indigo-600 hover:bg-indigo-50"
//             onClick={() => update({ options: [...(local.options || []), { text: "" }] })}
//           >
//             Add Option
//           </button>
//         </div>
//       )}
//       <div className="space-y-1">
//         <div className="text-sm font-medium text-black">Correct Answer(s)</div>
//         {local.type === "single" || local.type === "fill" ? (
//           <input
//             className="border rounded px-3 py-2 w-full text-black"
//             value={local.correctAnswers?.[0] || ""}
//             onChange={(e) => update({ correctAnswers: [e.target.value] })}
//           />
//         ) : (
//           <input
//             className="border rounded px-3 py-2 w-full text-black"
//             placeholder="Comma separated values"
//             value={(local.correctAnswers || []).join(",")}
//             onChange={(e) => update({ correctAnswers: e.target.value.split(",").map((s) => s.trim()) })}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default function AdminQuizzes() {
//   const [quizzes, setQuizzes] = useState([])
//   const [editing, setEditing] = useState(null)
//   const [form, setForm] = useState({
//     course: "",
//     title: "",
//     description: "",
//     isPublished: false,
//     startAt: "",
//     dueAt: "",
//     questions: [],
//   })
//   const [error, setError] = useState(null)

//   const load = () => {
//     axios.get("/quizzes/admin").then((r) => {
//       setQuizzes(Array.isArray(r.data.data) ? r.data.data : (Array.isArray(r.data) ? r.data : []))
//       setError(null)
//     }).catch((e) => {
//       setError(e.response?.data?.message || "Failed to load quizzes")
//       setQuizzes([])
//     })
//   }

//   useEffect(() => { load() }, [])

//   const resetForm = () => setForm({
//     course: "",
//     title: "",
//     description: "",
//     isPublished: false,
//     startAt: "",
//     dueAt: "",
//     questions: [],
//   })

//   const save = async () => {
//     try {
//       const payload = { ...form }
//       if (payload.startAt) payload.startAt = new Date(payload.startAt).toISOString()
//       if (payload.dueAt) payload.dueAt = new Date(payload.dueAt).toISOString()

//       if (editing) {
//         await updateQuiz(editing, payload)
//       } else {
//         await createQuiz(payload)
//       }

//       resetForm()
//       setEditing(null)
//       load()
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || e.message || "Failed to save quiz"
//       setError(errorMessage)
//     }
//   }

//   const remove = async (id) => {
//     if (!window.confirm("Delete this quiz?")) return
//     try {
//       await axios.delete(`/quizzes/${id}`)
//       load()
//     } catch (e) {
//       setError(e.response?.data?.message || "Failed to delete quiz")
//     }
//   }

//   const setQuestion = (i, q) => {
//     const next = [...form.questions]
//     next[i] = q
//     setForm((f) => ({ ...f, questions: next }))
//   }

//   const edit = (qz) => {
//     setEditing(qz._id)
//     setForm({
//       course: qz.course?._id || qz.course,
//       title: qz.title,
//       description: qz.description || "",
//       isPublished: !!qz.isPublished,
//       startAt: qz.startAt ? new Date(qz.startAt).toISOString().slice(0, 16) : "",
//       dueAt: qz.dueAt ? new Date(qz.dueAt).toISOString().slice(0, 16) : "",
//       questions: (qz.questions || []).map((q) => ({
//         prompt: q.prompt,
//         type: q.type,
//         options: q.options || [],
//         correctAnswers: q.correctAnswers || [],
//         points: q.points || 1,
//       })),
//     })
//   }

//   return (
//     <div className="min-h-screen p-6 bg-neutral-50 text-black">
//       {error && (
//         <div className="border border-red-300 bg-red-50 text-red-800 rounded p-3 max-w-6xl mx-auto">{error}</div>
//       )}
//       <section className="space-y-4 max-w-6xl mx-auto">
//         <h1 className="text-3xl font-semibold text-indigo-700">Quizzes</h1>
//         <div className="grid grid-cols-1 gap-4">
//           <div className="border rounded p-4 space-y-3 bg-white">
//             <h2 className="font-semibold text-lg text-indigo-600">{editing ? "Edit Quiz" : "Create Quiz"}</h2>
//             {/* Direct input for course name or ID */}
//             <input
//               className="border rounded px-3 py-2 w-full text-black"
//               placeholder="Course name or ID"
//               value={form.course}
//               onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
//               required
//             />
//             <input
//               className="border rounded px-3 py-2 w-full text-black"
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
//             />
//             <textarea
//               className="border rounded px-3 py-2 w-full text-black"
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
//             />
//             <div className="flex items-center gap-2">
//               <label className="text-sm text-black">Published</label>
//               <input
//                 type="checkbox"
//                 checked={form.isPublished}
//                 onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
//               />
//             </div>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <DateTimePicker
//                   label="Start At"
//                   value={form.startAt ? dayjs(form.startAt) : null}
//                   onChange={(v) => setForm((f) => ({ ...f, startAt: v ? v.toISOString() : "" }))}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       size: "small",
//                       sx: {
//                         "& .MuiInputBase-input": { color: "black" },
//                         "& .MuiInputLabel-root": { color: "rgb(79 70 229)" },
//                       },
//                     },
//                   }}
//                 />
//                 <DateTimePicker
//                   label="Due At"
//                   value={form.dueAt ? dayjs(form.dueAt) : null}
//                   onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       size: "small",
//                       sx: {
//                         "& .MuiInputBase-input": { color: "black" },
//                         "& .MuiInputLabel-root": { color: "rgb(79 70 229)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </LocalizationProvider>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-medium text-black">Questions</div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-black">Add Question</label>
//                 <select
//                   className="border rounded px-3 py-2 text-black"
//                   defaultValue=""
//                   onChange={(e) => {
//                     const type = e.target.value
//                     if (!type) return
//                     setForm((f) => ({
//                       ...f,
//                       questions: [
//                         ...f.questions,
//                         type === "fill"
//                           ? { prompt: "", type, options: [], correctAnswers: [""], points: 1 }
//                           : {
//                               prompt: "",
//                               type,
//                               options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
//                               correctAnswers: [""],
//                               points: 1,
//                             },
//                       ],
//                     }))
//                     e.target.value = ""
//                   }}
//                 >
//                   <option value="" disabled>Select Type to Add</option>
//                   <option value="single">Single MCQ</option>
//                   <option value="multiple">Multiple MCQ</option>
//                   <option value="fill">Fill ups</option>
//                 </select>
//               </div>
//               {(form.questions || []).map((q, i) => (
//                 <div key={i} className="space-y-2">
//                   <QuestionEditor value={q} onChange={(next) => setQuestion(i, next)} />
//                   <div className="flex justify-end">
//                     <button
//                       className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
//                       onClick={() =>
//                         setForm((f) => ({
//                           ...f,
//                           questions: f.questions.filter((_, idx) => idx !== i),
//                         }))
//                       }
//                     >
//                       Remove Question
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <button className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={save}>
//                 {editing ? "Update" : "Create"}
//               </button>
//               {editing && (
//                 <button
//                   className="px-3 py-2 border rounded text-neutral-700 hover:bg-neutral-100"
//                   onClick={() => {
//                     setEditing(null)
//                     resetForm()
//                   }}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="space-y-2">
//             {(quizzes || []).map((q) => (
//               <div key={q._id} className="border rounded p-4 space-y-2 bg-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="font-medium text-indigo-600">{q.title}</div>
//                     <div className="text-sm text-neutral-600">{q.description}</div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="px-2 py-1 border rounded text-indigo-600 hover:bg-indigo-50" onClick={() => edit(q)}>
//                       Edit
//                     </button>
//                     <button className="px-2 py-1 border rounded text-red-600 hover:bg-red-50" onClick={() => remove(q._id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-sm text-neutral-700">
//                   Enrolled: {q.stats?.totalEnrollments ?? 0} • Completed: {q.stats?.completed ?? 0} • Not Completed:{" "}
//                   {q.stats?.notCompleted ?? 0}
//                 </div>
//                 <AllowResubmit quizId={q._id} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// function AllowResubmit({ quizId }) {
//   const [userId, setUserId] = useState("")
//   const submit = async () => {
//     if (!userId) return
//     try {
//       await axios.patch(`/quizzes/${quizId}/submissions/${userId}/allow-resubmit`)
//       alert("User unlocked for resubmit.")
//       setUserId("")
//     } catch (e) {
//       alert(e.response?.data?.message || "Failed to unlock user")
//     }
//   }
//   return (
//     <div className="flex items-center gap-2">
//       <input
//         className="border rounded px-2 py-1 text-black placeholder:text-neutral-500"
//         placeholder="User ID (Mongo _id)"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <button className="px-2 py-1 border rounded text-indigo-600 hover:bg-indigo-50" onClick={submit}>
//         Allow Resubmit
//       </button>
//     </div>
//   )
// }












//////below is v0 dev code 23/10/25









"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { quizApi } from "../../api/quizApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function QuestionEditor({ value, onChange }) {
  const [local, setLocal] = useState(value)
  useEffect(() => setLocal(value), [value])
  const update = (patch) => {
    const next = { ...local, ...patch }
    setLocal(next)
    onChange(next)
  }

  return (
    <div className="border rounded-xl p-4 space-y-3 bg-white dark:bg-gray-800 text-black dark:text-white border-transparent dark:border-gray-700 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          className="border rounded-lg px-3 py-2 flex-1 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 placeholder:text-neutral-500 dark:placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Question prompt"
          value={local.prompt}
          onChange={(e) => update({ prompt: e.target.value })}
        />
        <select
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={local.type}
          onChange={(e) => update({ type: e.target.value })}
        >
          <option value="single">Single MCQ</option>
          <option value="multiple">Multiple MCQ</option>
          <option value="fill">Fill ups</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-black dark:text-gray-300">Points</label>
        <select
          className="border rounded-lg px-2 py-1 w-24 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={local.points || 1}
          onChange={(e) => update({ points: Number(e.target.value || 1) })}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      {(local.type === "single" || local.type === "multiple") && (
        <div className="space-y-1">
          <div className="text-sm font-medium text-black dark:text-gray-300">Options</div>
          {(local.options || []).map((opt, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="border rounded-lg px-3 py-2 flex-1 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={opt.text}
                onChange={(e) => {
                  const next = [...(local.options || [])]
                  next[i] = { text: e.target.value }
                  update({ options: next })
                }}
              />
              <button
                className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                onClick={() => update({ options: (local.options || []).filter((_, idx) => idx !== i) })}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="px-2 py-1 border rounded text-indigo-600 hover:bg-indigo-50"
            onClick={() => update({ options: [...(local.options || []), { text: "" }] })}
          >
            Add Option
          </button>
        </div>
      )}
      <div className="space-y-1">
        <div className="text-sm font-medium text-black dark:text-gray-300">Correct Answer(s)</div>
        {local.type === "single" || local.type === "fill" ? (
          <input
            className="border rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={local.correctAnswers?.[0] || ""}
            onChange={(e) => update({ correctAnswers: [e.target.value] })}
          />
        ) : (
          <input
            className="border rounded px-3 py-2 w-full text-black"
            placeholder="Comma separated values"
            value={(local.correctAnswers || []).join(",")}
            onChange={(e) => update({ correctAnswers: e.target.value.split(",").map((s) => s.trim()) })}
          />
        )}
      </div>
    </div>
  )
}

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    isPublished: false,
    startAt: "",
    dueAt: "",
    questions: [],
  })
  const [error, setError] = useState(null)

  const load = () => {
    quizApi
      .getAdminQuizzes()
      .then((r) => {
        setQuizzes(Array.isArray(r.data.data) ? r.data.data : Array.isArray(r.data) ? r.data : [])
        setError(null)
      })
      .catch((e) => {
        setError(e.response?.data?.message || "Failed to load quizzes")
        setQuizzes([])
      })
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () =>
    setForm({
      courseId: "",
      title: "",
      description: "",
      isPublished: false,
      startAt: "",
      dueAt: "",
      questions: [],
    })

  const save = async () => {
    if (!form.courseId || form.courseId.trim() === "" || form.courseId === "undefined") {
      setError("Course ID is required and must be valid")
      return
    } try {
      const payload = { ...form }
      if (payload.startAt) payload.startAt = new Date(payload.startAt).toISOString()
      if (payload.dueAt) payload.dueAt = new Date(payload.dueAt).toISOString()

      // Transform questions to match backend schema
      payload.questions = payload.questions.map(q => ({
        ...q,
        type: q.type === "single" ? "mcq" : q.type === "fill" ? "fillup" : q.type,
        options: Array.isArray(q.options) ? q.options.map(o => o.text || "") : [],
        points: Number(q.points) || 1
      }))

      // Ensure courseId is set properly
      payload.courseId = payload.courseId || payload.course;

      if (editing) {
        await quizApi.updateQuiz(editing, payload)
      } else {
        await quizApi.createQuiz(payload)
      }

      toast.success(editing ? "Quiz updated" : "Quiz created")
      resetForm()
      setEditing(null)
      load()
    } catch (e) {
      console.error("Save error:", e)
      const errorMessage = e?.response?.data?.message || e.message || "Failed to save quiz"
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  const remove = async (id) => {
    if (!window.confirm("Delete this quiz?")) return
    try {
      await quizApi.deleteQuiz(id)
      toast.success("Quiz deleted")
      load()
    } catch (e) {
      setError(e.response?.data?.message || "Failed to delete quiz")
      toast.error(e.response?.data?.message || "Failed to delete quiz")
    }
  }

  const setQuestion = (i, q) => {
    const next = [...form.questions]
    next[i] = q
    setForm((f) => ({ ...f, questions: next }))
  }

  const edit = (qz) => {
    setEditing(qz._id)
    setForm({
      courseId: qz.course?._id || qz.course || "",
      title: qz.title,
      description: qz.description || "",
      isPublished: !!qz.isPublished,
      startAt: qz.startAt ? new Date(qz.startAt).toISOString().slice(0, 16) : "",
      dueAt: qz.dueAt ? new Date(qz.dueAt).toISOString().slice(0, 16) : "",
      questions: (qz.questions || []).map((q) => ({
        prompt: q.prompt,
        type: q.type,
        options: q.options || [],
        correctAnswers: q.correctAnswers || [],
        points: q.points || 1,
      })),
    })
  }

  return (
    <div className="min-h-screen p-6 bg-neutral-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <ToastContainer position="bottom-right" theme="colored" />
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-800 rounded p-3 max-w-6xl mx-auto mb-4">{error}</div>
      )}
      <section className="space-y-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-indigo-700">Quizzes</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4 bg-white dark:bg-gray-800 shadow-sm transition-colors premium-hover-glow">
            <h2 className="font-semibold text-lg text-indigo-600">{editing ? "Edit Quiz" : "Create Quiz"}</h2>
            <input
              className="border rounded-lg px-4 py-2.5 w-full bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Course name or ID"
              value={form.courseId}
              onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
              required
            />
            <input
              className="border rounded-lg px-4 py-2.5 w-full bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <textarea
              className="border rounded-lg px-4 py-2.5 w-full bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-black dark:text-gray-300">Published</label>
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DateTimePicker
                  label="Start At"
                  value={form.startAt ? dayjs(form.startAt) : null}
                  onChange={(v) => setForm((f) => ({ ...f, startAt: v ? v.toISOString() : "" }))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: {
                        "& .MuiInputBase-input": { color: "var(--text-primary, black)" },
                        "& .MuiInputLabel-root": { color: "var(--text-primary, rgb(79 70 229))" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-primary, #ccc)" },
                        "& .MuiSvgIcon-root": { color: "var(--text-primary, #666)" },
                      },
                    },
                  }}
                />
                <DateTimePicker
                  label="Due At"
                  value={form.dueAt ? dayjs(form.dueAt) : null}
                  onChange={(v) => setForm((f) => ({ ...f, dueAt: v ? v.toISOString() : "" }))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: {
                        "& .MuiInputBase-input": { color: "var(--text-primary, black)" },
                        "& .MuiInputLabel-root": { color: "var(--text-primary, rgb(79 70 229))" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-primary, #ccc)" },
                        "& .MuiSvgIcon-root": { color: "var(--text-primary, #666)" },
                      },
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-black dark:text-white">Questions</div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-black dark:text-gray-300">Add Question</label>
                <select
                  className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  defaultValue=""
                  onChange={(e) => {
                    const type = e.target.value
                    if (!type) return
                    setForm((f) => ({
                      ...f,
                      questions: [
                        ...f.questions,
                        type === "fill"
                          ? { prompt: "", type, options: [], correctAnswers: [""], points: 1 }
                          : {
                            prompt: "",
                            type,
                            options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
                            correctAnswers: [""],
                            points: 1,
                          },
                      ],
                    }))
                    e.target.value = ""
                  }}
                >
                  <option value="" disabled>
                    Select Type to Add
                  </option>
                  <option value="single">Single MCQ</option>
                  <option value="multiple">Multiple MCQ</option>
                  <option value="fill">Fill ups</option>
                </select>
              </div>
              {(form.questions || []).map((q, i) => (
                <div key={i} className="space-y-2">
                  <QuestionEditor value={q} onChange={(next) => setQuestion(i, next)} />
                  <div className="flex justify-end">
                    <button
                      className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          questions: f.questions.filter((_, idx) => idx !== i),
                        }))
                      }
                    >
                      Remove Question
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={save}>
                {editing ? "Update" : "Create"}
              </button>
              {editing && (
                <button
                  className="px-3 py-2 border rounded text-neutral-700 hover:bg-neutral-100"
                  onClick={() => {
                    setEditing(null)
                    resetForm()
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {(quizzes || []).map((q) => (
              <div key={q._id} className="border rounded p-4 space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-indigo-600">{q.title}</div>
                    <div className="text-sm text-neutral-600">{q.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 border rounded text-indigo-600 hover:bg-indigo-50"
                      onClick={() => edit(q)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                      onClick={() => remove(q._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
