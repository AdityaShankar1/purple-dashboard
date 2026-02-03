"use client";
import { useEffect, useState } from "react";

export const useMitreAlerts = (technique) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const baseUrl =
          process.env.REACT_APP_API_URL || "http://localhost:5001/api";
        const res = await fetch(`${baseUrl}/wazuh/alerts${technique !== "all" ? `?technique=${technique}` : ""}`);
        const json = await res.json();
        setAlerts(json.alerts || []);
      } catch (err) {
        console.error("Failed to fetch MITRE alerts:", err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [technique]);

  return alerts;
};
