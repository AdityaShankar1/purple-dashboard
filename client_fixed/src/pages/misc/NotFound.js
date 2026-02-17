import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-fuchsia-400 flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-white mb-8">Page Not Found</p>
      <Link
        to="/"
        className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
      >
        Back to Safety
      </Link>
    </div>
  );
};

export default NotFound;