import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export default function useAgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/agents");
        const json = res.data;
        // Ensure json is always an array
        const data = Array.isArray(json) ? json : (json?.data || []);
        setAgents(data);
      } catch (err) {
        console.error("❌ useAgentList error:", err.message);
        setAgents(prev => prev.length ? prev : []);
      }
    };
    fetchAgents();
  }, []);

  return agents;
}
