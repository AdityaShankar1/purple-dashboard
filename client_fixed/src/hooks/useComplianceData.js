//client/src/hooks/useComplianceData.js

"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useComplianceData = () => {
  const [data, setData] = useState({
    auditChart: [],
    policyViolations: [],
    mitreAlerts: [],
  });

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        // Fetch compliance data
        const complianceRes = await axiosInstance.get('/wazuh/compliance');
        const complianceJson = complianceRes.data;

        // Fetch MITRE T1078 alerts
        const mitreRes = await axiosInstance.get('/wazuh/alerts?technique=T1078');
        const mitreJson = mitreRes.data;

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
