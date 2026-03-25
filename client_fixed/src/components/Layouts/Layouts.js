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
  return (
    <ThemeBackground className="relative min-h-screen">
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


