"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useThreatIntelData = (assetRange = "7d") => {
  const [data, setData] = useState({
    global: [],
    actors: [],
    assets: [],
    incidentSeverity: { high: 0, medium: 0, low: 0 },
  });
  const [connectionStatus, setConnectionStatus] = useState("connected");

  useEffect(() => {
    const fetchThreatIntel = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/threat-intel", {
          params: { assetRange }
        });
        const json = res.data;

        setData({
          global: Array.isArray(json.global) ? json.global : [],
          actors: Array.isArray(json.actors) ? json.actors : [],
          assets: Array.isArray(json.assets) ? json.assets : [],
          incidentSeverity: json.incidentSeverity || { high: 0, medium: 0, low: 0 },
        });
        setConnectionStatus("connected");
      } catch (err) {
        console.error("Failed to fetch threat intel data:", err.message);
        setConnectionStatus("disconnected");
        // Keep previous data if available, or reset to defaults if it's the first load
        setData(prev => ({
          ...prev,
          global: prev.global.length ? prev.global : [],
          actors: prev.actors.length ? prev.actors : [],
          assets: prev.assets.length ? prev.assets : [],
          incidentSeverity: prev.incidentSeverity || { high: 0, medium: 0, low: 0 },
        }));
      }
    };

    fetchThreatIntel();

    // Auto-refresh every 30s
    const interval = setInterval(fetchThreatIntel, 30000);
    return () => clearInterval(interval);
  }, [assetRange]);

  return { ...data, connectionStatus };
};
