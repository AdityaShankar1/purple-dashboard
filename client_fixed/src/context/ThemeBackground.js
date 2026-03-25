


// client/src/context/ThemeBackground.js
import React from "react";

export default function ThemeBackground({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen w-full 
        bg-[var(--bg-primary)]
        flex flex-col ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at top right, #3b82f6, transparent), 
                         radial-gradient(circle at bottom left, #1d4ed8, transparent)`,
        backgroundAttachment: 'fixed'
      }}
    >
      {children}
    </div>
  );
}

