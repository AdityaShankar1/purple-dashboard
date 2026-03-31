// client/src/hooks/useMitreMap.js


import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useMitreMap = () => {
  const [data, setData] = useState({ tactics: [], techniques: [] });

  useEffect(() => {
    const fetchMitreData = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/mitre-map");
        const json = res.data;
        setData({
          tactics: Array.isArray(json.tactics) ? json.tactics : [],
          techniques: Array.isArray(json.techniques) ? json.techniques : [],
        });
      } catch (err) {
        console.error("Failed to fetch MITRE map:", err.message);
        setData(prev => ({
          tactics: prev.tactics.length ? prev.tactics : [],
          techniques: prev.techniques.length ? prev.techniques : [],
        }));
      }
    };

    fetchMitreData(); // ✅ actually call the function

    const interval = setInterval(fetchMitreData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
