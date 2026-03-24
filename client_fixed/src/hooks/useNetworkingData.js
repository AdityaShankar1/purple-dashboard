// client/src/hooks/useNetworkingData.js
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

export function useNetworkingData(timeRange = "24h") {
  const [traffic, setTraffic] = useState([]);
  const [firewall, setFirewall] = useState([]);
  const [malware, setMalware] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connected");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/wazuh/networking", {
          params: { range: timeRange }
        });
        const data = res.data;

        // Shape traffic into {time, inbound, outbound}
        const trafficData = (data.traffic || []).map((t) => ({
          time: new Date(t["@timestamp"]).toLocaleTimeString(),
          inbound: t.data?.inbound || 0,
          outbound: t.data?.outbound || 0,
        }));

        // Backend now returns already shaped {protocol, count} for firewall
        const firewallData = Array.isArray(data.firewall) ? data.firewall : [];

        // Shape malware into {type, target, timestamp}
        const malwareData = (data.malware || []).map((m) => ({
          type: m.rule?.description || "malware",
          target: m.agent?.name || "unknown",
          timestamp: m["@timestamp"],
        }));

        setTraffic(trafficData);
        setFirewall(firewallData);
        setMalware(malwareData);
        setConnectionStatus("connected");
      } catch (err) {
        console.error("Failed to fetch networking data:", err.message);
        setConnectionStatus("disconnected");
        // Maintain previous state if available
        setTraffic(prev => prev.length ? prev : []);
        setFirewall(prev => prev.length ? prev : []);
        setMalware(prev => prev.length ? prev : []);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 10000); // auto-refresh every 10s
    return () => clearInterval(id);
  }, [timeRange]);

  return { traffic, firewall, malware, connectionStatus };
}
