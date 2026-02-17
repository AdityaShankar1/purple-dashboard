"use client";
import { useEffect, useState } from "react";

export const useIncidentsData = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5001/api"}/wazuh/incidents`
        );
        const json = await res.json();
        // Defensive: ensure always an array
        setIncidents(Array.isArray(json.incidents) ? json.incidents : []);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
        setIncidents([]);
      }
    };
    fetchIncidents();

    // Auto-refresh every 30s
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, []);

  return incidents;
};
