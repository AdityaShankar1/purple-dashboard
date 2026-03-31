import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export const useAgentDetails = (agentName) => {
  const [data, setData] = useState({
    alerts: [],
    mitre: {
      tactics: [],
      techniques: [],
    },
  });

  useEffect(() => {
    if (!agentName) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/wazuh/agent/${agentName}`);
        const json = res.data;

        setData({
          alerts: Array.isArray(json.alerts) ? json.alerts : [],
          mitre: {
            tactics: Array.isArray(json.mitre?.tactics) ? json.mitre.tactics : [],
            techniques: Array.isArray(json.mitre?.techniques) ? json.mitre.techniques : [],
          },
        });
      } catch (err) {
        console.error("❌ Failed to fetch agent details:", err.message);
        setData(prev => ({
          alerts: prev.alerts.length ? prev.alerts : [],
          mitre: {
            tactics: prev.mitre?.tactics?.length ? prev.mitre.tactics : [],
            techniques: prev.mitre?.techniques?.length ? prev.mitre.techniques : [],
          },
        }));
      }
    };

    fetchData();
  }, [agentName]);

  return data;
};
