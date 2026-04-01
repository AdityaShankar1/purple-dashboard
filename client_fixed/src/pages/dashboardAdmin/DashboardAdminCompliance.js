
//client/src/pages/dashboardAdmin/DashboardAdminCompliance.js


"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { useComplianceData } from "../../hooks/useComplianceData";

export default function DashboardAdminCompliance() {
  const { auditChart = [], policyViolations = [] } = useComplianceData() || {};

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen p-8 space-y-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-[#a855f7] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-[#f6e6f7] tracking-tight">Compliance</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium ml-1">Track system audits and policy compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Audit Log Volume */}
      <Card title="📊 Audit Log Volume">
        {auditChart.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No audit log data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={auditChart}>
              <XAxis dataKey="time" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--card-border)',
                  color: 'var(--text-primary)'
                }} 
              />
              <Line type="monotone" dataKey="volume" stroke="#a855f7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Policy Violations */}
      <Card title="🚨 Policy Violations">
        {policyViolations.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No policy violations detected</p>
        ) : (
          <ul className="space-y-2">
            {policyViolations.map((v, i) => (
              <li
                key={i}
                className="flex justify-between bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] premium-hover-glow"
              >
                <span>{v.description}</span>
                <span className="text-blue-100">
                  {new Date(v.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
      </div>
    </div>
  );
}
