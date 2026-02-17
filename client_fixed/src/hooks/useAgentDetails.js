import { useEffect, useState } from "react";

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
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5001/api"}/wazuh/agent/${agentName}`
        );

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        const json = await res.json();

        setData({
          alerts: Array.isArray(json.alerts) ? json.alerts : [],
          mitre: {
            tactics: Array.isArray(json.mitre?.tactics) ? json.mitre.tactics : [],
            techniques: Array.isArray(json.mitre?.techniques) ? json.mitre.techniques : [],
          },
        });
      } catch (err) {
        console.error("❌ Failed to fetch agent details:", err);
        setData({
          alerts: [],
          mitre: {
            tactics: [],
            techniques: [],
          },
        });
      }
    };

    fetchData();
  }, [agentName]);

  return data;
};
