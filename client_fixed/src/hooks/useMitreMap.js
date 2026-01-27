// client/src/hooks/useMitreMap.js


import { useEffect, useState } from "react";

export const useMitreMap = () => {
  const [data, setData] = useState({ tactics: [], techniques: [] });

  useEffect(() => {
    const fetchMitreData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wazuh/mitre-map`
        );
        const json = await res.json();
        setData({
          tactics: Array.isArray(json.tactics) ? json.tactics : [],
          techniques: Array.isArray(json.techniques) ? json.techniques : [],
        });
      } catch (err) {
        console.error("Failed to fetch MITRE map:", err);
        setData({ tactics: [], techniques: [] });
      }
    };

    fetchMitreData(); // ✅ actually call the function

    const interval = setInterval(fetchMitreData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
