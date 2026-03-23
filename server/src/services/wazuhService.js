// server/src/services/wazuhService.js

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

    this.indexPattern = WAZUH_INDEX_PATTERN;
  }

  // -------- Manager Helpers --------
  async managerGet(path, params = {}) {
    try {
      const token = await this.getToken();
      const res = await axios.get(`${this.managerUrl}${path}`, {
        params,
        httpsAgent,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      logger.error(`Manager API GET error [${path}]: ${error.message}`);
      throw error;
    }
  }

  async getSystemMetrics() {
    return this.managerGet("/cluster/status");
  }

  async getToken() {
    try {
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
      return res.data?.data?.token || res.data; // Handle both raw and wrapped formats
    } catch (err) {
      logger.error(`Failed to get Wazuh token: ${err.message}`);
      throw err;
    }
  }

  // -------- Indexer Helpers --------
  async indexerPost(path, body = {}) {
    try {
      const { data } = await this.client.post(path, body);
      return data;
    } catch (error) {
      logger.error(`Indexer POST error [${path}]: ${error.message}`);
      if (error.response) {
        logger.error(`Indexer response: ${error.response.status}`, error.response.data);
      }
      throw error;
    }
  }

  // -------- Active Agents --------
  async getActiveAgents() {
    try {
      const token = await this.getToken();
      const response = await axios.get(
        `${this.managerUrl}/agents?select=name,status,id&status=active`,
        {
          headers: { Authorization: `Bearer ${token}` },
          httpsAgent,
        }
      );
      return response.data?.data?.affected_items || [];
    } catch (err) {
      logger.error(`getActiveAgents error: ${err.message}`);
      return [];
    }
  }

  async getAgentHealth() {
    try {
      const token = await this.getToken();
      const response = await axios.get(`${this.managerUrl}/agents`, {
        headers: { Authorization: `Bearer ${token}` },
        httpsAgent,
      });

      const agents = response.data?.data?.affected_items || [];
      if (agents.length === 0) {
        return await this._extractAgentsFromAlerts();
      }

      return agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        version: agent.version,
        ip: agent.ip
      }));
    } catch (error) {
      logger.error(`getAgentHealth error: ${error.message}`);
      return await this._extractAgentsFromAlerts();
    }
  }

  async _extractAgentsFromAlerts() {
    try {
      const alerts = await this.getSecurityAlerts({ size: 200, timeRange: "24h" });
      const agentMap = new Map();

      alerts.forEach(alert => {
        const agentName = alert.agent?.name;
        if (agentName && !agentName.startsWith('MOCK_')) {
          if (!agentMap.has(agentName)) {
            agentMap.set(agentName, {
              id: alert.agent?.id || "unknown",
              name: agentName,
              status: "active",
              version: alert.agent?.version || "unknown",
              ip: alert.agent?.ip || "unknown"
            });
          }
        }
      });

      const extracted = Array.from(agentMap.values());
      if (extracted.length > 0) return extracted;

      return [
        { id: "001", name: "MOCK_web-server", status: "active" },
        { id: "002", name: "MOCK_db-server", status: "active" },
        { id: "003", name: "MOCK_app-server", status: "disconnected" }
      ];
    } catch (err) {
      return [{ id: "001", name: "MOCK_web-server", status: "active" }];
    }
  }

  // -------- Alerts --------
  async getTotalAlerts(timeRange) {
    try {
      const path = `/${this.indexPattern}/_count`;
      if (!timeRange || timeRange === "all") {
        const { data } = await this.client.get(path);
        return data.count || 0;
      }
      const body = {
        query: {
          range: {
            "@timestamp": {
              gte: `now-${timeRange}`,
              lte: "now"
            }
          }
        }
      };
      const data = await this.indexerPost(path, body);
      return data.count || 0;
    } catch (err) {
      logger.error(`getTotalAlerts failed: ${err.message}`);
      return 0;
    }
  }

  async getSecurityAlerts({ size = 50, from = 0, timeRange = "24h", level, agent } = {}) {
    const must = [
      { range: { "@timestamp": { gte: `now-${timeRange}`, lte: "now" } } }
    ];

    if (level) {
      must.push({ range: { "rule.level": { gte: level } } });
    }

    if (agent && agent !== "all") {
      must.push({ term: { "agent.name.keyword": agent } });
    }

    const body = {
      size,
      from,
      sort: [{ "@timestamp": { order: "desc" } }],
      query: { bool: { must } }
    };

    try {
      const data = await this.indexerPost(`/${this.indexPattern}/_search`, body);
      return (data.hits?.hits || []).map(h => h._source || h);
    } catch (err) {
      logger.error(`getSecurityAlerts failed: ${err.message}`);
      return [];
    }
  }

  // -------- Specific Modules --------
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
    try {
      const data = await this.indexerPost(`/${this.indexPattern}/_search`, body);
      return (data.hits?.hits || []).map(h => h._source || h);
    } catch (err) {
      logger.error(`getNetworkingData failed: ${err.message}`);
      return [];
    }
  }

  async getUserEndpointData() {
    try {
      const query = {
        size: 500,
        query: {
          bool: {
            should: [
              { match: { "rule.groups": "authentication" } },
              { match: { "rule.groups": "authentication_success" } },
              { match: { "rule.groups": "authentication_failed" } },
              { match: { "rule.groups": "windows" } },
              { match: { "rule.groups": "pam" } },
              { match: { "rule.groups": "sshd" } },
              { match: { "rule.groups": "win_authentication" } },
              { match: { "rule.description": "logon" } },
              { match: { "rule.description": "login" } },
            ],
            minimum_should_match: 1,
          }
        },
        sort: [{ "@timestamp": { order: "desc" } }]
      };

      const data = await this.indexerPost(`/${this.indexPattern}/_search`, query);
      const alerts = data.hits?.hits?.map(hit => hit._source) || [];

      const logonMap = {};
      const locations = [];
      let compliant = 0;
      let total = 0;

      for (const alert of alerts) {
        const user = alert.data?.win?.eventdata?.targetUserName || alert.user?.name || alert.agent?.name || "unknown";
        const desc = (alert.rule?.description || "").toLowerCase();

        if (!logonMap[user]) logonMap[user] = { user, success: 0, failure: 0 };

        const isSuccess = desc.includes("success") || desc.includes("accepted") || desc.includes("logon success") || desc.includes("session opened");
        const isFailure = desc.includes("fail") || desc.includes("invalid") || desc.includes("reject") || desc.includes("denied") || desc.includes("error");

        if (isSuccess) logonMap[user].success++;
        if (isFailure) logonMap[user].failure++;
        if (!isSuccess && !isFailure) logonMap[user].success++;

        if (alert.location?.lat && alert.location?.lon) {
          locations.push({ lat: alert.location.lat, lon: alert.location.lon });
        }

        if (alert.rule?.groups?.includes("pci_dss_10.2")) {
          total++;
          if (alert.compliance?.status === "passed") compliant++;
        }
      }

      const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;
      const logons = Object.values(logonMap).filter(l => l.success > 0 || l.failure > 0);

      return { logons, locations, compliance };
    } catch (error) {
      logger.error(`getUserEndpointData error: ${error.message}`);
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

      const data = await this.indexerPost(`/${this.indexPattern}/_search`, query);
      const alerts = data.hits?.hits?.map(hit => hit._source) || [];

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
      logger.error(`getCompliance error: ${error.message}`);
      return { auditChart: [], policyViolations: [] };
    }
  }

  async getMitreMap() {
    const body = {
      size: 0,
      aggs: {
        tactics: { terms: { field: "rule.mitre.tactic", size: 10 } },
        techniques: { terms: { field: "rule.mitre.technique", size: 20 } }
      }
    };
    try {
      const data = await this.indexerPost(`/${this.indexPattern}/_search`, body);
      return {
        tactics: data.aggregations?.tactics?.buckets || [],
        techniques: data.aggregations?.techniques?.buckets || []
      };
    } catch (err) {
      logger.error(`getMitreMap failed: ${err.message}`);
      return { tactics: [], techniques: [] };
    }
  }
}

export const wazuhService = new WazuhService();
