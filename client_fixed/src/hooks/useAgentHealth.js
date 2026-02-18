/**
 * BUG FIX LOG (2026-02-18):
 * 
 * ISSUE #1: HTTP 429 TooMany Requests Errors
 * - SYMPTOM: Navigating between Networking and Threat Intelligence pages triggered
 *   "HTTP 429: Too Many Requests" from the Wazuh API
 * - ROOT CAUSE: No request deduplication. When both pages loaded simultaneously, they
 *   both called useAgentHealth() which immediately fetched without checking if another
 *   fetch was already in progress, resulting in duplicate concurrent requests
 * - SOLUTION: Implemented module-level `pendingRequest` tracking. When a request is
 *   in flight, new callers wait for that result instead of making new requests.
 * 
 * ISSUE #2: Race Condition with Rate Limiting Retries
 * - SYMPTOM: After rate limit, retries would fail silently or respond with 429 again
 * - ROOT CAUSE: No exponential backoff. Retrying immediately caused requests to hit
 *   the same rate limit threshold again.
 * - SOLUTION: Implemented exponential backoff with Math.pow(2, attempt) delays.
 *   Attack sequences: 1st retry=1s, 2nd retry=2s, 3rd retry=4s. This gives the API
 *   time to reset rate limit counters.
 * 
 * ISSUE #3: Stale Data During API Failures
 * - SYMPTOM: If fetch failed, page would show empty agent list despite having
 *   previously successful data
 * - ROOT CAUSE: On errors, the hook would set `setAgents([])` losing all previous data
 * - SOLUTION: Implemented response caching with 60-second TTL (Time To Live).
 *   On errors, falls back to cached data instead of showing empty state. Also,
 *   if requests succeed, updates the cache so data persists across page refreshes.
 * 
 * ISSUE #4: Undefined Error Messages in Exception Handling
 * - SYMPTOM: Runtime error "Cannot read properties of undefined (reading 'message')"
 *   when accessing err.message after a thrown lastError
 * - ROOT CAUSE: lastError could be undefined. When no error was caught or in certain
 *   code paths, throwing an undefined variable caused subsequent error handlers to fail
 * - SOLUTION: Always initialize lastError to a valid Error object. Use safe property
 *   access with `(err && err.message)` and ensure caught errors are always Error instances
 *   with `err instanceof Error ? err : new Error(String(err))`
 */

import { useEffect, useState } from "react";

// ============ MODULE-LEVEL CACHE FOR DEDUPLICATION ============
// These prevent duplicate requests when multiple components mount simultaneously
let cachedAgents = null;
let cacheTimestamp = 0;
let pendingRequest = null;
const CACHE_DURATION = 60000; // 60 seconds cache

// ============ RETRY FUNCTION WITH EXPONENTIAL BACKOFF ============
/**
 * Attempts to fetch a URL with automatic retries on 429 (rate limit) errors
 * Uses exponential backoff to avoid slamming the API again
 * 
 * Strategy:
 * - Attempt 1 fails with 429? Wait 1 second, then retry
 * - Attempt 2 fails with 429? Wait 2 seconds, then retry
 * - Attempt 3 fails with 429? Wait 4 seconds, then retry
 * - All attempts exhausted? Throw error with full context
 */
const fetchWithRetry = async (url, maxRetries = 3, initialDelay = 1000) => {
  let lastError = new Error("Unknown error");
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      
      console.log(`📡 [useAgentHealth] Attempt ${attempt + 1}/${maxRetries} - Status: ${res.status}`);
      
      if (res.status === 429) {
        // Too Many Requests - wait and retry
        const delay = initialDelay * Math.pow(2, attempt);
        lastError = new Error(`HTTP 429: Too Many Requests (Attempt ${attempt + 1}/${maxRetries})`);
        console.warn(`⏳ [useAgentHealth] Rate limited. Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue; // Continue to next attempt
      }
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      return res; // Success - return response
    } catch (err) {
      // Ensure err is always an Error object
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.warn(`⚠️ [useAgentHealth] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, delay));
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
        // ============ CACHE CHECK ============
        // If we have valid cached data from recent fetch, use it and skip API call
        if (cachedAgents && Date.now() - cacheTimestamp < CACHE_DURATION) {
          console.log("✅ [useAgentHealth] Using cached agents:", cachedAgents.length);
          setAgents(cachedAgents);
          setError(null);
          return;
        }

        // ============ REQUEST DEDUPLICATION ============
        // If another component is already fetching, wait for that result instead of
        // making a second request. This prevents the 429 rate limit error from multiple
        // simultaneous requests (e.g., when Networking and Threat Intelligence pages load)
        if (pendingRequest) {
          console.log("⏳ [useAgentHealth] Waiting for pending request...");
          const data = await pendingRequest;
          setAgents(data);
          setError(null);
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
        const fullUrl = `${apiUrl}/wazuh/agent-health`;

        console.log("🔍 [useAgentHealth] Fetching from:", fullUrl);

        // ============ FETCH WITH RETRY LOGIC ============
        // Create and store a promise for this request so other components can wait for it
        pendingRequest = (async () => {
          try {
            const res = await fetchWithRetry(fullUrl);
            const text = await res.text();
            console.log("📄 [useAgentHealth] Raw response text:", text.substring(0, 200));

            let json;
            try {
              json = JSON.parse(text);
              console.log("✅ [useAgentHealth] Parsed JSON:", json);
            } catch (parseErr) {
              console.error("❌ [useAgentHealth] JSON Parse Error:", parseErr.message);
              throw new Error(`JSON Parse Error: ${parseErr.message}`);
            }

            // ============ RESPONSE NORMALIZATION ============
            // Handle multiple possible response formats from different endpoints
            const data = Array.isArray(json) ? json : (json?.data || []);
            console.log("✅ [useAgentHealth] Final data array:", data);
            console.log("✅ [useAgentHealth] Agent count:", data.length);

            // ============ UPDATE CACHE ============
            // Store successful response so subsequent calls within 60s use cached data
            cachedAgents = data;
            cacheTimestamp = Date.now();

            return data;
          } finally {
            // Clear the pending request reference so next call will fetch fresh data
            pendingRequest = null;
          }
        })();

        const data = await pendingRequest;
        setAgents(data);
        setError(null);
      } catch (err) {
        // ============ ERROR HANDLING WITH CACHE FALLBACK ============
        // Safe property access: ensure err exists before accessing .message
        const errorMsg = (err && err.message) || "Unknown error";
        console.error("❌ [useAgentHealth] Fetch Error:", errorMsg);
        console.error("❌ [useAgentHealth] Full error:", err);
        setError(errorMsg);
        // Fall back to cached data on error instead of showing empty list
        setAgents(cachedAgents || []);
      }
    };

    fetchHealth();
  }, []);

  return { agents, error };
};
