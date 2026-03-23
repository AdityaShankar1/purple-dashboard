"use client";

import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import { toast } from "react-toastify";

export default function UserAssignments() {
  const [items, setItems] = useState([]);
  const [uploads, setUploads] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/assignments/visible");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load assignments ❌");
      console.error("Load assignments error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFiles = (id, files) => setUploads(prev => ({ ...prev, [id]: files }));

  const submit = async (id) => {
    const fd = new FormData();
    Array.from(uploads[id] || []).forEach(f => fd.append("files", f));

    try {
      const res = await axios.post(`/assignments/${id}/submit`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Assignment submitted ✅");
      await load();
    } catch (err) {
      const message = err.response?.data?.message || "Submission failed ❌";
      toast.error(message);
      console.error("Submit assignment error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-100">Your Assignments</h1>
      {loading ? (
        <div className="text-purple-300">Loading assignments...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-400 italic">No assignments available.</div>
      ) : (
        items.map(a => {
          const now = Date.now();
          const dueMs = new Date(a.dueAt).getTime();
          const expired = now > dueMs;

          return (
            <div key={a._id} className="bg-gray-900 rounded-lg border border-gray-800 p-4 shadow-lg">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-semibold text-purple-200">{a.title}</div>
                  <div className="text-sm text-gray-400 mt-1">{a.description}</div>
                  <div className="text-sm mt-3 text-gray-500">
                    Starts: {new Date(a.startAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(a.dueAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full h-fit">
                  Files: {a.questionFiles?.length || 0}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  onChange={(e) => onFiles(a._id, e.target.files)}
                  className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-900 file:text-purple-100 hover:file:bg-purple-800"
                />
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${expired
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20"
                    }`}
                  onClick={() => submit(a._id)}
                  disabled={expired}
                >
                  {expired ? "Closed" : "Submit"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
