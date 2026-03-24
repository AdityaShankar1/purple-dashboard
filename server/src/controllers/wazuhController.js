// server/src/controllers/wazuhController.js

import { wazuhService } from "../services/wazuhService.js";
import { createHttpError } from "../utils/errors.js";
import { logger } from "../config/logger.js";

// Cache for agent health to prevent rate limiting
let agentHealthCache = {
  data: null,
  timestamp: 0,
  duration: 30000, // 30 seconds
};

// ===== Alert Count =====
export const fetchAlertsCount = async (req, res, next) => {
  try {
    const { timeRange } = req.query;
    const count = await wazuhService.getTotalAlerts(timeRange);
    res.status(200).json({ count });
  } catch (err) {
    logger.error(`Failed to fetch alerts count: ${err.message}`);
    next(createHttpError(500, "Failed to fetch alerts count"));
  }
};

// ===== Metrics =====
export const fetchMetrics = async (_req, res, next) => {
  try {
    const count = await wazuhService.getTotalAlerts();
    const alerts = await wazuhService.getSecurityAlerts({ size: 1000, timeRange: "24h" }) || [];
    const last24hCount = await wazuhService.getTotalAlerts("24h");
    res.status(200).json({ count, alerts, last24hCount });
  } catch (err) {
    logger.error(`Failed to fetch metrics: ${err.message}`);
    next(createHttpError(500, "Failed to fetch metrics"));
  }
};

// ===== Incidents =====
export const fetchIncidents = async (_req, res, next) => {
  try {
    const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
    res.status(200).json({ incidents });
  } catch (err) {
    logger.error(`Failed to fetch incidents: ${err.message}`);
    next(createHttpError(500, "Failed to fetch incidents"));
  }
};

// ===== Threat Intel =====
export const fetchThreatIntel = async (req, res, next) => {
  try {
    const { assetRange = "7d" } = req.query;

    // 1. Fetch general recent alerts for map and actors (using 90d for better coverage on map)
    const alerts = await wazuhService.getSecurityAlerts({ size: 1000, timeRange: "90d" });

    // 2. Fetch specific vulnerability alerts for the requested range
    const vulnAlerts = await wazuhService.indexerPost(`/${wazuhService.indexPattern}/_search`, {
      size: 100,
      sort: [{ "@timestamp": { order: "desc" } }],
      query: {
        bool: {
          must: [
            { range: { "@timestamp": { gte: `now-${assetRange}`, lte: "now" } } },
            {
              bool: {
                should: [
                  { match: { "rule.groups": "vulnerability-detector" } },
                  { match: { "rule.groups": "vulnerability" } }
                ],
                minimum_should_match: 1
              }
            }
          ]
        }
      }
    }).then(d => (d.hits?.hits || []).map(h => h._source || h)).catch(() => []);

    const global = alerts
      .filter(a => a.agent?.geo?.latitude && a.agent?.geo?.longitude && a.agent?.geo?.country_name)
      .reduce((acc, a) => {
        const country = a.agent.geo.country_name;
        if (!acc[country]) {
          acc[country] = { count: 0, lat: a.agent.geo.latitude, lon: a.agent.geo.longitude };
        }
        acc[country].count++;
        return acc;
      }, {});

    const globalMarkers = Object.entries(global).map(([name, data]) => ({
      name,
      coordinates: [data.lon, data.lat],
      count: data.count,
    }));

    const actors = alerts.reduce((acc, a) => {
      let tactic = Array.isArray(a.rule?.mitre?.tactic) ? a.rule.mitre.tactic[0] : a.rule?.mitre?.tactic;
      if (!tactic || String(tactic).toLowerCase() === "unknown") return acc;
      acc[tactic] = (acc[tactic] || 0) + 1;
      return acc;
    }, {});

    const actorsChart = Object.entries(actors)
      .map(([actor, activity]) => ({ actor, activity }))
      .sort((a, b) => b.activity - a.activity);

    // Filter general alerts for vulnerabilities in the requested assetRange as well
    const rangeThreshold = new Date();
    if (assetRange.endsWith('d')) rangeThreshold.setDate(rangeThreshold.getDate() - parseInt(assetRange));
    else if (assetRange.endsWith('m')) rangeThreshold.setMonth(rangeThreshold.getMonth() - parseInt(assetRange));
    else rangeThreshold.setHours(rangeThreshold.getHours() - parseInt(assetRange));

    const generalVulns = alerts.filter(a => {
      const isVuln = a.rule?.groups?.includes("vulnerability-detector") || a.rule?.groups?.includes("vulnerability");
      const inRange = new Date(a["@timestamp"]) >= rangeThreshold;
      return isVuln && inRange;
    });

    const allPotentialVulns = [...vulnAlerts, ...generalVulns];

    const assets = allPotentialVulns
      .slice(0, 15)
      .map(asset => {
        const timestamp = asset["@timestamp"];
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        let ago = "";
        if (diffDays > 0) ago = `${diffDays}d ago`;
        else if (diffHours > 0) ago = `${diffHours}h ago`;
        else ago = "just now";

        return {
          name: asset.agent?.name || "unknown",
          status: "Vulnerable",
          time: ago,
          timestamp: timestamp,
          vulnerability: asset.rule?.description || "N/A",
        };
      });

    const recent24hAlerts = await wazuhService.getSecurityAlerts({ size: 1000, timeRange: "24h" }) || [];
    const incidentSeverity = {
      high: recent24hAlerts.filter(a => (a.rule?.level || 0) >= 12).length,
      medium: recent24hAlerts.filter(a => (a.rule?.level || 0) >= 7 && (a.rule?.level || 0) <= 11).length,
      low: recent24hAlerts.filter(a => (a.rule?.level || 0) <= 6).length,
    };

    res.status(200).json({ global: globalMarkers, actors: actorsChart, assets, incidentSeverity });
  } catch (err) {
    logger.error(`Failed to fetch threat intel: ${err.message}`);
    next(createHttpError(500, "Failed to fetch threat intel"));
  }
};

// ===== Agent List =====
export const fetchAgentList = async (_req, res) => {
  try {
    const agents = await wazuhService.getActiveAgents();
    const mapped = agents.map(a => ({
      id: a.id,
      name: a.name,
      status: a.status,
    }));
    res.status(200).json(mapped);
  } catch (err) {
    logger.error(`Failed to fetch agent list: ${err.message}`);
    res.status(500).json({ error: "Unable to fetch agent list" });
  }
};

// ===== Agent Health =====
export const fetchAgentHealth = async (_req, res) => {
  try {
    const now = Date.now();
    if (agentHealthCache.data && (now - agentHealthCache.timestamp < agentHealthCache.duration)) {
      return res.status(200).json(agentHealthCache.data);
    }

    const agents = await wazuhService.getAgentHealth();
    const mapped = agents.map(a => ({
      name: a.name,
      status: a.status,
    }));

    agentHealthCache.data = mapped;
    agentHealthCache.timestamp = now;

    res.status(200).json(mapped);
  } catch (err) {
    logger.error(`Failed to fetch agent health: ${err.message}`);
    if (agentHealthCache.data) return res.status(200).json(agentHealthCache.data);
    res.status(500).json({ error: "Unable to fetch agent health" });
  }
};

// ===== Active Agents =====
export const fetchActiveAgents = async (_req, res) => {
  try {
    const agents = await wazuhService.getActiveAgents();
    res.status(200).json(agents);
  } catch (err) {
    logger.error(`Failed to fetch active agents: ${err.message}`);
    res.status(500).json({ error: "Unable to fetch active agents" });
  }
};

// ===== Networking =====
export const fetchNetworking = async (req, res, next) => {
  try {
    const { range = "24h" } = req.query;
    let flowAlerts = await wazuhService.getNetworkingData({ timeRange: range });
    if (flowAlerts.length === 0) {
      flowAlerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: range });
    }

    const traffic = flowAlerts.map(a => ({
      "@timestamp": a["@timestamp"],
      data: {
        inbound: a.data?.flow?.bytes_toclient || 0,
        outbound: a.data?.flow?.bytes_toserver || 0,
      }
    }));

    const firewallCounts = flowAlerts.reduce((acc, a) => {
      const proto = a.data?.proto || a.data?.flow?.protocol || a.rule?.groups?.[0] || "unknown";
      acc[proto] = (acc[proto] || 0) + 1;
      return acc;
    }, {});

    const firewall = Object.entries(firewallCounts).map(([protocol, count]) => ({ protocol, count }));

    const malware = flowAlerts
      .filter(a => a.rule?.groups?.includes("malware") || a.rule?.groups?.includes("phishing") || (a.rule?.level >= 10))
      .map(a => ({
        rule: { description: a.rule?.description },
        agent: { name: a.agent?.name || "unknown" },
        "@timestamp": a["@timestamp"],
      }));

    res.status(200).json({ traffic, firewall, malware });
  } catch (err) {
    logger.error(`Failed to fetch networking data: ${err.message}`);
    next(createHttpError(500, "Failed to fetch networking data"));
  }
};

// ===== Agent Details =====
export const fetchAgentDetails = async (req, res) => {
  try {
    const agentName = req.params.name;
    let alerts = await wazuhService.getSecurityAlerts({ agent: agentName, size: 100 });

    if ((!alerts || alerts.length === 0) && agentName && agentName !== "all") {
      const allAlerts = await wazuhService.getSecurityAlerts({ size: 1000 });
      const normalize = s => (s || "").toString().toLowerCase().replace(/[^a-z0-9]/g, "");
      const needle = normalize(agentName);
      alerts = (allAlerts || []).filter(a => normalize(a.agent?.name).includes(needle)).slice(0, 200);
    }

    const mitre = (alerts || []).reduce((acc, a) => {
      const tactic = a.rule?.mitre?.tactic;
      const technique = a.rule?.mitre?.technique;

      [tactic, technique].forEach((field, idx) => {
        const target = idx === 0 ? acc.tactics : acc.techniques;
        if (Array.isArray(field)) field.forEach(f => target[f] = (target[f] || 0) + 1);
        else if (typeof field === "string") target[field] = (target[field] || 0) + 1;
      });
      return acc;
    }, { tactics: {}, techniques: {} });

    res.status(200).json({
      agent: agentName,
      alerts: Array.isArray(alerts) ? alerts : [],
      mitre: {
        tactics: Object.entries(mitre.tactics).map(([key, count]) => ({ key, count })),
        techniques: Object.entries(mitre.techniques).map(([key, count]) => ({ key, count })),
      },
    });
  } catch (err) {
    logger.error(`Failed to fetch agent details: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch agent details" });
  }
};

// ===== User Endpoint =====
export const fetchUserEndpoint = async (_req, res) => {
  try {
    const data = await wazuhService.getUserEndpointData();
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Failed to fetch user endpoint data: ${err.message}`);
    res.status(500).json({ message: "Failed to fetch user endpoint data" });
  }
};

// ===== Compliance =====
export const getComplianceData = async (_req, res) => {
  try {
    const data = await wazuhService.getCompliance();
    res.json({
      auditChart: data.auditChart || [],
      policyViolations: data.policyViolations || [],
    });
  } catch (err) {
    logger.error(`Failed to fetch compliance data: ${err.message}`);
    res.status(500).json({
      message: "Failed to fetch compliance data",
      auditChart: [],
      policyViolations: [],
    });
  }
};

// ===== Train & Test =====
export const fetchTrainTest = async (_req, res, next) => {
  try {
    const body = {
      size: 0,
      aggs: {
        train: { filter: { term: { "rule.groups": "train" } } },
        test: { filter: { term: { "rule.groups": "test" } } },
      },
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    res.status(200).json([
      { name: "Train", value: data.aggregations.train.doc_count },
      { name: "Test", value: data.aggregations.test.doc_count },
    ]);
  } catch (err) {
    logger.error(`Failed to fetch train/test data: ${err.message}`);
    next(createHttpError(500, "Failed to fetch train/test data"));
  }
};

// ===== Trending =====
export const fetchTrending = async (req, res, next) => {
  try {
    const { range = "7d", interval = "1h" } = req.query;

    const body = {
      size: 0,
      query: {
        range: { "@timestamp": { gte: `now-${range}`, lte: "now" } }
      },
      aggs: {
        trend: {
          date_histogram: {
            field: "@timestamp",
            fixed_interval: interval,
            min_doc_count: 0,
            extended_bounds: {
              min: `now-${range}`,
              max: "now"
            }
          },
          aggs: { level_avg: { avg: { field: "rule.level" } } },
        },
      },
    };

    const data = await wazuhService.indexerPost(`/${wazuhService.indexPattern}/_search`, body);
    const trend = data.aggregations.trend.buckets.map(b => ({
      time: b.key_as_string,
      alerts: b.doc_count,
      severity: Math.round(b.level_avg.value || 0),
    }));
    res.status(200).json(trend);
  } catch (err) {
    logger.error(`Failed to fetch trending data: ${err.message}`);
    next(createHttpError(500, "Failed to fetch trending data"));
  }
};

// ===== Threat Tags =====
export const fetchThreatTags = async (_req, res, next) => {
  try {
    const body = {
      size: 0,
      aggs: {
        tags: { terms: { field: "rule.groups", size: 10 } },
      },
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    const tags = data.aggregations.tags.buckets.map(b => ({
      tag: b.key,
      count: b.doc_count,
    }));
    res.status(200).json(tags);
  } catch (err) {
    logger.error(`Failed to fetch threat tags: ${err.message}`);
    next(createHttpError(500, "Failed to fetch threat tags"));
  }
};

// ===== Mitre Map =====
export const fetchMitreMap = async (_req, res, next) => {
  try {
    const data = await wazuhService.getMitreMap();
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Failed to fetch Mitre map: ${err.message}`);
    next(createHttpError(500, "Failed to fetch Mitre map"));
  }
};

// ===== Mitre Alerts =====
export const fetchMitreAlerts = async (req, res) => {
  try {
    const technique = req.query.technique;
    const body = {
      size: 50,
      query: technique ? {
        bool: {
          should: [
            { match: { "rule.mitre.id": technique } },
            { match: { "rule.mitre.technique": technique } }
          ],
          minimum_should_match: 1
        }
      } : { exists: { field: "rule.mitre.id" } },
      sort: [{ "@timestamp": { order: "desc" } }]
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    res.json({ alerts: data.hits?.hits?.map(h => h._source) || [] });
  } catch (err) {
    logger.error(`Failed to fetch Mitre alerts: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

// ===== Security Alerts (Specific Agent) =====
export const fetchSecurityAlerts = async (req, res) => {
  try {
    const agent = req.params.agent;
    const alerts = await wazuhService.getSecurityAlerts({ agent, size: 50 });
    res.status(200).json({ alerts });
  } catch (err) {
    logger.error(`Failed to fetch security alerts: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch security alerts" });
  }
};
