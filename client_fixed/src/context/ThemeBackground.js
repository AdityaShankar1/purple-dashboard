/**
 * ============================================================================
 * LATEST VERSION - UI/UX Consistency Fix
 * ============================================================================
 * BUG FIXED: Tight Coupling in ThemeBackground Styles
 * - ThemeBackground had hardcoded purple gradients, forcing login/auth pages to match admin UI gaps.
 * SOLUTION:
 * - Refactored to accept an optional `bgColor` prop (defaults to `bg-purple-900`).
 * - Removed system dark mode class overrides that turned the background almost black.
 * ============================================================================
 */



// client/src/context/ThemeBackground.js
import React from "react";

export default function ThemeBackground({ children, className = "", bgColor = "bg-purple-900" }) {
  return (
    <div
      className={`min-h-screen w-full ${bgColor} flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

