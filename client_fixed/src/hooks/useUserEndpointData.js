import { useEffect, useState } from "react";

export const useUserEndpointData = () => {
  const [data, setData] = useState({
    logons: [],
    locations: [],
    compliance: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/wazuh/user-endpoint");
        const text = await res.text();

        try {
          const json = JSON.parse(text);
          setData(json);
        } catch (err) {
          console.error("❌ JSON parse error:", text);
          setError("Invalid JSON response");
        }
      } catch (err) {
        console.error("❌ useUserEndpointData error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};
