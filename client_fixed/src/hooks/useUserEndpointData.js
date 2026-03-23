import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

export const useUserEndpointData = () => {
  const [data, setData] = useState({
    logons: [],
    locations: [],
    compliance: 0,
  });
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/wazuh/user-endpoint");
        setData(res.data);
        setStatus("success");
      } catch (err) {
        console.error("Failed to fetch user endpoint data:", err);
        setStatus("error");
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return { ...data, status };
};
