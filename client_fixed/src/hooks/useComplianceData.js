//client/src/hooks/useComplianceData.js

"use client";
import { useEffect, useState } from "react";

export const useComplianceData = () => {
  const [data, setData] = useState({
    auditChart: [],
    policyViolations: [],
    mitreAlerts: [],
  });

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        const baseUrl =
          process.env.REACT_APP_API_URL || "http://localhost:5000/api";

        // Fetch compliance data
        const complianceRes = await fetch(`${baseUrl}/wazuh/compliance`);
        const complianceJson = await complianceRes.json();

        // Fetch MITRE T1078 alerts
        const mitreRes = await fetch(`${baseUrl}/wazuh/alerts?technique=T1078`);
        const mitreJson = await mitreRes.json();

        setData({
          auditChart: complianceJson.auditChart || [],
          policyViolations: complianceJson.policyViolations || [],
          mitreAlerts: mitreJson.alerts || [],
        });
      } catch (err) {
        console.error("Failed to fetch compliance data:", err);
      }
    };

    fetchCompliance();
    const interval = setInterval(fetchCompliance, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
