



// // src/components/Layouts/Layouts.jsx
// import { ThemeProvider } from "../../context/ThemeContext";

// export default function Layout({ children }) {
//   return <ThemeProvider>{children}</ThemeProvider>;
// }







// client/src/components/Layouts/Layouts.js

import React, { useState } from 'react';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Watermark from "./Watermark"; 
import ThemeBackground from "../../context/ThemeBackground";

// This component wraps protected routes, providing the Navbar and Sidebar structure.
export default function DashboardLayout({ children, user }) {
  // Sidebar state management is centralized here
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ThemeBackground className="relative min-h-screen">
      <Watermark />
      
      {/* Navbar always visible at the top */}
      <Navbar 
        user={user} 
        // Note: The onMenuClick function is passed but currently unused in the Navbar provided, 
        // as the Sidebar collapse is controlled by its own state in the layout.
      />

      {/* Main content area: Flex row for Sidebar and Page Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar 
          user={user} 
          isCollapsed={isSidebarCollapsed} // Pass the state down
          setIsCollapsed={setIsSidebarCollapsed} // Pass the setter down (if needed for internal logic)
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </ThemeBackground>
  );
}