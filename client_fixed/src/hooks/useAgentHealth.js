import { useEffect, useState } from "react";

export const useAgentHealth = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/wazuh/agent-health`);
        const json = await res.json();
        setAgents(json);
      } catch (err) {
        console.error("Failed to fetch agent health:", err);
      }
    };
    fetchHealth();
  }, []);

  return agents;
};
