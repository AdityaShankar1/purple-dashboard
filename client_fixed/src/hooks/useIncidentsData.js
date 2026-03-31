"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useIncidentsData = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/incidents");
        const json = res.data;
        // Defensive: ensure always an array
        setIncidents(Array.isArray(json.incidents) ? json.incidents : []);
      } catch (err) {
        console.error("Failed to fetch incidents:", err.message);
        // Maintain previous state on error
        setIncidents(prev => prev.length ? prev : []);
      }
    };
    fetchIncidents();

    // Auto-refresh every 30s
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, []);

  return incidents;
};
