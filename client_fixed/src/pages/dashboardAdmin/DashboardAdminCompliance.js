
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full h-full text-blue-900">
      {/* Audit Log Volume */}
      <Card title="📊 Audit Log Volume">
        {auditChart.length === 0 ? (
          <p className="text-blue-600">No audit log data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={auditChart}>
              <XAxis dataKey="time" stroke="#3b82f6" />
              <YAxis stroke="#3b82f6" />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Policy Violations */}
      <Card title="🚨 Policy Violations">
        {policyViolations.length === 0 ? (
          <p className="text-blue-600">No policy violations detected</p>
        ) : (
          <ul className="space-y-2">
            {policyViolations.map((v, i) => (
              <li
                key={i}
                className="flex justify-between bg-blue-600/80 rounded-xl px-4 py-2 text-sm text-white"
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
  );
}
