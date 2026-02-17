import { useEffect, useState } from "react";

export const useAgentHealth = () => {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
        const fullUrl = `${apiUrl}/wazuh/agent-health`;

        console.log("🔍 [useAgentHealth] Fetching from:", fullUrl);

        const res = await fetch(fullUrl);

        console.log("📡 [useAgentHealth] Response status:", res.status, res.statusText);
        console.log("📡 [useAgentHealth] Response headers:", {
          contentType: res.headers.get('content-type'),
          contentLength: res.headers.get('content-length')
        });

        if (!res.ok) {
          const errorMsg = `HTTP ${res.status}: ${res.statusText}`;
          console.error("❌ [useAgentHealth] HTTP Error:", errorMsg);
          setError(errorMsg);
          setAgents([]);
          return;
        }

        const text = await res.text();
        console.log("📄 [useAgentHealth] Raw response text:", text.substring(0, 200));

        let json;
        try {
          json = JSON.parse(text);
          console.log("✅ [useAgentHealth] Parsed JSON:", json);
        } catch (parseErr) {
          console.error("❌ [useAgentHealth] JSON Parse Error:", parseErr.message);
          console.error("❌ [useAgentHealth] Raw text was:", text);
          setError(`JSON Parse Error: ${parseErr.message}`);
          setAgents([]);
          return;
        }

        // Always return an array
        const data = Array.isArray(json) ? json : (json?.data || []);
        console.log("✅ [useAgentHealth] Final data array:", data);
        console.log("✅ [useAgentHealth] Agent count:", data.length);

        setAgents(data);
        setError(null);
      } catch (err) {
        const errorMsg = err.message || "Unknown error";
        console.error("❌ [useAgentHealth] Fetch Error:", errorMsg);
        console.error("❌ [useAgentHealth] Full error:", err);
        setError(errorMsg);
        setAgents([]);
      }
    };
    fetchHealth();
  }, []);

  return { agents, error };
};
