// client/src/hooks/useMetricsData.js
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useMetricsData = () => {
  const [data, setData] = useState({ count: 0, alerts: [], last24hCount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/metrics");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch metrics data:", err.message);
      }
    };
    fetchData();
  }, []);

  return data;
};
