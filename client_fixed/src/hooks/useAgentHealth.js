import { useEffect, useState } from "react";

export const useAgentHealth = () => {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/wazuh/agent-health`);
        if (!res.ok) {
          setError(`HTTP ${res.status}: ${res.statusText}`);
          setAgents([]);
          return;
        }
        const json = await res.json();
        // Always return an array
        const data = Array.isArray(json) ? json : (json?.data || []);
        setAgents(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Unknown error");
        setAgents([]);
        console.error("Failed to fetch agent health:", err);
      }
    };
    fetchHealth();
  }, []);

  return { agents, error };
};
