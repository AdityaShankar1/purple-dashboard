// /client/src/pages/dashboardAdmin/DashboardAdmin.js

import React, { useState } from "react"
import AdminLayout from "../../components/Layouts/AdminLayout"

// Import dashboards
import DashboardAdminMetrics from "./DashboardAdminMetrics"
import DashboardAdminIncident from "./DashboardAdminIncident"
import DashboardAdminThreatIntelligence from "./DashboardAdminThreatIntelligence"
import DashboardAdminNetworking from "./DashboardAdminNetworking"
import DashboardAdminUserEndpoint from "./DashboardAdminUserEndpoint"
import DashboardAdminCompliance from "./DashboardAdminCompliance"
import DashboardAdminCourses from "./DashboardAdminCourses"
import AddCourseMaterials from "./AddCourseMaterials"  
import MonitoringUsers from "./MonitoringUsers"
import Assignments from "./Assignments"
import Quizzes from "./Quizzes"

export default function DashboardAdmin() {
  const [activePage, setActivePage] = useState("dashboard") // default to Dashboard Overview

  // Sidebar Menu Structure
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      children: [
        { key: "dashboard", label: "Dashboard Overview" },
        { key: "incident", label: "Incident" },
        { key: "threat", label: "Threat Intelligence" },
        { key: "networking", label: "Networking" },
        { key: "userendpoint", label: "User Endpoint" },
        { key: "compliance", label: "Compliance" },
      ],
    },
    {
      key: "monitoring",
      label: "Monitoring Users", 
    },
    {
      key: "learning",
      label: "Learning",
      children: [
        { key: "courses", label: "CreateCourse" },
        { key: "managecourses", label: "Add Course Material" },
        { key: "assignments", label: "Assignments" },
        { key: "quizzes", label: "Quizzes" },
      ],
    },
  ]

  return (
    <AdminLayout
      activePage={activePage}
      setActivePage={setActivePage}
      menuItems={menuItems}
    >
      {/* Dashboard children */}
      {activePage === "dashboard" && <DashboardAdminMetrics />}
      {activePage === "incident" && <DashboardAdminIncident />}
      {activePage === "threat" && <DashboardAdminThreatIntelligence />}
      {activePage === "networking" && <DashboardAdminNetworking />}
      {activePage === "userendpoint" && <DashboardAdminUserEndpoint />}
      {activePage === "compliance" && <DashboardAdminCompliance />}

      {/* Standalone */}
      {activePage === "monitoring" && <MonitoringUsers />}

      {/* Learning section */}
      {activePage === "courses" && <DashboardAdminCourses />}
       {activePage === "managecourses" && <AddCourseMaterials />} 
      {activePage === "assignments" && <Assignments />}
      {activePage === "quizzes" && <Quizzes />}
    </AdminLayout>
  )
}
