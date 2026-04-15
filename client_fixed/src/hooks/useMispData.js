"use client";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axiosConfig";

export const useMispData = (timeRange = "7d") => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    timeline: [],
    dailyCounts: [],
    topIps: [],
    totalCount: 0,
    uniqueIpCount: 0,
    latestTimestamp: null,
    alertsPerHour: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [alertsRes, statsRes] = await Promise.all([
        axiosInstance.get(`/wazuh/misp-alerts?timeRange=${timeRange}`),
        axiosInstance.get(`/wazuh/misp-stats?timeRange=${timeRange}`),
      ]);

      setAlerts(Array.isArray(alertsRes.data?.alerts) ? alertsRes.data.alerts : []);
      setStats({
        timeline: statsRes.data?.timeline || [],
        dailyCounts: statsRes.data?.dailyCounts || [],
        topIps: statsRes.data?.topIps || [],
        totalCount: statsRes.data?.totalCount || 0,
        uniqueIpCount: statsRes.data?.uniqueIpCount || 0,
        latestTimestamp: statsRes.data?.latestTimestamp || null,
        alertsPerHour: statsRes.data?.alertsPerHour || 0,
      });
    } catch (err) {
      console.error("Failed to fetch MISP data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    setLoading(true);
    fetchData();

    // Auto-refresh every 30s
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { alerts, stats, loading, error, refetch: fetchData };
};
