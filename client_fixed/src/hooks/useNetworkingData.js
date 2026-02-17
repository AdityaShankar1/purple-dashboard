// client/src/hooks/useNetworkingData.js
import { useEffect, useState } from "react";

export function useNetworkingData() {
  const [traffic, setTraffic] = useState([]);
  const [firewall, setFirewall] = useState([]);
  const [malware, setMalware] = useState([]);

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/wazuh/networking`, {
          credentials: "include",
        });
        const data = await res.json();

        // Shape traffic into {time, inbound, outbound}
        const trafficData = (data.traffic || []).map((t) => ({
          time: new Date(t["@timestamp"]).toLocaleTimeString(),
          inbound: t.data?.inbound || 0,
          outbound: t.data?.outbound || 0,
        }));

        // Shape firewall into {protocol, count}
        const firewallCounts = (data.firewall || []).reduce((acc, f) => {
          const proto = f.data?.protocol || "unknown";
          acc[proto] = (acc[proto] || 0) + 1;
          return acc;
        }, {});
        const firewallData = Object.entries(firewallCounts).map(([protocol, count]) => ({
          protocol,
          count,
        }));

        // Shape malware into {type, target, timestamp}
        const malwareData = (data.malware || []).map((m) => ({
          type: m.rule?.description || "malware",
          target: m.agent?.name || "unknown",
          timestamp: m["@timestamp"],
        }));

        setTraffic(trafficData);
        setFirewall(firewallData);
        setMalware(malwareData);
      } catch (err) {
        console.error("Failed to fetch networking data", err);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 10000); // auto-refresh every 10s
    return () => clearInterval(id);
  }, []);

  return { traffic, firewall, malware };
}
