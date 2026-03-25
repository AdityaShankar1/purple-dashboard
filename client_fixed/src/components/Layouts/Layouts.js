/**
 * ============================================================================
 * LATEST VERSION - UI/UX Consistency Fix
 * ============================================================================
 * BUG FIXED: Undifferentiated Admin/User Global Gaps
 * - The user and admin dashobards shared a rigid background color that couldn't be decoupled.
 * SOLUTION:
 * - Added a dynamic check logic `isUser = user?.role === "user"`.
 * - Passes `bg-[#ddeeff]` to ThemeBackground for User mode, leaving Admin gaps `bg-purple-900`.
 * ============================================================================
 */
/**
 * ============================================================================
 * LATEST VERSION - Modified by GitHub Copilot
 * ============================================================================
 * 
 * BUG FIXED: Duplicate Navigation Bar (Navbar + Sidebar redundancy)
 * 
 * ISSUE:
 * - User reported seeing two navigation bars simultaneously on the page
 * - A purple/indigo Navbar (correct) and a blue Sidebar (duplicate/unwanted)
 * - Both components were being rendered in the DashboardLayout
 * 
 * SOLUTION:
 * - Removed the Sidebar component import and rendering from this layout
 * - Removed the useState hook managing sidebar collapse state (no longer needed)
 * - Kept only the purple Navbar which provides logo, user menu, and notifications
 * - Simplified the layout structure from flex row to single column
 * 
 * RESULT:
 * - Only the purple Navbar is now displayed
 * - All other features (auth, routing, notifications) remain functional
 * - No breaking changes to other components
 * ============================================================================
 */

import React from 'react';
import Navbar from "./Navbar";
import Watermark from "./Watermark";
import ThemeBackground from "../../context/ThemeBackground";

// This component wraps protected routes, providing the Navbar structure.
export default function DashboardLayout({ children, user }) {
  const isUser = user?.role === "user";
  const bgColor = isUser ? "bg-[#ddeeff]" : "bg-purple-900";

  return (
    <ThemeBackground bgColor={bgColor} className="relative min-h-screen">
      <Watermark />

      {/* Navbar always visible at the top */}
      <Navbar
        user={user}
      />

      {/* Main content area */}
      <main className="overflow-y-auto px-6 pb-6 pt-2">
        {children}
      </main>
    </ThemeBackground>
  );
}


