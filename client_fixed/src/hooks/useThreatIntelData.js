"use client";
import { useEffect, useState } from "react";

export const useThreatIntelData = () => {
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
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5001/api"}/wazuh/threat-intel`
        );
        if (!res.ok) {
          setConnectionStatus("disconnected");
          setData({ global: [], actors: [], assets: [], incidentSeverity: { high: 0, medium: 0, low: 0 } });
          return;
        }
        const json = await res.json();
        setData({
          global: Array.isArray(json.global) ? json.global : [],
          actors: Array.isArray(json.actors) ? json.actors : [],
          assets: Array.isArray(json.assets) ? json.assets : [],
          incidentSeverity: json.incidentSeverity || { high: 0, medium: 0, low: 0 },
        });
        setConnectionStatus("connected");
      } catch (err) {
        console.error("Failed to fetch threat intel data:", err);
        setConnectionStatus("disconnected");
        setData({ global: [], actors: [], assets: [], incidentSeverity: { high: 0, medium: 0, low: 0 } });
      }
    };
    fetchThreatIntel();

    // Auto-refresh every 30s
    const interval = setInterval(fetchThreatIntel, 30000);
    return () => clearInterval(interval);
  }, []);

  return { ...data, connectionStatus };
};
