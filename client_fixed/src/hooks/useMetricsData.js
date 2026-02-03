//client/src/hooks/useMetricsData

import { useEffect, useState } from "react";

export const useMetricsData = () => {
  const [data, setData] = useState({ count: 0, alerts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/wazuh/metrics`);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return data;
};
