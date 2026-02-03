//client/src/pages/dashboardAdmin/DashboardAdminCourses.js

import React, { useState, useEffect, useMemo } from "react";
import axios from "../../api/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Collapse } from "@mui/material";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Award,
  Clock,
  TrendingUp,
  Users,
  ChevronUp
} from "lucide-react";

// List of available categories
const COURSE_CATEGORIES = [
  "All Categories",
  "General",
  "Cybersecurity",
  "Programming",
  "Data Science",
  "Networking",
];

// Category color mapping
const CATEGORY_COLORS = {
  General: "from-gray-500 to-gray-600",
  Cybersecurity: "from-red-500 to-red-600",
  Programming: "from-blue-500 to-blue-600",
  "Data Science": "from-purple-500 to-purple-600",
  Networking: "from-green-500 to-green-600",
};

// Difficulty color mapping
const DIFFICULTY_BADGES = {
  Beginner: "bg-green-100 text-green-700 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Advanced: "bg-red-100 text-red-700 border-red-300",
};

// Define the initial state for a new course
const initialCourseState = {
  courseId: "",
  title: "",
  description: "",
  content: "",
  duration: 1,
  difficulty: "Beginner",
  category: "General",
  instructor: "",
};

export default function DashboardAdminCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [saving, setSaving] = useState(false);
  const [newCourse, setNewCourse] = useState(initialCourseState);
  const [editCourse, setEditCourse] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/courses/admin/all");
      const allCourses = res.data?.data?.courses || [];
      setCourses(allCourses);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch courses");
    }
  };

  const filteredCourses = useMemo(() => {
    let filtered = courses;
    const term = searchTerm.toLowerCase();

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    if (term) {
      filtered = filtered.filter(
        (c) =>
          (c.title?.toLowerCase() || "").includes(term) ||
          (c.courseId?.toLowerCase() || "").includes(term)
      );
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const { courseId, title, description, instructor } = newCourse;
    if (!courseId.trim() || !title.trim() || !description.trim() || !instructor.trim()) {
      toast.error("Course ID, title, description, and instructor are required");
      return;
    }
    setSaving(true);
    try {
      await axios.post("/courses", newCourse);
      toast.success("Course created successfully!");
      setNewCourse(initialCourseState);
      setShowCreateForm(false);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating course");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const { title, description, instructor } = editCourse;
    if (!title.trim() || !description.trim() || !instructor.trim()) {
      toast.error("Title, description, and instructor are required");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`/courses/${editCourse._id}`, editCourse);
      toast.success("Course updated successfully!");
      setEditCourse(null);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/courses/${id}`);
      toast.success("Course deleted!");
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting course");
    }
  };

  const handleEditClick = (course) => {
    setEditCourse({ ...course });
    setShowCreateForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditCourse(null);
    setNewCourse(initialCourseState);
  };

  const activeForm = editCourse || (showCreateForm ? newCourse : null);

  // Calculate statistics
  const stats = {
    total: courses.length,
    categories: [...new Set(courses.map(c => c.category))].length,
    avgDuration: courses.length > 0 ? (courses.reduce((sum, c) => sum + c.duration, 0) / courses.length).toFixed(1) : 0,
    filtered: filteredCourses.length,
  };

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="bottom-right" theme="colored" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Course Management
          </h1>
        </div>
        <p className="text-slate-400 ml-15">Create, edit, and manage your course catalog</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avg Duration</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.avgDuration}h</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Filtered</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.filtered}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer bg-white"
                >
                  {COURSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex-[2]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or course ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                />
              </div>
            </div>

            {/* Add Course Button */}
            <Button
              onClick={toggleCreateForm}
              startIcon={showCreateForm ? <ChevronUp size={20} /> : <Plus size={20} />}
              sx={{
                backgroundColor: showCreateForm ? "#ef4444" : "#6366f1",
                "&:hover": { backgroundColor: showCreateForm ? "#dc2626" : "#4f46e5" },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "12px",
                padding: "12px 24px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              variant="contained"
            >
              {showCreateForm ? "Hide Form" : "Add Course"}
            </Button>
          </div>
        </div>
      </div>

      {/* Create or Edit Form - Collapsible */}
      <Collapse in={showCreateForm} timeout={400}>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${editCourse ? 'bg-blue-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                {editCourse ? <Edit className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {editCourse ? "Edit Course" : "Create New Course"}
              </h2>
            </div>

            <form onSubmit={editCourse ? handleUpdateCourse : handleCreateCourse}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  {/* Course ID */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={activeForm?.courseId || ""}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, courseId: e.target.value })
                          : setNewCourse({ ...newCourse, courseId: e.target.value })
                      }
                      disabled={!!editCourse}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="e.g., CS101"
                    />
                  </div>

                  {/* Course Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={activeForm?.title || ""}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, title: e.target.value })
                          : setNewCourse({ ...newCourse, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                      placeholder="Enter course title"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={activeForm?.category || "General"}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, category: e.target.value })
                          : setNewCourse({ ...newCourse, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer bg-white"
                    >
                      {COURSE_CATEGORIES.filter(c => c !== "All Categories").map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={activeForm?.difficulty || "Beginner"}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, difficulty: e.target.value })
                          : setNewCourse({ ...newCourse, difficulty: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer bg-white"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={activeForm?.duration || 1}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, duration: Number(e.target.value) })
                          : setNewCourse({ ...newCourse, duration: Number(e.target.value) })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                  </div>

                  {/* Instructor */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Instructor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={activeForm?.instructor || ""}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, instructor: e.target.value })
                          : setNewCourse({ ...newCourse, instructor: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                      placeholder="Enter instructor name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={activeForm?.description || ""}
                      onChange={(e) =>
                        editCourse
                          ? setEditCourse({ ...editCourse, description: e.target.value })
                          : setNewCourse({ ...newCourse, description: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                      placeholder="Brief description of the course"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course Content
                </label>
                <textarea
                  rows={5}
                  value={activeForm?.content || ""}
                  onChange={(e) =>
                    editCourse
                      ? setEditCourse({ ...editCourse, content: e.target.value })
                      : setNewCourse({ ...newCourse, content: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                  placeholder="Detailed course content and syllabus"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  {saving ? (editCourse ? "Updating..." : "Saving...") : (editCourse ? "Update Course" : "Create Course")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditCourse(null);
                    setShowCreateForm(false);
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Collapse>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">All Courses</h2>
          <span className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl text-sm shadow-md">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {searchTerm || selectedCategory !== "All Categories" 
                ? "No courses match your filters"
                : "No courses yet"
              }
            </h3>
            <p className="text-slate-500">
              {searchTerm || selectedCategory !== "All Categories"
                ? "Try adjusting your search or filters"
                : "Click 'Add Course' to create your first course"
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Course Header with Category Gradient */}
                <div className={`bg-gradient-to-r ${CATEGORY_COLORS[course.category] || 'from-gray-500 to-gray-600'} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm uppercase tracking-wide">
                      {course.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${DIFFICULTY_BADGES[course.difficulty]}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <BookOpen size={16} className="text-indigo-500" />
                      <span className="font-mono font-medium">{course.courseId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Users size={16} className="text-purple-500" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Clock size={16} className="text-blue-500" />
                      <span>{course.duration} hours</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleEditClick(course)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors font-semibold text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-semibold text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}