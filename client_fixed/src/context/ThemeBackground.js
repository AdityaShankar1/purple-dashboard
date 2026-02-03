


// client/src/context/ThemeBackground.js
import React from "react";

export default function ThemeBackground({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen w-full 
        bg-gradient-to-r from-blue-400 via-blue-200 to-blue-100 
        flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
