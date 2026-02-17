// // // // server/src/services/wazuhService.js


import axios from "axios";
import https from "https";
import { logger } from "../config/logger.js";

import dotenv from "dotenv";
dotenv.config();


const {
  WAZUH_API_URL,
  WAZUH_API_USER,
  WAZUH_API_PASS,
  WAZUH_INDEXER_URL = "https://192.168.31.21:9200",
  WAZUH_INDEX_PATTERN = "wazuh-alerts-*",
  WAZUH_INDEXER_USER = "admin",
  WAZUH_INDEXER_PASS = "admin",
  WAZUH_REJECT_UNAUTHORIZED = "false",
} = process.env;

const httpsAgent = new https.Agent({
  rejectUnauthorized: WAZUH_REJECT_UNAUTHORIZED !== "false",
});

class WazuhService {
  constructor() {
    // Manager (cluster/system)
    this.managerUrl = WAZUH_API_URL;
    this.managerUser = WAZUH_API_USER;
    this.managerPass = WAZUH_API_PASS;

    // Indexer client
    this.client = axios.create({
      baseURL: WAZUH_INDEXER_URL,
      httpsAgent,
      auth: { username: WAZUH_INDEXER_USER, password: WAZUH_INDEXER_PASS },
      headers: { "Content-Type": "application/json" },
    });
  }

  // -------- Manager (optional) --------
  async managerGet(path, params = {}) {
    try {
      const tokenRes = await axios.post(
        `${this.managerUrl}/security/user/authenticate?raw=true`,
        {},
        {
          auth: { username: this.managerUser, password: this.managerPass },
          httpsAgent,
        }
      );
      const token = tokenRes.data;
      const res = await axios.get(`${this.managerUrl}${path}`, {
        params,
        httpsAgent,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      logger.error(`Manager API error [${path}]: ${error.message}`);
      throw error;
    }
  }

  async getSystemMetrics() {
    return this.managerGet("/cluster/status");
  }

  // -------- Indexer helpers --------
  async indexerPost(path, body = {}) {
    try {
      const { data } = await this.client.post(path, body);
      return data;
    } catch (error) {
      logger.error(`Indexer POST error [${path}]: ${error.message}`);
      if (error.response) {
        logger.error(
          `Indexer response: ${error.response.status}`,
          error.response.data
        );
      }
      throw error;
    }
  }



  // async getActiveAgents() {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.WAZUH_API_URL}/agents?status=active`,
  //       {
  //         auth: {
  //           username: process.env.WAZUH_API_USER,
  //           password: process.env.WAZUH_API_PASS
  //         },
  //         httpsAgent: new https.Agent({ rejectUnauthorized: false })
  //       }
  //     );

  //     const agents = response.data.data?.affected_items || [];
  //     return agents.map(a => ({
  //       name: a.name,
  //       id: a.id,
  //       status: a.status
  //     }));
  //   } catch (err) {
  //     console.error("❌ getActiveAgents error:", err.message);
  //     return [];
  //   }
  // }


  // async getActiveAgents() {
  //   try {
  //     const response = await axios.get(`${process.env.WAZUH_API_URL}/agents`, {
  //       auth: {
  //         username: process.env.WAZUH_API_USER,
  //         password: process.env.WAZUH_API_PASS
  //       },
  //       httpsAgent: new https.Agent({ rejectUnauthorized: false }) // for self-signed certs
  //     });

  //     const agents = response.data?.data?.affected_items || [];

  //     const activeAgents = agents
  //       .filter(agent => agent.status === "Active")
  //       .map(agent => ({
  //         id: agent.id,
  //         name: agent.name,
  //         status: agent.status,
  //         version: agent.version,
  //         ip: agent.ip
  //       }));

  //     return activeAgents;
  //   } catch (error) {
  //     console.error("❌ Error in getActiveAgents:", error.message);
  //     return [];
  //   }
  // }



  async getActiveAgents() {
    try {
      const response = await axios.get(
        `${process.env.WAZUH_API_URL}/agents?select=name,status,id`,
        {
          auth: {
            username: process.env.WAZUH_API_USER,
            password: process.env.WAZUH_API_PASS
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
      );

      const agents = response.data?.data?.affected_items || [];

      // Filter only active agents
      return agents.filter(agent => agent.status === "Active");
    } catch (err) {
      console.error("❌ getActiveAgents error:", err.message);
      return [];
    }
  }


  async getAgentHealth() {
    try {
      const url = `${process.env.WAZUH_API_URL}/agents`;
      console.log("🔍 [getAgentHealth] Fetching from:", url);
      console.log("🔍 [getAgentHealth] Auth user:", process.env.WAZUH_API_USER);

      const response = await axios.get(url, {
        auth: {
          username: process.env.WAZUH_API_USER,
          password: process.env.WAZUH_API_PASS
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      console.log("📡 [getAgentHealth] Response status:", response.status);
      console.log("📡 [getAgentHealth] Response data structure:", {
        hasData: !!response.data,
        hasDataKey: !!response.data?.data,
        hasAffectedItems: !!response.data?.data?.affected_items
      });

      const agents = response.data?.data?.affected_items || [];
      console.log("📡 [getAgentHealth] Raw agents count:", agents.length);
      console.log("📡 [getAgentHealth] Raw agents:", agents);

      // If no agents from API, extract from recent alerts
      if (agents.length === 0) {
        console.warn("⚠️ [getAgentHealth] No agents from /agents endpoint, extracting from alerts...");

        try {
          // Get recent alerts to extract agent names
          const alerts = await this.getSecurityAlerts({ size: 100, timeRange: "24h" });
          console.log("📡 [getAgentHealth] Fetched", alerts.length, "alerts for agent extraction");

          // Extract unique agent names and their last seen status
          const agentMap = new Map();
          alerts.forEach(alert => {
            const agentName = alert.agent?.name;
            if (agentName && !agentName.startsWith('MOCK_')) {
              if (!agentMap.has(agentName)) {
                agentMap.set(agentName, {
                  id: alert.agent?.id || "unknown",
                  name: agentName,
                  status: "active", // If sending alerts, it's active
                  version: alert.agent?.version || "unknown",
                  ip: alert.agent?.ip || "unknown",
                  lastSeen: alert["@timestamp"] || alert.timestamp
                });
              }
            }
          });

          const extractedAgents = Array.from(agentMap.values());
          console.log("✅ [getAgentHealth] Extracted", extractedAgents.length, "real agents from alerts");
          console.log("✅ [getAgentHealth] Agent names:", extractedAgents.map(a => a.name));

          if (extractedAgents.length > 0) {
            return extractedAgents;
          }

          // If still no agents, use mock data as last resort
          console.warn("⚠️ [getAgentHealth] No agents in alerts either, using MOCK data");
          return [
            { id: "001", name: "MOCK_web-server", status: "active", version: "4.5.0", ip: "192.168.1.10" },
            { id: "002", name: "MOCK_db-server", status: "active", version: "4.5.0", ip: "192.168.1.11" },
            { id: "003", name: "MOCK_app-server", status: "disconnected", version: "4.5.0", ip: "192.168.1.12" }
          ];
        } catch (alertError) {
          console.error("❌ [getAgentHealth] Failed to extract from alerts:", alertError.message);
          // Return mock data on alert extraction failure
          return [
            { id: "001", name: "MOCK_web-server", status: "active", version: "4.5.0", ip: "192.168.1.10" },
            { id: "002", name: "MOCK_db-server", status: "active", version: "4.5.0", ip: "192.168.1.11" },
            { id: "003", name: "MOCK_app-server", status: "disconnected", version: "4.5.0", ip: "192.168.1.12" }
          ];
        }
      }

      const mapped = agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        version: agent.version,
        ip: agent.ip
      }));

      console.log("✅ [getAgentHealth] Returning", mapped.length, "real agents");
      return mapped;
    } catch (error) {
      console.error("❌ [getAgentHealth] Error:", error.message);
      console.error("❌ [getAgentHealth] Error details:", error.response?.data || error.stack);

      // Return mock data on error as well
      console.warn("⚠️ [getAgentHealth] Error occurred, using MOCK data");
      return [
        { id: "001", name: "MOCK_web-server", status: "active", version: "4.5.0", ip: "192.168.1.10" },
        { id: "002", name: "MOCK_db-server", status: "active", version: "4.5.0", ip: "192.168.1.11" },
        { id: "003", name: "MOCK_app-server", status: "disconnected", version: "4.5.0", ip: "192.168.1.12" }
      ];
    }
  }

  async getAgentList() {
    try {
      const response = await axios.get(`${process.env.WAZUH_API_URL}/agents`, {
        auth: {
          username: process.env.WAZUH_API_USER,
          password: process.env.WAZUH_API_PASS
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      const agents = response.data?.data?.affected_items || [];

      return agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        version: agent.version,
        ip: agent.ip
      }));
    } catch (error) {
      console.error("❌ getAgentList error:", error.response?.data || error.message);
      return [];
    }
  }

  async getSecurityAlerts(agent) {
    try {
      const query = {
        size: 100,
        query: {
          term: { "agent.name.keyword": agent }
        },
        sort: [{ "@timestamp": { order: "desc" } }]
      };

      const response = await axios.post(`${process.env.WAZUH_INDEXER_URL}/wazuh-alerts-*/_search`, query, {
        auth: {
          username: process.env.WAZUH_INDEXER_USER,
          password: process.env.WAZUH_INDEXER_PASS
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      return response.data?.hits?.hits?.map(hit => hit._source) || [];
    } catch (error) {
      console.error("❌ getSecurityAlerts error:", error.response?.data || error.message);
      return [];
    }
  }




  // ---- Alerts helpers ----
  // async getTotalAlerts() {
  //   const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_count`, {});
  //   return data.count || 0;
  // }



  async getTotalAlerts() {
    const { data } = await this.client.get(`/${WAZUH_INDEX_PATTERN}/_count`);
    return data.count || 0;
  }


  // async getSecurityAlerts({ size = 50, from = 0, timeRange = "24h", level, agent } = {}) {
  //   const must = [
  //     { range: { "@timestamp": { gte: `now-${timeRange}`, lte: "now" } } },
  //   ];
  //   if (level) must.push({ range: { "rule.level": { gte: level } } });
  //   if (agent) must.push({
  //     //  term: { "agent.name": agent
  // term: {
  //       "agent.name.keyword": agent // ✅ exact match using keyword field
  //       } }); // no .keyword

  //   const body = {
  //     size,
  //     from,
  //     sort: [{ "@timestamp": { order: "desc" } }],
  //     query: { bool: { must } },
  //   };

  //   const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
  //   return (data.hits?.hits || []).map(h => h._source || h);
  // }



  async getSecurityAlerts({ size = 50, from = 0, timeRange = "24h", level, agent } = {}) {
    const must = [
      {
        range: {
          "@timestamp": {
            gte: `now-${timeRange}`,
            lte: "now"
          }
        }
      }
    ];

    // Optional severity filter
    if (level) {
      must.push({
        range: {
          "rule.level": {
            gte: level
          }
        }
      });
    }

    // Optional agent filter (skip if agent === "all")
    if (agent && agent !== "all") {
      must.push({
        term: {
          "agent.name.keyword": agent
        }
      });
    }

    const body = {
      size,
      from,
      sort: [{ "@timestamp": { order: "desc" } }],
      query: {
        bool: {
          must
        }
      }
    };

    try {
      const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
      return (data.hits?.hits || []).map(h => h._source || h);
    } catch (err) {
      console.error("❌ getSecurityAlerts failed:", err.response?.data || err.message);
      return [];
    }
  }




  async getRiskDistribution() {
    const body = {
      size: 0,
      aggs: {
        by_level: { terms: { field: "rule.level", size: 10 } },
        by_group: { terms: { field: "rule.groups", size: 10 } }, // no .keyword
      },
    };
    const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
    return {
      levels: data.aggregations?.by_level?.buckets || [],
      groups: data.aggregations?.by_group?.buckets || [],
    };
  }

  async getTopLogViews() {
    const body = {
      size: 0,
      aggs: {
        top_locations: { terms: { field: "location", size: 5 } }, // no .keyword
      },
    };
    const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
    return data.aggregations?.top_locations?.buckets || [];
  }

  async getFlowData() {
    const body = {
      size: 200,
      query: {
        match: { "data.event_type": "flow" }
      },
      sort: [{ "@timestamp": { order: "desc" } }]
    };
    const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
    return (data.hits?.hits || []).map(h => h._source || h);
  }



  async getMitreMap() {
    const body = {
      size: 0,
      aggs: {
        tactics: { terms: { field: "rule.mitre.tactic", size: 10 } },
        techniques: { terms: { field: "rule.mitre.technique", size: 20 } }
      }
    };
    const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
    return {
      tactics: data.aggregations?.tactics?.buckets || [],
      techniques: data.aggregations?.techniques?.buckets || []
    };
  }



  // Example: Networking (Suricata/IDS)
  async getNetworkingData() {
    const body = {
      size: 200,
      sort: [{ "@timestamp": { order: "desc" } }],
      query: {
        bool: {
          should: [
            { term: { "rule.groups": "suricata" } },
            { term: { "rule.groups": "ids" } }
          ],
          minimum_should_match: 1
        }
      }
    };
    const data = await this.indexerPost(`/${WAZUH_INDEX_PATTERN}/_search`, body);
    return (data.hits?.hits || []).map(h => h._source || h);
  }

  // You can add getMalwareData, getComplianceData, etc. here following the same pattern
  async getUserEndpointData() {
    try {
      const query = {
        size: 500,
        query: {
          bool: {
            should: [
              { match: { "rule.groups": "authentication" } },
              { match: { "rule.description": "login" } }
            ]
          }
        },
        sort: [{ "@timestamp": { order: "desc" } }]
      };

      const response = await axios.post(
        `${process.env.WAZUH_INDEXER_URL}/wazuh-alerts-*/_search`,
        query,
        {
          auth: {
            username: process.env.WAZUH_INDEXER_USER,
            password: process.env.WAZUH_INDEXER_PASS
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
      );

      const alerts = response.data?.hits?.hits?.map(hit => hit._source) || [];
      console.log("📦 Raw Elasticsearch hits:", alerts);

      const logonMap = {};
      const locations = [];
      let compliant = 0;
      let total = 0;

      for (const alert of alerts) {
        const user = alert.user?.name || alert.agent?.name || "unknown";
        const desc = alert.rule?.description?.toLowerCase() || "";

        if (!logonMap[user]) logonMap[user] = { user, success: 0, failure: 0 };

        if (desc.includes("success") || desc.includes("accept")) logonMap[user].success++;
        if (desc.includes("fail") || desc.includes("reject")) logonMap[user].failure++;

        if (alert.location?.lat && alert.location?.lon) {
          locations.push({ lat: alert.location.lat, lon: alert.location.lon });
        }

        if (alert.rule?.groups?.includes("pci_dss_10.2")) {
          total++;
          if (alert.compliance?.status === "passed") compliant++;
        }
      }

      const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

      return {
        logons: Object.values(logonMap),
        locations,
        compliance
      };
    } catch (error) {
      console.error("❌ getUserEndpointData error:", error.response?.data || error.message);
      return { logons: [], locations: [], compliance: 0 };
    }
  }




  async getCompliance() {
    try {
      const query = {
        size: 500,
        query: {
          bool: {
            should: [
              { match: { "rule.groups": "pci_dss_10.2" } },
              { match: { "rule.groups": "policy_violation" } }
            ]
          }
        },
        sort: [{ "@timestamp": { order: "desc" } }]
      };

      const response = await axios.post(
        `${process.env.WAZUH_INDEXER_URL}/wazuh-alerts-*/_search`,
        query,
        {
          auth: {
            username: process.env.WAZUH_INDEXER_USER,
            password: process.env.WAZUH_INDEXER_PASS
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
      );

      const alerts = response.data?.hits?.hits?.map(hit => hit._source) || [];
      console.log("📦 Raw compliance alerts:", alerts);

      const auditChart = [];
      const policyViolations = [];

      for (const alert of alerts) {
        const ts = alert["@timestamp"];
        const desc = alert.rule?.description || "Unknown violation";

        if (alert.rule?.groups?.includes("pci_dss_10.2")) {
          const hour = new Date(ts).toISOString().slice(0, 13) + ":00:00Z";
          const existing = auditChart.find(a => a.time === hour);
          if (existing) existing.volume++;
          else auditChart.push({ time: hour, volume: 1 });
        }

        if (alert.rule?.groups?.includes("policy_violation")) {
          policyViolations.push({ description: desc, timestamp: ts });
        }
      }

      return { auditChart, policyViolations };
    } catch (error) {
      console.error("❌ getComplianceData error:", error.response?.data || error.message);
      return { auditChart: [], policyViolations: [] };
    }
  }

  async getMitreAlerts(technique) {
    const query = {
      size: 50,
      query: { match: { "rule.mitre.id": technique } },
      sort: [{ "@timestamp": { order: "desc" } }]
    };

    const response = await axios.post(
      `${process.env.WAZUH_INDEXER_URL}/wazuh-alerts-*/_search`,
      query,
      {
        auth: {
          username: process.env.WAZUH_INDEXER_USER,
          password: process.env.WAZUH_INDEXER_PASS
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    return response.data?.hits?.hits?.map(hit => hit._source) || [];
  }


  async getToken() {
    try {
      console.log("🔗 Authenticating with:", `${this.managerUrl}/security/user/authenticate`);
      const res = await axios.post(
        `${this.managerUrl}/security/user/authenticate`,
        {
          username: this.managerUser,
          password: this.managerPass,
        },
        {
          headers: { "Content-Type": "application/json" },
          httpsAgent,
        }
      );
      return res.data.data.token;
    } catch (err) {
      logger.error("❌ Failed to get Wazuh token", err.message);
      throw err;
    }
  }


  async getNetworkingAlerts(token) {
    try {
      const res = await axios.get(
        `${WAZUH_API_URL}/alerts?limit=1000&sort=-timestamp`,
        {
          headers: { Authorization: `Bearer ${token}` },
          httpsAgent,
        }
      );
      return res.data.data.affected_items || [];
    } catch (err) {
      logger.error("❌ Failed to fetch networking alerts", err.message);
      throw err;
    }
  }


}



export const wazuhService = new WazuhService();
