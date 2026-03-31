/**
 * BUG FIX LOG (2026-02-23 Refactoring):
 * - Standardized to use axiosInstance for all requests.
 * - Preserved exponential backoff and request deduplication.
 */

import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

// ============ MODULE-LEVEL CACHE FOR DEDUPLICATION ============
let cachedAgents = null;
let cacheTimestamp = 0;
let pendingRequest = null;
const CACHE_DURATION = 60000; // 60 seconds cache

// ============ RETRY LOGIC WITH EXPONENTIAL BACKOFF ============
const fetchWithRetry = async (url, maxRetries = 3, initialDelay = 1000) => {
  let lastError = new Error("Unknown error");

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await axiosInstance.get(url);
      console.log(`📡 [useAgentHealth] Attempt ${attempt + 1}/${maxRetries} - Status: ${res.status}`);
      return res;
    } catch (err) {
      lastError = err;
      if (err.response?.status === 429 && attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.warn(`⏳ [useAgentHealth] Rate limited. Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.warn(`⚠️ [useAgentHealth] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`, err.message);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }

  throw lastError;
};

export const useAgentHealth = () => {
  const [agents, setAgents] = useState(cachedAgents || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        if (cachedAgents && Date.now() - cacheTimestamp < CACHE_DURATION) {
          setAgents(cachedAgents);
          setError(null);
          return;
        }

        if (pendingRequest) {
          const data = await pendingRequest;
          setAgents(data);
          setError(null);
          return;
        }

        const endpoint = "/wazuh/agent-health";

        pendingRequest = (async () => {
          try {
            const res = await fetchWithRetry(endpoint);
            const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);

            cachedAgents = data;
            cacheTimestamp = Date.now();

            return data;
          } finally {
            pendingRequest = null;
          }
        })();

        const data = await pendingRequest;
        setAgents(data);
        setError(null);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Unknown error";
        console.error("❌ [useAgentHealth] Fetch Error:", errorMsg);
        setError(errorMsg);
        setAgents(cachedAgents || []);
      }
    };

    fetchHealth();
  }, []);

  return { agents, error };
};
