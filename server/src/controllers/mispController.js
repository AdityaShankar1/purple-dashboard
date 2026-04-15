// server/src/controllers/mispController.js

import { wazuhService } from "../services/wazuhService.js";
import { logger } from "../config/logger.js";

// ===== MISP Alerts =====
export const fetchMispAlerts = async (req, res) => {
  try {
    const { timeRange = "7d", size = 200, from = 0 } = req.query;
    const alerts = await wazuhService.getMispAlerts({
      timeRange,
      size: parseInt(size, 10),
      from: parseInt(from, 10),
    });

    // Parse full_log to extract structured MISP fields
    const parsed = alerts.map((alert) => {
      const fullLog = alert.full_log || "";
      const srcipMatch = fullLog.match(/srcip=(\S+)/);
      const resultMatch = fullLog.match(/result=(\S+)/);

      return {
        timestamp: alert["@timestamp"],
        srcip: srcipMatch ? srcipMatch[1] : "N/A",
        result: resultMatch ? resultMatch[1] : "N/A",
        agentName: alert.agent?.name || "unknown",
        agentId: alert.agent?.id || "unknown",
        ruleId: alert.rule?.id || "N/A",
        ruleLevel: alert.rule?.level || 0,
        ruleDescription: alert.rule?.description || "N/A",
        ruleGroups: alert.rule?.groups || [],
        fullLog,
        managerName: alert.manager?.name || "unknown",
        location: alert.location || "N/A",
      };
    });

    res.status(200).json({ alerts: parsed, total: parsed.length });
  } catch (err) {
    logger.error(`Failed to fetch MISP alerts: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch MISP alerts", alerts: [], total: 0 });
  }
};

// ===== MISP Stats (for charts) =====
export const fetchMispStats = async (req, res) => {
  try {
    const { timeRange = "7d" } = req.query;
    const stats = await wazuhService.getMispStats({ timeRange });

    // Also fetch raw alerts to compute unique IPs and latest timestamp
    const alerts = await wazuhService.getMispAlerts({ timeRange, size: 500 });

    const uniqueIps = new Set();
    let latestTimestamp = null;

    alerts.forEach((alert) => {
      const fullLog = alert.full_log || "";
      const srcipMatch = fullLog.match(/srcip=(\S+)/);
      if (srcipMatch) uniqueIps.add(srcipMatch[1]);

      const ts = alert["@timestamp"];
      if (!latestTimestamp || new Date(ts) > new Date(latestTimestamp)) {
        latestTimestamp = ts;
      }
    });

    // Calculate alerts per hour average
    let hoursMultiplier = 1;
    if (timeRange.endsWith("d")) hoursMultiplier = 24;
    else if (timeRange.endsWith("h")) hoursMultiplier = 1;
    const totalHoursCalc = (parseInt(timeRange, 10) || 7) * hoursMultiplier;
    const alertsPerHour =
      totalHoursCalc > 0
        ? Math.round((stats.totalCount / totalHoursCalc) * 10) / 10
        : 0;

    // Build topIps from raw alerts if the aggregation returned nothing
    // (data.srcip may not exist as a structured field in MISP alerts)
    let topIps = stats.topIps;
    if (!topIps || topIps.length === 0) {
      const ipCounts = {};
      alerts.forEach((alert) => {
        const fullLog = alert.full_log || "";
        const srcipMatch = fullLog.match(/srcip=(\S+)/);
        if (srcipMatch) {
          const ip = srcipMatch[1];
          ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        }
      });
      topIps = Object.entries(ipCounts)
        .map(([ip, count]) => ({ ip, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }

    res.status(200).json({
      timeline: stats.timeline,
      dailyCounts: stats.dailyCounts,
      topIps,
      totalCount: stats.totalCount,
      uniqueIpCount: uniqueIps.size,
      latestTimestamp,
      alertsPerHour,
    });
  } catch (err) {
    logger.error(`Failed to fetch MISP stats: ${err.message}`);
    res.status(500).json({
      error: "Failed to fetch MISP stats",
      timeline: [],
      dailyCounts: [],
      topIps: [],
      totalCount: 0,
      uniqueIpCount: 0,
      latestTimestamp: null,
      alertsPerHour: 0,
    });
  }
};
