// // // // // // server/src/controllers/wazuhController.js

// // // // // import { wazuhService } from "../services/wazuhService.js";
// // // // // import { createHttpError } from "../utils/errors.js";
// // // // // import { logger } from "../config/logger.js";

// // // // // // Utility function to extract data from Wazuh API response
// // // // // const extractAlerts = (response) => {
// // // // //   return response?.data?.affected_items || [];
// // // // // };

// // // // // export const fetchAlerts = async (req, res, next) => {
// // // // //   try {
// // // // //     const alertsData = await wazuhService.getSecurityAlerts(req.query);
// // // // //     const alerts = extractAlerts(alertsData);
// // // // //     res.status(200).json(alerts);
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch alerts:", err);
// // // // //     next(createHttpError(500, "Failed to fetch alerts"));
// // // // //   }
// // // // // };

// // // // // export const fetchTraffic = async (req, res, next) => {
// // // // //   try {
// // // // //     const trafficData = await wazuhService.getTrafficData(req.query.timeRange);
// // // // //     const traffic = extractAlerts(trafficData);
// // // // //     res.status(200).json(traffic);
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch traffic data:", err);
// // // // //     next(createHttpError(500, "Failed to fetch traffic data"));
// // // // //   }
// // // // // };

// // // // // export const fetchAttackPatterns = async (req, res, next) => {
// // // // //   try {
// // // // //     const attackData = await wazuhService.getAttackPatterns(req.query.timeRange);
// // // // //     const attacks = extractAlerts(attackData);
// // // // //     res.status(200).json(attacks);
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch attack patterns:", err);
// // // // //     next(createHttpError(500, "Failed to fetch attack patterns"));
// // // // //   }
// // // // // };

// // // // // export const fetchClusterStats = async (req, res, next) => {
// // // // //   try {
// // // // //     const statsData = await wazuhService.getSystemMetrics();
// // // // //     res.status(200).json(statsData);
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch cluster stats:", err);
// // // // //     next(createHttpError(500, "Failed to fetch cluster stats"));
// // // // //   }
// // // // // };

// // // // // export const fetchOverview = async (req, res, next) => {
// // // // //   try {
// // // // //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// // // // //     const compliance = await wazuhService.getComplianceData();
// // // // //     const userEndpoint = await wazuhService.getUserEndpointData();
// // // // //     const networking = await wazuhService.getNetworkingData();

// // // // //     // Data processing and transformation
// // // // //     const openAlerts = alerts?.data?.total_affected_items || 0;
// // // // //     const risk = {
// // // // //       high: alerts?.data?.affected_items?.filter(a => a.rule?.level >= 8).length || 0,
// // // // //       medium: alerts?.data?.affected_items?.filter(a => a.rule?.level >= 4 && a.rule?.level < 8).length || 0,
// // // // //       low: alerts?.data?.affected_items?.filter(a => a.rule?.level < 4).length || 0,
// // // // //     };

// // // // //     // ... (Add your data processing logic here for other data points)

// // // // //     res.status(200).json({
// // // // //       openAlerts,
// // // // //       risk,
// // // // //       compliance,
// // // // //       userEndpoint,
// // // // //       networking,
// // // // //       // ... more data
// // // // //     });
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch dashboard overview:", err);
// // // // //     next(createHttpError(500, "Failed to fetch dashboard overview"));
// // // // //   }
// // // // // };

// // // // // export const fetchComplianceData = async (req, res, next) => {
// // // // //   try {
// // // // //     const complianceData = await wazuhService.getComplianceData();
// // // // //     const violations = extractAlerts(complianceData);
// // // // //     // You would need to implement audit log fetching from Wazuh, possibly from a specific index.
// // // // //     const audit = []; 
// // // // //     res.status(200).json({ audit, violations });
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch compliance data:", err);
// // // // //     next(createHttpError(500, "Failed to fetch compliance data"));
// // // // //   }
// // // // // };

// // // // // export const fetchUserEndpointData = async (req, res, next) => {
// // // // //   try {
// // // // //     const userEndpointData = await wazuhService.getUserEndpointData();
// // // // //     const logons = extractAlerts(userEndpointData);
// // // // //     // You'll need to process the logons to get locations and compliance percentage
// // // // //     const locations = [];
// // // // //     const compliance = 0;
// // // // //     res.status(200).json({ logons, locations, compliance });
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch user-endpoint data:", err);
// // // // //     next(createHttpError(500, "Failed to fetch user-endpoint data"));
// // // // //   }
// // // // // };

// // // // // export const fetchNetworkingData = async (req, res, next) => {
// // // // //   try {
// // // // //     const networkingData = await wazuhService.getNetworkingData();
// // // // //     const traffic = networkingData?.data?.affected_items?.filter(a => a.location) || [];
// // // // //     const firewall = networkingData?.data?.affected_items?.filter(a => a.rule?.groups?.includes("firewall")) || [];
// // // // //     res.status(200).json({ traffic, firewall });
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch networking data:", err);
// // // // //     next(createHttpError(500, "Failed to fetch networking data"));
// // // // //   }
// // // // // };

// // // // // export const fetchThreatIntelData = async (req, res, next) => {
// // // // //   try {
// // // // //     const threatIntelData = await wazuhService.getThreatIntelData();
// // // // //     const alerts = extractAlerts(threatIntelData);

// // // // //     // Process alerts for global map, actors, and vulnerable assets
// // // // //     const global = [];
// // // // //     const actors = [];
// // // // //     const assets = [];

// // // // //     res.status(200).json({ global, actors, assets });
// // // // //   } catch (err) {
// // // // //     logger.error("Failed to fetch threat intel data:", err);
// // // // //     next(createHttpError(500, "Failed to fetch threat intel data"));
// // // // //   }
// // // // // };










// // // // // server/src/controllers/wazuhController.js
// // // // import { wazuhService } from "../services/wazuhService.js";
// // // // import { createHttpError } from "../utils/errors.js";
// // // // import { logger } from "../config/logger.js";

// // // // export const fetchAlerts = async (req, res, next) => {
// // // //   try {
// // // //     const alerts = await wazuhService.getSecurityAlerts({
// // // //       size: Number(req.query.size) || 50,
// // // //       from: Number(req.query.offset) || 0,
// // // //       timeRange: req.query.timeRange || "24h",
// // // //       level: req.query.level ? Number(req.query.level) : null,
// // // //       agent: req.query.agent || null,
// // // //     });
// // // //     res.status(200).json({ alerts });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch alerts: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch alerts"));
// // // //   }
// // // // };

// // // // export const fetchTraffic = async (req, res, next) => {
// // // //   try {
// // // //     const traffic = await wazuhService.getTrafficData(req.query.timeRange || "1h");
// // // //     res.status(200).json({ traffic });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch traffic data: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch traffic data"));
// // // //   }
// // // // };

// // // // export const fetchAttackPatterns = async (req, res, next) => {
// // // //   try {
// // // //     const attacks = await wazuhService.getAttackPatterns(req.query.timeRange || "24h");
// // // //     res.status(200).json(attacks);
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch attack patterns: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch attack patterns"));
// // // //   }
// // // // };

// // // // export const fetchClusterStats = async (_req, res, next) => {
// // // //   try {
// // // //     const statsData = await wazuhService.getSystemMetrics(); // from Manager
// // // //     res.status(200).json(statsData);
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch cluster stats: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch cluster stats"));
// // // //   }
// // // // };

// // // // export const fetchOverview = async (_req, res, next) => {
// // // //   try {
// // // //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// // // //     const openAlerts = alerts.length;

// // // //     const risk = {
// // // //       high: alerts.filter((a) => (a.rule?.level || 0) >= 8).length,
// // // //       medium: alerts.filter((a) => (a.rule?.level || 0) >= 4 && (a.rule?.level || 0) < 8).length,
// // // //       low: alerts.filter((a) => (a.rule?.level || 0) < 4).length,
// // // //     };

// // // //     const compliance = await wazuhService.getComplianceData();
// // // //     const userEndpoint = await wazuhService.getUserEndpointData();
// // // //     const networking = await wazuhService.getNetworkingData();

// // // //     res.status(200).json({
// // // //       openAlerts,
// // // //       risk,
// // // //       compliance,
// // // //       userEndpoint,
// // // //       networking,
// // // //     });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch dashboard overview: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch dashboard overview"));
// // // //   }
// // // // };

// // // // export const fetchComplianceData = async (_req, res, next) => {
// // // //   try {
// // // //     const violations = await wazuhService.getComplianceData();
// // // //     // Implement audit log fetching from indexer if needed
// // // //     const audit = [];
// // // //     res.status(200).json({ audit, violations });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch compliance data: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch compliance data"));
// // // //   }
// // // // };

// // // // export const fetchUserEndpointData = async (_req, res, next) => {
// // // //   try {
// // // //     const logons = await wazuhService.getUserEndpointData();
// // // //     const locations = logons
// // // //       .filter((a) => a.location?.lat && a.location?.lon)
// // // //       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));
// // // //     const total = logons.length;
// // // //     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
// // // //     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

// // // //     res.status(200).json({ logons, locations, compliance });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch user-endpoint data: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch user-endpoint data"));
// // // //   }
// // // // };

// // // // export const fetchNetworkingData = async (_req, res, next) => {
// // // //   try {
// // // //     const traffic = await wazuhService.getTrafficData("24h");
// // // //     const firewall = await wazuhService.getNetworkingData();
// // // //     res.status(200).json({ traffic, firewall });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch networking data: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch networking data"));
// // // //   }
// // // // };

// // // // export const fetchThreatIntelData = async (_req, res, next) => {
// // // //   try {
// // // //     const alerts = await wazuhService.getThreatIntelData();

// // // //     const global = alerts
// // // //       .filter((a) => a.agent?.geo?.latitude && a.agent?.geo?.longitude && a.agent?.geo?.country_name)
// // // //       .reduce((acc, a) => {
// // // //         const country = a.agent.geo.country_name;
// // // //         if (!acc[country]) acc[country] = { count: 0, lat: a.agent.geo.latitude, lon: a.agent.geo.longitude };
// // // //         acc[country].count += 1;
// // // //         return acc;
// // // //       }, {});
// // // //     const globalMarkers = Object.entries(global).map(([name, data]) => ({
// // // //       name,
// // // //       coordinates: [data.lon, data.lat],
// // // //       count: data.count,
// // // //     }));

// // // //     const actors = alerts.reduce((acc, a) => {
// // // //       const actor = a.rule?.mitre?.tactic || "Unknown";
// // // //       acc[actor] = (acc[actor] || 0) + 1;
// // // //       return acc;
// // // //     }, {});
// // // //     const actorsChart = Object.entries(actors)
// // // //       .map(([actor, activity]) => ({ actor, activity }))
// // // //       .sort((a, b) => b.activity - a.activity);

// // // //     const assets = alerts
// // // //       .filter((a) => a.rule?.groups?.includes("vulnerability"))
// // // //       .slice(0, 5)
// // // //       .map((asset) => ({
// // // //         name: asset.agent?.name || "unknown",
// // // //         status: "Vulnerable",
// // // //         vulnerability: asset.rule?.description || "N/A",
// // // //       }));

// // // //     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
// // // //   } catch (err) {
// // // //     logger.error(`Failed to fetch threat intel data: ${err.message}`);
// // // //     next(createHttpError(500, "Failed to fetch threat intel data"));
// // // //   }
// // // // };


// // // // // Fetching the alert count
// // // // export const fetchAlertsCount = async (_req, res, next) => {
// // // //   try {
// // // //     const count = await wazuhService.getTotalAlerts(); // calls indexer /_count
// // // //     res.status(200).json({ count });
// // // //   } catch (err) {
// // // //     next(createHttpError(500, "Failed to fetch alerts count"));
// // // //   }
// // // // };
















// // // //server/src/controllers/wazuhController.js


// // // import { wazuhService } from "../services/wazuhService.js";
// // // import { createHttpError } from "../utils/errors.js";
// // // import { logger } from "../config/logger.js";

// // // export const fetchAlerts = async (req, res, next) => {
// // //   try {
// // //     const alerts = await wazuhService.getSecurityAlerts({
// // //       size: Number(req.query.size) || 50,
// // //       from: Number(req.query.offset) || 0,
// // //       timeRange: req.query.timeRange || "24h",
// // //       level: req.query.level ? Number(req.query.level) : null,
// // //       agent: req.query.agent || null,
// // //     });
// // //     res.status(200).json({ alerts });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch alerts: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch alerts"));
// // //   }
// // // };

// // // export const fetchTraffic = async (req, res, next) => {
// // //   try {
// // //     const traffic = await wazuhService.getTrafficData(req.query.timeRange || "1h");
// // //     res.status(200).json({ traffic });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch traffic data: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch traffic data"));
// // //   }
// // // };

// // // export const fetchAttackPatterns = async (req, res, next) => {
// // //   try {
// // //     const attacks = await wazuhService.getAttackPatterns(req.query.timeRange || "24h");
// // //     res.status(200).json(attacks);
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch attack patterns: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch attack patterns"));
// // //   }
// // // };

// // // export const fetchClusterStats = async (_req, res, next) => {
// // //   try {
// // //     const statsData = await wazuhService.getSystemMetrics(); // from Manager
// // //     res.status(200).json(statsData);
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch cluster stats: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch cluster stats"));
// // //   }
// // // };

// // // export const fetchOverview = async (_req, res, next) => {
// // //   try {
// // //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// // //     const openAlerts = alerts.length;

// // //     const risk = {
// // //       high: alerts.filter((a) => (a.rule?.level || 0) >= 8).length,
// // //       medium: alerts.filter((a) => (a.rule?.level || 0) >= 4 && (a.rule?.level || 0) < 8).length,
// // //       low: alerts.filter((a) => (a.rule?.level || 0) < 4).length,
// // //     };

// // //     const compliance = await wazuhService.getComplianceData();
// // //     const userEndpoint = await wazuhService.getUserEndpointData();
// // //     const networking = await wazuhService.getNetworkingData();

// // //     res.status(200).json({
// // //       openAlerts,
// // //       risk,
// // //       compliance,
// // //       userEndpoint,
// // //       networking,
// // //     });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch dashboard overview: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch dashboard overview"));
// // //   }
// // // };

// // // export const fetchComplianceData = async (_req, res, next) => {
// // //   try {
// // //     const violations = await wazuhService.getComplianceData();
// // //     // Implement audit log fetching from indexer if needed
// // //     const audit = [];
// // //     res.status(200).json({ audit, violations });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch compliance data: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch compliance data"));
// // //   }
// // // };

// // // export const fetchUserEndpointData = async (_req, res, next) => {
// // //   try {
// // //     const logons = await wazuhService.getUserEndpointData();
// // //     const locations = logons
// // //       .filter((a) => a.location?.lat && a.location?.lon)
// // //       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));
// // //     const total = logons.length;
// // //     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
// // //     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

// // //     res.status(200).json({ logons, locations, compliance });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch user-endpoint data: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch user-endpoint data"));
// // //   }
// // // };

// // // export const fetchNetworkingData = async (_req, res, next) => {
// // //   try {
// // //     const traffic = await wazuhService.getTrafficData("24h");
// // //     const firewall = await wazuhService.getNetworkingData();
// // //     res.status(200).json({ traffic, firewall });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch networking data: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch networking data"));
// // //   }
// // // };

// // // export const fetchThreatIntelData = async (_req, res, next) => {
// // //   try {
// // //     const alerts = await wazuhService.getThreatIntelData();

// // //     const global = alerts
// // //       .filter((a) => a.agent?.geo?.latitude && a.agent?.geo?.longitude && a.agent?.geo?.country_name)
// // //       .reduce((acc, a) => {
// // //         const country = a.agent.geo.country_name;
// // //         if (!acc[country]) acc[country] = { count: 0, lat: a.agent.geo.latitude, lon: a.agent.geo.longitude };
// // //         acc[country].count += 1;
// // //         return acc;
// // //       }, {});
// // //     const globalMarkers = Object.entries(global).map(([name, data]) => ({
// // //       name,
// // //       coordinates: [data.lon, data.lat],
// // //       count: data.count,
// // //     }));

// // //     const actors = alerts.reduce((acc, a) => {
// // //       const actor = a.rule?.mitre?.tactic || "Unknown";
// // //       acc[actor] = (acc[actor] || 0) + 1;
// // //       return acc;
// // //     }, {});
// // //     const actorsChart = Object.entries(actors)
// // //       .map(([actor, activity]) => ({ actor, activity }))
// // //       .sort((a, b) => b.activity - a.activity);

// // //     const assets = alerts
// // //       .filter((a) => a.rule?.groups?.includes("vulnerability"))
// // //       .slice(0, 5)
// // //       .map((asset) => ({
// // //         name: asset.agent?.name || "unknown",
// // //         status: "Vulnerable",
// // //         vulnerability: asset.rule?.description || "N/A",
// // //       }));

// // //     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
// // //   } catch (err) {
// // //     logger.error(`Failed to fetch threat intel data: ${err.message}`);
// // //     next(createHttpError(500, "Failed to fetch threat intel data"));
// // //   }
// // // };


// // // // Fetching the alert count
// // // export const fetchAlertsCount = async (_req, res, next) => {
// // //   try {
// // //     const count = await wazuhService.getTotalAlerts(); // calls indexer /_count
// // //     res.status(200).json({ count });
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch alerts count"));
// // //   }
// // // };

// // // // Metrics
// // // export const fetchMetrics = async (_req, res, next) => {
// // //   try {
// // //     const count = await wazuhService.getTotalAlerts();
// // //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// // //     res.status(200).json({ count, alerts });
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch metrics"));
// // //   }
// // // };

// // // // Incident
// // // export const fetchIncidents = async (_req, res, next) => {
// // //   try {
// // //     const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
// // //     res.status(200).json({ incidents });
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch incidents"));
// // //   }
// // // };

// // // // Threat Intel
// // // export const fetchThreatIntel = async (_req, res, next) => {
// // //   try {
// // //     const data = await wazuhService.getThreatIntelData();
// // //     res.status(200).json(data);
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch threat intel"));
// // //   }
// // // };

// // // // Networking
// // // export const fetchNetworking = async (_req, res, next) => {
// // //   try {
// // //     const data = await wazuhService.getNetworkingData();
// // //     res.status(200).json(data);
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch networking data"));
// // //   }
// // // };

// // // // User Endpoint
// // // export const fetchUserEndpoint = async (_req, res, next) => {
// // //   try {
// // //     const data = await wazuhService.getUserEndpointData();
// // //     res.status(200).json(data);
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch user endpoint data"));
// // //   }
// // // };

// // // // Compliance
// // // // wazuhController.js
// // // export const fetchCompliance = async (_req, res, next) => {
// // //   try {
// // //     const violations = await wazuhService.getComplianceData();

// // //     const auditCounts = violations.reduce((acc, alert) => {
// // //       const hour = new Date(alert["@timestamp"]).getHours();
// // //       acc[hour] = (acc[hour] || 0) + 1;
// // //       return acc;
// // //     }, {});
// // //     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
// // //       time: `${time}:00`,
// // //       volume: count,
// // //     }));

// // //     const policyViolations = violations
// // //       .filter((a) => a.rule?.groups?.includes("policy_violation"))
// // //       .slice(0, 5)
// // //       .map((a) => ({
// // //         timestamp: a["@timestamp"],
// // //         description: a.rule?.description,
// // //       }));

// // //     res.status(200).json({ auditChart, policyViolations });
// // //   } catch (err) {
// // //     next(createHttpError(500, "Failed to fetch compliance data"));
// // //   }
// // // };















// // // server/src/controllers/wazuhController.js

// // import { wazuhService } from "../services/wazuhService.js";
// // import { createHttpError } from "../utils/errors.js";
// // import { logger } from "../config/logger.js";

// // // ===== Alert Count =====
// // export const fetchAlertsCount = async (_req, res, next) => {
// //   try {
// //     const count = await wazuhService.getTotalAlerts();
// //     res.status(200).json({ count });
// //   } catch (err) {
// //     logger.error(`Failed to fetch alerts count: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch alerts count"));
// //   }
// // };

// // // ===== Metrics =====
// // export const fetchMetrics = async (_req, res, next) => {
// //   try {
// //     const count = await wazuhService.getTotalAlerts();
// //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// //     res.status(200).json({ count, alerts });
// //   } catch (err) {
// //     logger.error(`Failed to fetch metrics: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch metrics"));
// //   }
// // };

// // // ===== Incidents =====
// // export const fetchIncidents = async (_req, res, next) => {
// //   try {
// //     const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
// //     res.status(200).json({ incidents });
// //   } catch (err) {
// //     logger.error(`Failed to fetch incidents: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch incidents"));
// //   }
// // };

// // // ===== Threat Intel =====
// // export const fetchThreatIntel = async (_req, res, next) => {
// //   try {
// //     const alerts = await wazuhService.getThreatIntelData();

// //     // Global threat map markers
// //     const global = alerts
// //       .filter(
// //         (a) =>
// //           a.agent?.geo?.latitude &&
// //           a.agent?.geo?.longitude &&
// //           a.agent?.geo?.country_name
// //       )
// //       .reduce((acc, a) => {
// //         const country = a.agent.geo.country_name;
// //         if (!acc[country]) {
// //           acc[country] = {
// //             count: 0,
// //             lat: a.agent.geo.latitude,
// //             lon: a.agent.geo.longitude,
// //           };
// //         }
// //         acc[country].count++;
// //         return acc;
// //       }, {});
// //     const globalMarkers = Object.entries(global).map(([name, data]) => ({
// //       name,
// //       coordinates: [data.lon, data.lat],
// //       count: data.count,
// //     }));

// //     // Threat actor activity
// //     const actors = alerts.reduce((acc, a) => {
// //       const actor = a.rule?.mitre?.tactic || "Unknown";
// //       acc[actor] = (acc[actor] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const actorsChart = Object.entries(actors)
// //       .map(([actor, activity]) => ({ actor, activity }))
// //       .sort((a, b) => b.activity - a.activity);

// //     // Vulnerable assets
// //     const assets = alerts
// //       .filter((a) => a.rule?.groups?.includes("vulnerability"))
// //       .slice(0, 5)
// //       .map((asset) => ({
// //         name: asset.agent?.name || "unknown",
// //         status: "Vulnerable",
// //         vulnerability: asset.rule?.description || "N/A",
// //       }));

// //     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
// //   } catch (err) {
// //     logger.error(`Failed to fetch threat intel: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch threat intel"));
// //   }
// // };

// // // ===== Networking =====
// // export const fetchNetworking = async (_req, res, next) => {
// //   try {
// //     const traffic = await wazuhService.getTrafficData("24h");
// //     const firewall = await wazuhService.getNetworkingData();
// //     const malware = firewall.filter((a) => a.rule?.groups?.includes("malware"));
// //     res.status(200).json({ traffic, firewall, malware });
// //   } catch (err) {
// //     logger.error(`Failed to fetch networking data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch networking data"));
// //   }
// // };

// // // ===== User Endpoint =====
// // export const fetchUserEndpoint = async (_req, res, next) => {
// //   try {
// //     const logons = await wazuhService.getUserEndpointData();

// //     // Summarize logons by user
// //     const logonSummary = logons.reduce((acc, alert) => {
// //       const user = alert.user?.name || "unknown";
// //       if (!acc[user]) acc[user] = { user, success: 0, failure: 0 };
// //       if (alert.rule?.description?.toLowerCase().includes("successful")) acc[user].success++;
// //       if (alert.rule?.description?.toLowerCase().includes("failed")) acc[user].failure++;
// //       return acc;
// //     }, {});
// //     const logonData = Object.values(logonSummary);

// //     // Locations
// //     const locations = logons
// //       .filter((a) => a.location?.lat && a.location?.lon)
// //       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));

// //     // Compliance %
// //     const total = logons.length;
// //     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
// //     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

// //     res.status(200).json({ logons: logonData, locations, compliance });
// //   } catch (err) {
// //     logger.error(`Failed to fetch user endpoint data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch user endpoint data"));
// //   }
// // };

// // // ===== Compliance =====
// // export const fetchCompliance = async (_req, res, next) => {
// //   try {
// //     const violations = await wazuhService.getComplianceData();

// //     // Audit chart (group by hour)
// //     const auditCounts = violations.reduce((acc, alert) => {
// //       const hour = new Date(alert["@timestamp"]).getHours();
// //       acc[hour] = (acc[hour] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
// //       time: `${time}:00`,
// //       volume: count,
// //     }));

// //     // Policy violations
// //     const policyViolations = violations
// //       .filter((a) => a.rule?.groups?.includes("policy_violation"))
// //       .slice(0, 5)
// //       .map((a) => ({
// //         timestamp: a["@timestamp"],
// //         description: a.rule?.description,
// //       }));

// //     res.status(200).json({ auditChart, policyViolations });
// //   } catch (err) {
// //     logger.error(`Failed to fetch compliance data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch compliance data"));
// //   }
// // };















// // import { wazuhService } from "../services/wazuhService.js";
// // import { createHttpError } from "../utils/errors.js";
// // import { logger } from "../config/logger.js";

// // // ===== Alert Count =====
// // export const fetchAlertsCount = async (_req, res, next) => {
// //   try {
// //     const count = await wazuhService.getTotalAlerts();
// //     res.status(200).json({ count });
// //   } catch (err) {
// //     logger.error(`Failed to fetch alerts count: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch alerts count"));
// //   }
// // };

// // // ===== Metrics =====
// // export const fetchMetrics = async (_req, res, next) => {
// //   try {
// //     const count = await wazuhService.getTotalAlerts();
// //     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
// //     res.status(200).json({ count, alerts });
// //   } catch (err) {
// //     logger.error(`Failed to fetch metrics: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch metrics"));
// //   }
// // };

// // // ===== Incidents =====
// // export const fetchIncidents = async (_req, res, next) => {
// //   try {
// //     const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
// //     res.status(200).json({ incidents });
// //   } catch (err) {
// //     logger.error(`Failed to fetch incidents: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch incidents"));
// //   }
// // };

// // // ===== Threat Intel =====
// // export const fetchThreatIntel = async (_req, res, next) => {
// //   try {
// //     const alerts = await wazuhService.getThreatIntelData();

// //     // Global threat map markers
// //     const global = alerts
// //       .filter(
// //         (a) =>
// //           a.agent?.geo?.latitude &&
// //           a.agent?.geo?.longitude &&
// //           a.agent?.geo?.country_name
// //       )
// //       .reduce((acc, a) => {
// //         const country = a.agent.geo.country_name;
// //         if (!acc[country]) {
// //           acc[country] = {
// //             count: 0,
// //             lat: a.agent.geo.latitude,
// //             lon: a.agent.geo.longitude,
// //           };
// //         }
// //         acc[country].count++;
// //         return acc;
// //       }, {});
// //     const globalMarkers = Object.entries(global).map(([name, data]) => ({
// //       name,
// //       coordinates: [data.lon, data.lat],
// //       count: data.count,
// //     }));

// //     // Threat actor activity
// //     const actors = alerts.reduce((acc, a) => {
// //       const actor = a.rule?.mitre?.tactic || "Unknown";
// //       acc[actor] = (acc[actor] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const actorsChart = Object.entries(actors)
// //       .map(([actor, activity]) => ({ actor, activity }))
// //       .sort((a, b) => b.activity - a.activity);

// //     // Vulnerable assets
// //     const assets = alerts
// //       .filter((a) => a.rule?.groups?.includes("vulnerability"))
// //       .slice(0, 5)
// //       .map((asset) => ({
// //         name: asset.agent?.name || "unknown",
// //         status: "Vulnerable",
// //         vulnerability: asset.rule?.description || "N/A",
// //       }));

// //     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
// //   } catch (err) {
// //     logger.error(`Failed to fetch threat intel: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch threat intel"));
// //   }
// // };

// // // ===== Networking =====
// // export const fetchNetworking = async (_req, res, next) => {
// //   try {
// //     const traffic = await wazuhService.getTrafficData("24h");
// //     const firewall = await wazuhService.getNetworkingData();
// //     const malware = firewall.filter((a) => a.rule?.groups?.includes("malware"));
// //     res.status(200).json({ traffic, firewall, malware });
// //   } catch (err) {
// //     logger.error(`Failed to fetch networking data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch networking data"));
// //   }
// // };

// // // ===== User Endpoint =====
// // export const fetchUserEndpoint = async (_req, res, next) => {
// //   try {
// //     const logons = await wazuhService.getUserEndpointData();

// //     // Summarize logons by user
// //     const logonSummary = logons.reduce((acc, alert) => {
// //       const user = alert.user?.name || "unknown";
// //       if (!acc[user]) acc[user] = { user, success: 0, failure: 0 };
// //       if (alert.rule?.description?.toLowerCase().includes("successful")) acc[user].success++;
// //       if (alert.rule?.description?.toLowerCase().includes("failed")) acc[user].failure++;
// //       return acc;
// //     }, {});
// //     const logonData = Object.values(logonSummary);

// //     // Locations
// //     const locations = logons
// //       .filter((a) => a.location?.lat && a.location?.lon)
// //       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));

// //     // Compliance %
// //     const total = logons.length;
// //     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
// //     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

// //     res.status(200).json({ logons: logonData, locations, compliance });
// //   } catch (err) {
// //     logger.error(`Failed to fetch user endpoint data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch user endpoint data"));
// //   }
// // };

// // // ===== Compliance =====
// // export const fetchCompliance = async (_req, res, next) => {
// //   try {
// //     const violations = await wazuhService.getComplianceData();

// //     // Audit chart (group by hour)
// //     const auditCounts = violations.reduce((acc, alert) => {
// //       const hour = new Date(alert["@timestamp"]).getHours();
// //       acc[hour] = (acc[hour] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
// //       time: `${time}:00`,
// //       volume: count,
// //     }));

// //     // Policy violations
// //     const policyViolations = violations
// //       .filter((a) => a.rule?.groups?.includes("policy_violation"))
// //       .slice(0, 5)
// //       .map((a) => ({
// //         timestamp: a["@timestamp"],
// //         description: a.rule?.description,
// //       }));

// //     res.status(200).json({ auditChart, policyViolations });
// //   } catch (err) {
// //     logger.error(`Failed to fetch compliance data: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch compliance data"));
// //   }
// // };

// // // ===== Train & Test =====
// // export const fetchTrainTest = async (_req, res, next) => {
// //   try {
// //     const body = {
// //       size: 0,
// //       aggs: {
// //         train: { filter: { term: { "rule.groups.keyword": "train" } } },
// //         test: { filter: { term: { "rule.groups.keyword": "test" } } },
// //       },
// //     };
// //     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
// //     res.status(200).json([
// //       { name: "Train", value: data.aggregations.train.doc_count },
// //       { name: "Test", value: data.aggregations.test.doc_count },
// //     ]);
// //   } catch (err) {
// //     logger.error(`Failed to fetch train/test: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch train/test"));
// //   }
// // };

// // // ===== Trending Graphs =====
// // export const fetchTrending = async (_req, res, next) => {
// //   try {
// //     const body = {
// //       size: 0,
// //       query: { range: { "@timestamp": { gte: "now-7d/d", lte: "now" } } },
// //       aggs: {
// //         per_day: {
// //           date_histogram: { field: "@timestamp", calendar_interval: "day" },
// //         },
// //       },
// //     };
// //     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
// //     const buckets = data.aggregations?.per_day?.buckets || [];
// //     const trending = buckets.map((b) => ({
// //       day: new Date(b.key_as_string).toLocaleDateString("en-US", { weekday: "short" }),
// //       count: b.doc_count,
// //     }));
// //     res.status(200).json(trending);
// //   } catch (err) {
// //     logger.error(`Failed to fetch trending: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch trending"));
// //   }
// // };

// // // ===== Threat Tags =====
// // export const fetchThreatTags = async (_req, res, next) => {
// //   try {
// //     const body = {
// //       size: 0,
// //       aggs: {
// //         tags: { terms: { field: "rule.groups.keyword", size: 10 } },
// //       },
// //     };
// //     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
// //     const tags = data.aggregations?.tags?.buckets || [];

// //     res.status(200).json(
// //       tags.map((t) => ({
// //         tag: t.key,
// //         count: t.doc_count,
// //       }))
// //     );
// //   } catch (err) {
// //     logger.error(`Failed to fetch threat tags: ${err.message}`);
// //     next(createHttpError(500, "Failed to fetch threat tags"));
// //   }
// // };











// import { wazuhService } from "../services/wazuhService.js";
// import { createHttpError } from "../utils/errors.js";
// import { logger } from "../config/logger.js";

// // ===== Alert Count =====
// export const fetchAlertsCount = async (_req, res, next) => {
//   try {
//     const count = await wazuhService.getTotalAlerts();
//     res.status(200).json({ count });
//   } catch (err) {
//     logger.error(`Failed to fetch alerts count: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch alerts count"));
//   }
// };

// // ===== Metrics =====
// export const fetchMetrics = async (_req, res, next) => {
//   try {
//     const count = await wazuhService.getTotalAlerts();
//     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
//     res.status(200).json({ count, alerts });
//   } catch (err) {
//     logger.error(`Failed to fetch metrics: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch metrics"));
//   }
// };

// // ===== Incidents =====
// export const fetchIncidents = async (_req, res, next) => {
//   try {
//     const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
//     res.status(200).json({ incidents });
//   } catch (err) {
//     logger.error(`Failed to fetch incidents: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch incidents"));
//   }
// };

// // ===== Threat Intel =====
// export const fetchThreatIntel = async (_req, res, next) => {
//   try {
//     const alerts = await wazuhService.getThreatIntelData();

//     // Global threat map markers
//     const global = alerts
//       .filter(
//         (a) =>
//           a.agent?.geo?.latitude &&
//           a.agent?.geo?.longitude &&
//           a.agent?.geo?.country_name
//       )
//       .reduce((acc, a) => {
//         const country = a.agent.geo.country_name;
//         if (!acc[country]) {
//           acc[country] = {
//             count: 0,
//             lat: a.agent.geo.latitude,
//             lon: a.agent.geo.longitude,
//           };
//         }
//         acc[country].count++;
//         return acc;
//       }, {});
//     const globalMarkers = Object.entries(global).map(([name, data]) => ({
//       name,
//       coordinates: [data.lon, data.lat],
//       count: data.count,
//     }));

//     // Threat actor activity
//     const actors = alerts.reduce((acc, a) => {
//       const actor = a.rule?.mitre?.tactic || "Unknown";
//       acc[actor] = (acc[actor] || 0) + 1;
//       return acc;
//     }, {});
//     const actorsChart = Object.entries(actors)
//       .map(([actor, activity]) => ({ actor, activity }))
//       .sort((a, b) => b.activity - a.activity);

//     // Vulnerable assets
//     const assets = alerts
//       .filter((a) => a.rule?.groups?.includes("vulnerability"))
//       .slice(0, 5)
//       .map((asset) => ({
//         name: asset.agent?.name || "unknown",
//         status: "Vulnerable",
//         vulnerability: asset.rule?.description || "N/A",
//       }));

//     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
//   } catch (err) {
//     logger.error(`Failed to fetch threat intel: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch threat intel"));
//   }
// };

// // ===== Networking =====
// export const fetchNetworking = async (_req, res, next) => {
//   try {
//     const traffic = await wazuhService.getTrafficData("24h");
//     const firewall = await wazuhService.getNetworkingData();
//     const malware = firewall.filter((a) => a.rule?.groups?.includes("malware"));
//     res.status(200).json({ traffic, firewall, malware });
//   } catch (err) {
//     logger.error(`Failed to fetch networking data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch networking data"));
//   }
// };

// // ===== User Endpoint =====
// export const fetchUserEndpoint = async (_req, res, next) => {
//   try {
//     const logons = await wazuhService.getUserEndpointData();

//     // Summarize logons by user
//     const logonSummary = logons.reduce((acc, alert) => {
//       const user = alert.user?.name || "unknown";
//       if (!acc[user]) acc[user] = { user, success: 0, failure: 0 };
//       if (alert.rule?.description?.toLowerCase().includes("successful")) acc[user].success++;
//       if (alert.rule?.description?.toLowerCase().includes("failed")) acc[user].failure++;
//       return acc;
//     }, {});
//     const logonData = Object.values(logonSummary);

//     // Locations
//     const locations = logons
//       .filter((a) => a.location?.lat && a.location?.lon)
//       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));

//     // Compliance %
//     const total = logons.length;
//     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
//     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

//     res.status(200).json({ logons: logonData, locations, compliance });
//   } catch (err) {
//     logger.error(`Failed to fetch user endpoint data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch user endpoint data"));
//   }
// };

// // ===== Compliance =====
// export const fetchCompliance = async (_req, res, next) => {
//   try {
//     const violations = await wazuhService.getComplianceData();

//     // Audit chart (group by hour)
//     const auditCounts = violations.reduce((acc, alert) => {
//       const hour = new Date(alert["@timestamp"]).getHours();
//       acc[hour] = (acc[hour] || 0) + 1;
//       return acc;
//     }, {});
//     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
//       time: `${time}:00`,
//       volume: count,
//     }));

//     // Policy violations
//     const policyViolations = violations
//       .filter((a) => a.rule?.groups?.includes("policy_violation"))
//       .slice(0, 5)
//       .map((a) => ({
//         timestamp: a["@timestamp"],
//         description: a.rule?.description,
//       }));

//     res.status(200).json({ auditChart, policyViolations });
//   } catch (err) {
//     logger.error(`Failed to fetch compliance data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch compliance data"));
//   }
// };

// // ===== Train & Test =====
// export const fetchTrainTest = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         train: { filter: { term: { "rule.groups": "train" } } },
//         test: { filter: { term: { "rule.groups": "test" } } },
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     res.status(200).json([
//       { name: "Train", value: data.aggregations.train.doc_count },
//       { name: "Test", value: data.aggregations.test.doc_count },
//     ]);
//   } catch (err) {
//     logger.error(`Failed to fetch train/test: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch train/test"));
//   }
// };

// // ===== Trending Graphs =====
// export const fetchTrending = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       query: { range: { "@timestamp": { gte: "now-7d/d", lte: "now" } } },
//       aggs: {
//         per_day: {
//           date_histogram: { field: "@timestamp", calendar_interval: "day" },
//         },
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const buckets = data.aggregations?.per_day?.buckets || [];
//     const trending = buckets.map((b) => ({
//       day: new Date(b.key_as_string).toLocaleDateString("en-US", { weekday: "short" }),
//       count: b.doc_count,
//     }));
//     res.status(200).json(trending);
//   } catch (err) {
//     logger.error(`Failed to fetch trending: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch trending"));
//   }
// };

// // ===== Threat Tags =====
// export const fetchThreatTags = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         tags: { terms: { field: "rule.groups", size: 10 } }, // removed .keyword
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const tags = data.aggregations?.tags?.buckets || [];

//     res.status(200).json(
//       tags.map((t) => ({
//         tag: t.key,
//         count: t.doc_count,
//       }))
//     );
//   } catch (err) {
//     logger.error(`Failed to fetch threat tags: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch threat tags"));
//   }
// };

// // ===== Top Groups =====
// export const fetchTopGroups = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         groups: { terms: { field: "rule.groups", size: 10 } }, // removed .keyword
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const groups = data.aggregations?.groups?.buckets || [];

//     res.status(200).json(
//       groups.map((g) => ({
//         name: g.key,
//         count: g.doc_count,
//       }))
//     );
//   } catch (err) {
//     logger.error(`Failed to fetch top groups: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch top groups"));
//   }
// };

















// import { wazuhService } from "../services/wazuhService.js";
// import { createHttpError } from "../utils/errors.js";
// import { logger } from "../config/logger.js";

// // ===== Alert Count =====
// export const fetchAlertsCount = async (_req, res, next) => {
//   try {
//     const count = await wazuhService.getTotalAlerts();
//     res.status(200).json({ count });
//   } catch (err) {
//     logger.error(`Failed to fetch alerts count: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch alerts count"));
//   }
// };

// // ===== Metrics =====
// export const fetchMetrics = async (_req, res, next) => {
//   try {
//     const count = await wazuhService.getTotalAlerts();
//     const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" });
//     // return plain object with count and alerts array
//     res.status(200).json({ count, alerts });
//   } catch (err) {
//     logger.error(`Failed to fetch metrics: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch metrics"));
//   }
// };

// // ===== Incidents =====
// export const fetchIncidents = async (_req, res, next) => {
//   try {
//     const incidents = await wazuhService.getSecurityAlerts({ level: 7, timeRange: "1h" });
//     res.status(200).json(incidents); // return plain array
//   } catch (err) {
//     logger.error(`Failed to fetch incidents: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch incidents"));
//   }
// };

// // ===== Threat Intel =====
// export const fetchThreatIntel = async (_req, res, next) => {
//   try {
//     const alerts = await wazuhService.getThreatIntelData();

//     // Global threat map markers
//     const global = alerts
//       .filter(
//         (a) =>
//           a.agent?.geo?.latitude &&
//           a.agent?.geo?.longitude &&
//           a.agent?.geo?.country_name
//       )
//       .reduce((acc, a) => {
//         const country = a.agent.geo.country_name;
//         if (!acc[country]) {
//           acc[country] = {
//             count: 0,
//             lat: a.agent.geo.latitude,
//             lon: a.agent.geo.longitude,
//           };
//         }
//         acc[country].count++;
//         return acc;
//       }, {});
//     const globalMarkers = Object.entries(global).map(([name, data]) => ({
//       name,
//       coordinates: [data.lon, data.lat],
//       count: data.count,
//     }));

//     // Threat actor activity
//     const actors = alerts.reduce((acc, a) => {
//       const actor = a.rule?.mitre?.tactic || "Unknown";
//       acc[actor] = (acc[actor] || 0) + 1;
//       return acc;
//     }, {});
//     const actorsChart = Object.entries(actors)
//       .map(([actor, activity]) => ({ actor, activity }))
//       .sort((a, b) => b.activity - a.activity);

//     // Vulnerable assets
//     const assets = alerts
//       .filter((a) => a.rule?.groups?.includes("vulnerability"))
//       .slice(0, 5)
//       .map((asset) => ({
//         name: asset.agent?.name || "unknown",
//         status: "Vulnerable",
//         vulnerability: asset.rule?.description || "N/A",
//       }));

//     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
//   } catch (err) {
//     logger.error(`Failed to fetch threat intel: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch threat intel"));
//   }
// };

// // ===== Networking =====
// export const fetchNetworking = async (_req, res, next) => {
//   try {
//     const traffic = await wazuhService.getTrafficData("24h");
//     const firewall = await wazuhService.getNetworkingData();
//     const malware = await wazuhService.getMalwareData();
//     res.status(200).json({ traffic, firewall, malware });
//   } catch (err) {
//     logger.error(`Failed to fetch networking data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch networking data"));
//   }
// };

// // ===== User Endpoint =====
// export const fetchUserEndpoint = async (_req, res, next) => {
//   try {
//     const logons = await wazuhService.getUserEndpointData();

//     // Summarize logons by user
//     const logonSummary = logons.reduce((acc, alert) => {
//       const user = alert.user?.name || "unknown";
//       if (!acc[user]) acc[user] = { user, success: 0, failure: 0 };
//       if (alert.rule?.description?.toLowerCase().includes("successful")) acc[user].success++;
//       if (alert.rule?.description?.toLowerCase().includes("failed")) acc[user].failure++;
//       return acc;
//     }, {});
//     const logonData = Object.values(logonSummary);

//     // Locations
//     const locations = logons
//       .filter((a) => a.location?.lat && a.location?.lon)
//       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));

//     // Compliance %
//     const total = logons.length;
//     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
//     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

//     res.status(200).json({ logons: logonData, locations, compliance });
//   } catch (err) {
//     logger.error(`Failed to fetch user endpoint data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch user endpoint data"));
//   }
// };

// // ===== Compliance =====
// export const fetchCompliance = async (_req, res, next) => {
//   try {
//     const violations = await wazuhService.getComplianceData();

//     // Audit chart (group by hour)
//     const auditCounts = violations.reduce((acc, alert) => {
//       const hour = new Date(alert["@timestamp"]).getHours();
//       acc[hour] = (acc[hour] || 0) + 1;
//       return acc;
//     }, {});
//     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
//       time: `${time}:00`,
//       volume: count,
//     }));

//     // Policy violations
//     const policyViolations = violations
//       .filter((a) => a.rule?.groups?.includes("policy_violation"))
//       .slice(0, 5)
//       .map((a) => ({
//         timestamp: a["@timestamp"],
//         description: a.rule?.description,
//       }));

//     res.status(200).json({ auditChart, policyViolations });
//   } catch (err) {
//     logger.error(`Failed to fetch compliance data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch compliance data"));
//   }
// };

// // ===== Train & Test =====
// export const fetchTrainTest = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         train: { filter: { term: { "rule.groups": "train" } } },
//         test: { filter: { term: { "rule.groups": "test" } } },
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     // return plain array
//     res.status(200).json([
//       { name: "Train", value: data.aggregations.train.doc_count },
//       { name: "Test", value: data.aggregations.test.doc_count },
//     ]);
//   } catch (err) {
//     logger.error(`Failed to fetch train/test: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch train/test"));
//   }
// };

// // ===== Trending Graphs =====
// export const fetchTrending = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       query: { range: { "@timestamp": { gte: "now-7d/d", lte: "now" } } },
//       aggs: {
//         per_day: {
//           date_histogram: { field: "@timestamp", calendar_interval: "day" },
//         },
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const buckets = data.aggregations?.per_day?.buckets || [];
//     // return plain array
//     const trending = buckets.map((b) => ({
//       day: new Date(b.key_as_string).toLocaleDateString("en-US", { weekday: "short" }),
//       count: b.doc_count,
//     }));
//     res.status(200).json(trending);
//   } catch (err) {
//     logger.error(`Failed to fetch trending: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch trending"));
//   }
// };


// // ===== Threat Tags =====
// export const fetchThreatTags = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         tags: { terms: { field: "rule.groups", size: 10 } }, // no .keyword
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const tags = data.aggregations?.tags?.buckets || [];

//     // return plain array
//     res.status(200).json(
//       tags.map((t) => ({
//         tag: t.key,
//         count: t.doc_count,
//       }))
//     );
//   } catch (err) {
//     logger.error(`Failed to fetch threat tags: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch threat tags"));
//   }
// };

// // ===== Top Groups =====
// export const fetchTopGroups = async (_req, res, next) => {
//   try {
//     const body = {
//       size: 0,
//       aggs: {
//         groups: { terms: { field: "rule.groups", size: 10 } }, // no .keyword
//       },
//     };
//     const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
//     const groups = data.aggregations?.groups?.buckets || [];

//     // return plain array
//     res.status(200).json(
//       groups.map((g) => ({
//         name: g.key,
//         count: g.doc_count,
//       }))
//     );
//   } catch (err) {
//     logger.error(`Failed to fetch top groups: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch top groups"));
//   }
// };













//server/controllers/dashboardController.js


import axios from "axios";
import https from "https";
import { wazuhService } from "../services/wazuhService.js";
import { createHttpError } from "../utils/errors.js";
import { logger } from "../config/logger.js";



// import { getAgentHealth, getAgentList, getSecurityAlerts } from "../services/wazuhService.js";



// ===== Alert Count =====
export const fetchAlertsCount = async (_req, res, next) => {
  try {
    const count = await wazuhService.getTotalAlerts();
    res.status(200).json({ count });
  } catch (err) {
    logger.error(`Failed to fetch alerts count: ${err.message}`);
    next(createHttpError(500, "Failed to fetch alerts count"));
  }
};

// // ===== Metrics =====

export const fetchMetrics = async (_req, res, next) => {
  try {
    const count = await wazuhService.getTotalAlerts();
    logger.info(`📊 Total alerts fetched: ${count}`);

    const alerts = await wazuhService.getSecurityAlerts({ size: 200, timeRange: "24h" }) || [];
    res.status(200).json({ count, alerts });
  } catch (err) {
    logger.error(`❌ Failed to fetch metrics: ${err.message}`);
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



// // ===== Threat Intel =====

// export const fetchThreatIntel = async (_req, res, next) => {
//   try {
//     const alerts = await wazuhService.getThreatIntelData();

//     // Global threat map markers
//     const global = alerts
//       .filter(
//         (a) =>
//           a.agent?.geo?.latitude &&
//           a.agent?.geo?.longitude &&
//           a.agent?.geo?.country_name
//       )
//       .reduce((acc, a) => {
//         const country = a.agent.geo.country_name;
//         if (!acc[country]) {
//           acc[country] = {
//             count: 0,
//             lat: a.agent.geo.latitude,
//             lon: a.agent.geo.longitude,
//           };
//         }
//         acc[country].count++;
//         return acc;
//       }, {});
//     const globalMarkers = Object.entries(global).map(([name, data]) => ({
//       name,
//       coordinates: [data.lon, data.lat],
//       count: data.count,
//     }));

//     // Threat actor activity
//     const actors = alerts.reduce((acc, a) => {
//       const actor = a.rule?.mitre?.tactic || "Unknown";
//       acc[actor] = (acc[actor] || 0) + 1;
//       return acc;
//     }, {});
//     const actorsChart = Object.entries(actors)
//       .map(([actor, activity]) => ({ actor, activity }))
//       .sort((a, b) => b.activity - a.activity);

//     // Vulnerable assets
//     const assets = alerts
//       .filter((a) => a.rule?.groups?.includes("vulnerability"))
//       .slice(0, 5)
//       .map((asset) => ({
//         name: asset.agent?.name || "unknown",
//         status: "Vulnerable",
//         vulnerability: asset.rule?.description || "N/A",
//       }));

//     res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
//   } catch (err) {
//     logger.error(`Failed to fetch threat intel: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch threat intel"));
//   }
// };






// export const fetchActiveAgents = async (req, res) => {
//   try {
//     const agents = await wazuhService.getActiveAgents();
//     res.status(200).json(agents);
//   } catch (err) {
//     console.error("❌ Failed to fetch agents:", err.message);
//     res.status(500).json({ error: "Unable to fetch agents" });
//   }
// };



// export const fetchAgentHealth = async (req, res) => {
//   try {
//     const agents = await getAgentHealth();
//     res.status(200).json(agents);
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch agent health" });
//   }
// };

// export const fetchAgentList = async (req, res) => {
//   try {
//     const agents = await getAgentList();
//     res.status(200).json(agents);
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch agent list" });
//   }
// };

// export const fetchSecurityAlerts = async (req, res) => {
//   try {
//     const agent = req.params.agent;
//     const alerts = await getSecurityAlerts(agent);
//     res.status(200).json(alerts);
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch alerts" });
//   }
// };



// ===== Threat Intel =====
export const fetchThreatIntel = async (_req, res, next) => {
  try {
    const alerts = await wazuhService.getSecurityAlerts({ size: 1000, timeRange: "30d" });

    // Global threat map markers
    const global = alerts
      .filter(
        (a) =>
          a.agent?.geo?.latitude &&
          a.agent?.geo?.longitude &&
          a.agent?.geo?.country_name
      )
      .reduce((acc, a) => {
        const country = a.agent.geo.country_name;
        if (!acc[country]) {
          acc[country] = {
            count: 0,
            lat: a.agent.geo.latitude,
            lon: a.agent.geo.longitude,
          };
        }
        acc[country].count++;
        return acc;
      }, {});
    const globalMarkers = Object.entries(global).map(([name, data]) => ({
      name,
      coordinates: [data.lon, data.lat],
      count: data.count,
    }));

    // Threat actor activity
    const actors = alerts.reduce((acc, a) => {
      const actor = a.rule?.mitre?.tactic?.[0] || "Unknown";
      acc[actor] = (acc[actor] || 0) + 1;
      return acc;
    }, {});
    const actorsChart = Object.entries(actors)
      .map(([actor, activity]) => ({ actor, activity }))
      .sort((a, b) => b.activity - a.activity);

    // Vulnerable assets
    /*
     * BUG FIX: Vulnerable Assets display was originally filtering from the top 1000 general alerts,
     *          which often contained no vulnerabilities. It also strictly checked for the "vulnerability" group.
     * FIX:     Created `getVulnerabilityAlerts()` in WazuhService to explicitly query Elasticsearch for 
     *          "vulnerability" or "vulnerability-detector" groups. 
     *          Additionally, we now deduplicate the assets by agent name to prevent multiple vulnerabilities 
     *          on the same agent from cluttering the UI.
     */
    const vulnAlerts = await wazuhService.getVulnerabilityAlerts();

    // Deduplicate by agent name
    const uniqueAssetsMap = new Map();
    vulnAlerts.forEach((asset) => {
      const agentName = asset.agent?.name || "unknown";
      if (!uniqueAssetsMap.has(agentName)) {
        uniqueAssetsMap.set(agentName, {
          name: agentName,
          status: "Vulnerable",
          vulnerability: asset.rule?.description || "N/A",
        });
      }
    });
    const assets = Array.from(uniqueAssetsMap.values()).slice(0, 5);

    res.status(200).json({ global: globalMarkers, actors: actorsChart, assets });
  } catch (err) {
    logger.error(`Failed to fetch threat intel: ${err.message}`);
    next(createHttpError(500, "Failed to fetch threat intel"));
  }
};

// ===== Agent List =====

// export const fetchAgentList = async (_req, res) => {
//   try {
//     const agents = await wazuhService.getActiveAgents(); // ✅ not getAgentList
//     const mapped = agents
//       .filter(a => a.status === "Active") // ✅ filter active
//       .map(a => ({
//         name: a.name,
//         count: a.stats?.totalAlerts || 0
//       }));
//     res.status(200).json(mapped);
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch agent list" });
//   }
// };



// export const fetchAgentList = async (_req, res) => {
//   try {
//     const agents = await wazuhService.getActiveAgents();
//     const mapped = agents.map(a => ({
//       name: a.name,
//       count: 0 // optional: fetch alert count later
//     }));
//     res.status(200).json(mapped);
//   } catch (err) {
//     console.error("❌ fetchAgentList error:", err.message);
//     res.status(500).json({ error: "Unable to fetch agent list" });
//   }
// };





export const fetchAgentList = async (_req, res) => {
  try {
    // Step 1: Authenticate and get JWT token
    const authRes = await fetch("https://192.168.31.24:55000/security/user/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: process.env.WAZUH_API_USER || "admin", password: process.env.WAZUH_API_PASS || "admin" }),
      agent: new https.Agent({ rejectUnauthorized: false })
    });

    const authJson = await authRes.json();
    const token = authJson?.data?.token;
    if (!token) throw new Error("Missing JWT token");

    // Step 2: Fetch active agents
    const agentsRes = await fetch("https://192.168.31.24:55000/agents?status=active", {
      headers: { Authorization: `Bearer ${token}` },
      agent: new https.Agent({ rejectUnauthorized: false })
    });

    const agentsJson = await agentsRes.json();
    const agents = agentsJson?.data || [];

    // Step 3: Map agent data
    const mapped = agents.map((a) => ({
      id: a.id,
      name: a.name,
      status: a.status,
    }));

    res.status(200).json(mapped);
  } catch (err) {
    console.error("❌ fetchAgentList error:", err.message);
    res.status(500).json({ error: "Unable to fetch agent list" });
  }
};




// ===== Agent Health =====
/**
 * BUG FIX LOG (2026-02-18):
 * 
 * ISSUE: Duplicate Simultaneous Requests Triggering Rate Limits
 * - SYMPTOM: HTTP 429 "Too Many Requests" errors appearing frequently
 * - ROOT CAUSE: No server-side caching. When multiple clients/components load the
 *   Networking and Threat Intelligence pages simultaneously, both call the same
 *   `/api/wazuh/agent-health` endpoint without caching, creating multiple simultaneous
 *   requests to the Wazuh API which triggers its rate limiting.
 * - SOLUTION: Implemented server-side response caching (30 second TTL):
 *   1. Cache successful responses at module level (agentHealthCache)
 *   2. Multiple requests within 30s window get cached response instead of new API call
 *   3. On fetch errors, return stale cache if available (graceful degradation)
 *   4. Combined with client-side 60s cache and request deduplication (see useAgentHealth.js)
 */

// Cache for agent health to prevent rate limiting from multiple simultaneous requests
let agentHealthCache = {
  data: null,
  timestamp: 0,
  duration: 30000, // 30 seconds cache - server-side TTL
};

export const fetchAgentHealth = async (_req, res) => {
  try {
    console.log("🔍 [fetchAgentHealth] Starting agent health fetch...");

    // ============ CACHE CHECK ============
    // If we have valid cached data, return it immediately without calling Wazuh API
    // This prevents hammering the Wazuh API when multiple requests come in rapid succession
    const now = Date.now();
    if (agentHealthCache.data && (now - agentHealthCache.timestamp < agentHealthCache.duration)) {
      console.log("✅ [fetchAgentHealth] Using cached response (", now - agentHealthCache.timestamp, "ms old)");
      console.log("✅ [fetchAgentHealth] Returning", agentHealthCache.data.length, "cached agents");
      return res.status(200).json(agentHealthCache.data);
    }

    const agents = await wazuhService.getAgentHealth();
    console.log("📡 [fetchAgentHealth] Raw agents from service:", agents);
    console.log("📡 [fetchAgentHealth] Agent count:", agents.length);

    const mapped = agents.map((a) => ({
      name: a.name,
      status: a.status,
    }));

    console.log("✅ [fetchAgentHealth] Mapped agents:", mapped);
    console.log("✅ [fetchAgentHealth] Returning", mapped.length, "agents");

    // ============ UPDATE CACHE ============
    // Store successful response so subsequent requests within 30s get cached data
    agentHealthCache.data = mapped;
    agentHealthCache.timestamp = Date.now();

    res.status(200).json(mapped);
  } catch (err) {
    console.error("❌ [fetchAgentHealth] Error:", err.message);
    console.error("❌ [fetchAgentHealth] Stack:", err.stack);
    logger.error(`Failed to fetch agent health: ${err.message}`);

    // ============ ERROR HANDLING WITH CACHE FALLBACK ============
    // If API call fails, return stale cached data instead of error
    // This provides graceful degradation - better to show old data than no data
    if (agentHealthCache.data) {
      console.log("⚠️ [fetchAgentHealth] Error occurred, returning stale cache");
      return res.status(200).json(agentHealthCache.data);
    }

    res.status(500).json({ error: "Unable to fetch agent health" });
  }
};

// ===== Agent Details =====

// export const fetchSecurityAlerts = async (req, res) => {
//   try {
//     const agent = req.params.agent;
//     const alerts = await wazuhService.getSecurityAlerts(agent);

//     const tactics = {};
//     const techniques = {};

//     alerts.forEach((alert) => {
//       alert.rule?.mitre?.tactic?.forEach((t) => {
//         tactics[t] = (tactics[t] || 0) + 1;
//       });
//       alert.rule?.mitre?.id?.forEach((tech) => {
//         techniques[tech] = (techniques[tech] || 0) + 1;
//       });
//     });

//     const mitre = {
//       tactics: Object.entries(tactics).map(([key, count]) => ({ key, count })),
//       techniques: Object.entries(techniques).map(([key, count]) => ({ key, count })),
//     };

//     res.status(200).json({ alerts, mitre });
//   } catch (err) {
//     logger.error(`Failed to fetch agent alerts: ${err.message}`);
//     res.status(500).json({ error: "Unable to fetch alerts" });
//   }
// };

export const fetchSecurityAlerts = async (req, res) => {
  try {
    const agent = req.params.agent;
    const alerts = await getSecurityAlerts(agent); // "all" supported

    const tactics = {};
    const techniques = {};

    alerts.forEach((alert) => {
      alert.rule?.mitre?.tactic?.forEach((t) => {
        tactics[t] = (tactics[t] || 0) + 1;
      });
      alert.rule?.mitre?.id?.forEach((tech) => {
        techniques[tech] = (techniques[tech] || 0) + 1;
      });
    });

    const mitre = {
      tactics: Object.entries(tactics).map(([key, count]) => ({ key, count })),
      techniques: Object.entries(techniques).map(([key, count]) => ({ key, count })),
    };

    res.status(200).json({ agent, alerts, mitre });
  } catch (err) {
    logger.error(`Failed to fetch agent alerts: ${err.message}`);
    res.status(500).json({ error: "Unable to fetch alerts" });
  }
};


export const fetchActiveAgents = async (req, res) => {
  try {
    const agents = await wazuhService.getActiveAgents();
    res.status(200).json(agents);
  } catch (err) {
    console.error("❌ Failed to fetch active agents:", err.message);
    res.status(500).json({ error: "Unable to fetch active agents" });
  }
};









// ===== Networking =====
// export const fetchNetworking = async (_req, res, next) => {
//   try {
//     const traffic = await wazuhService.getTrafficData("24h");
//     const firewall = await wazuhService.getNetworkingData();
//     const malware = firewall.filter((a) => a.rule?.groups?.includes("malware"));
//     res.status(200).json({ traffic, firewall, malware });
//   } catch (err) {
//     logger.error(`Failed to fetch networking data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch networking data"));
//   }
// };



// export const fetchNetworking = async (_req, res, next) => {
//   try {
//     const flowAlerts = await wazuhService.getFlowData();

//     const traffic = flowAlerts.map((a) => ({
//       time: a["@timestamp"],
//       inbound: a.data?.flow?.bytes_toclient || 0,
//       outbound: a.data?.flow?.bytes_toserver || 0,
//     }));

//     const firewallCounts = flowAlerts.reduce((acc, a) => {
//       const proto = a.data?.proto || a.data?.flow?.protocol || "unknown";
//       acc[proto] = (acc[proto] || 0) + 1;
//       return acc;
//     }, {});
//     const firewall = Object.entries(firewallCounts).map(([protocol, count]) => ({
//       protocol,
//       count,
//     }));

//     const malware = flowAlerts
//       .filter((a) => a.rule?.groups?.includes("malware"))
//       .map((a) => ({
//         type: a.rule?.description,
//         target: a.agent?.name || "unknown",
//         timestamp: a["@timestamp"],
//       }));

//     res.status(200).json({ traffic, firewall, malware });
//   } catch (err) {
//     logger.error(`Failed to fetch networking data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch networking data"));
//   }
// };



// ===== Networking =====

export async function fetchNetworking(req, res) {
  try {
    let alerts = [];
    try {
      const token = await wazuhService.getToken();
      alerts = await wazuhService.getNetworkingAlerts(token);
    } catch (e) {
      alerts = await wazuhService.getSecurityAlerts({ size: 1000 });
    }

    // 1. Extract firewall alerts
    let firewall = alerts.filter(a =>
      a.rule?.groups?.some(g => ["firewall", "suricata", "ids", "web", "access_control"].includes(g.toLowerCase())) ||
      a.rule?.description?.toLowerCase().includes("firewall")
    );

    // 2. Extract malware alerts
    const malware = alerts.filter(a =>
      a.rule?.groups?.some(g => ["malware", "virus", "trojan"].includes(g.toLowerCase())) ||
      a.rule?.description?.toLowerCase().includes("malware")
    );

    // 3. Extract traffic data
    let traffic = alerts.filter(a => a.data?.inbound !== undefined || a.data?.outbound !== undefined);

    // Return genuine zero data instead of mock data
    // (Wazuh connected → no alerts is better than placeholder data)
    console.warn("ℹ️ [fetchNetworking] Returning zero data (no real alerts found). Wazuh is connected but there are no current alerts.");

    res.status(200).json({
      traffic,
      firewall,
      malware
    });
  } catch (err) {
    console.error("fetchNetworking error:", err.message);
    res.status(500).json({ error: "Failed to fetch networking data" });
  }
}


// ===== Agent Details =====
export const fetchAgentDetails = async (req, res, next) => {
  try {
    const agent = req.params.name;
    let alerts = await wazuhService.getSecurityAlerts({ agent, size: 100 });

    // Fallback: if no alerts found for the exact agent name, perform a
    // broader, case-insensitive substring match over a larger window of alerts.
    if ((!alerts || alerts.length === 0) && agent && agent !== "all") {
      try {
        const allAlerts = await wazuhService.getSecurityAlerts({ size: 1000 });
        const normalize = (s) => (s || "").toString().toLowerCase().replace(/[^a-z0-9]/g, "");
        const needle = normalize(agent);
        const filtered = (allAlerts || []).filter((a) => {
          const name = normalize(a.agent?.name);
          return name.includes(needle);
        });
        alerts = filtered.slice(0, 200);
        console.warn(`⚠️ [fetchAgentDetails] Fallback matched ${alerts.length} alerts for agent=${agent}`);
      } catch (fbErr) {
        console.error("❌ [fetchAgentDetails] Fallback search failed:", fbErr.message);
      }
    }

    const mitre = alerts.reduce(
      (acc, a) => {
        const tactic = a.rule?.mitre?.tactic;
        const technique = a.rule?.mitre?.technique;

        if (Array.isArray(tactic)) {
          tactic.forEach((t) => {
            acc.tactics[t] = (acc.tactics[t] || 0) + 1;
          });
        } else if (typeof tactic === "string") {
          acc.tactics[tactic] = (acc.tactics[tactic] || 0) + 1;
        }

        if (Array.isArray(technique)) {
          technique.forEach((t) => {
            acc.techniques[t] = (acc.techniques[t] || 0) + 1;
          });
        } else if (typeof technique === "string") {
          acc.techniques[technique] = (acc.techniques[technique] || 0) + 1;
        }

        return acc;
      },
      { tactics: {}, techniques: {} }
    );

    res.status(200).json({
      agent,
      alerts: Array.isArray(alerts) ? alerts : [],
      mitre: {
        tactics: Object.entries(mitre.tactics).map(([key, count]) => ({ key, count })),
        techniques: Object.entries(mitre.techniques).map(([key, count]) => ({ key, count })),
      },
    });
  } catch (err) {
    console.error(`❌ Agent fetch error: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch agent details" });
  }
};


// ===== User Endpoint =====
// export const fetchUserEndpoint = async (_req, res, next) => {
//   try {
//     const logons = await wazuhService.getUserEndpointData();

//     // Summarize logons by user
//     const logonSummary = logons.reduce((acc, alert) => {
//       const user = alert.user?.name || "unknown";
//       if (!acc[user]) acc[user] = { user, success: 0, failure: 0 };
//       if (alert.rule?.description?.toLowerCase().includes("successful")) acc[user].success++;
//       if (alert.rule?.description?.toLowerCase().includes("failed")) acc[user].failure++;
//       return acc;
//     }, {});
//     const logonData = Object.values(logonSummary);

//     // Locations
//     const locations = logons
//       .filter((a) => a.location?.lat && a.location?.lon)
//       .map((a) => ({ lat: a.location.lat, lon: a.location.lon }));

//     // Compliance %
//     const total = logons.length;
//     const compliant = logons.filter((a) => a.rule?.groups?.includes("pci_dss_10.2")).length;
//     const compliance = total > 0 ? Math.round((compliant / total) * 100) : 0;

//     res.status(200).json({ logons: logonData, locations, compliance });
//   } catch (err) {
//     logger.error(`Failed to fetch user endpoint data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch user endpoint data"));
//   }
// };






export const fetchUserEndpoint = async (req, res) => {
  try {
    const data = await wazuhService.getUserEndpointData();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ fetchUserEndpoint error:", err.message);
    res.status(500).json({ message: "Failed to fetch user endpoint data" });
  }
};




// ===== MitreAlerts =====


export async function fetchMitreAlerts(req, res) {
  const technique = req.query.technique;

  const query = {
    size: 50,
    query: technique
      ? { match: { "rule.mitre.id": technique } }
      : { exists: { field: "rule.mitre.id" } },
    sort: [{ "@timestamp": { order: "desc" } }]
  };

  try {
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
    res.json({ alerts });
  } catch (err) {
    console.error("fetchMitreAlerts error:", err.message);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
}





// // ===== Compliance =====
// export const fetchCompliance = async (_req, res, next) => {
//   try {
//     const violations = await wazuhService.getComplianceData();

//     // Audit chart (group by hour)
//     const auditCounts = violations.reduce((acc, alert) => {
//       const hour = new Date(alert["@timestamp"]).getHours();
//       acc[hour] = (acc[hour] || 0) + 1;
//       return acc;
//     }, {});
//     const auditChart = Object.entries(auditCounts).map(([time, count]) => ({
//       time: `${time}:00`,
//       volume: count,
//     }));

//     // Policy violations
//     const policyViolations = violations
//       .filter((a) => a.rule?.groups?.includes("policy_violation"))
//       .slice(0, 5)
//       .map((a) => ({
//         timestamp: a["@timestamp"],
//         description: a.rule?.description,
//       }));

//     res.status(200).json({ auditChart, policyViolations });
//   } catch (err) {
//     logger.error(`Failed to fetch compliance data: ${err.message}`);
//     next(createHttpError(500, "Failed to fetch compliance data"));
//   }
// };



// server/src/controllers/wazuhController.js
export const getComplianceData = async (req, res, next) => {
  try {
    const response = await axios.get("http://localhost:55000/compliance") // or wherever your Wazuh API lives
    const data = response.data

    res.json({
      auditChart: data.auditChart || [],
      policyViolations: data.policyViolations || [],
    })
  } catch (err) {
    console.error("Compliance fetch error:", err)
    res.status(500).json({ message: "Failed to fetch compliance data" })
  }
}




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
    logger.error(`Failed to fetch train/test: ${err.message}`);
    next(createHttpError(500, "Failed to fetch train/test"));
  }
};




// ===== Trending Graphs =====
export const fetchTrending = async (_req, res, next) => {
  try {
    const body = {
      size: 0,
      query: { range: { "@timestamp": { gte: "now-7d/d", lte: "now" } } },
      aggs: {
        per_day: {
          date_histogram: { field: "@timestamp", calendar_interval: "day" },
        },
      },
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    const buckets = data.aggregations?.per_day?.buckets || [];
    const trending = buckets.map((b) => ({
      day: new Date(b.key_as_string).toLocaleDateString("en-US", { weekday: "short" }),
      count: b.doc_count,
    }));
    res.status(200).json(trending);
  } catch (err) {
    logger.error(`Failed to fetch trending: ${err.message}`);
    next(createHttpError(500, "Failed to fetch trending"));
  }
};

// ===== Threat Tags =====
export const fetchThreatTags = async (_req, res, next) => {
  try {
    const body = {
      size: 0,
      aggs: {
        tags: { terms: { field: "rule.groups", size: 10 } }, // removed .keyword
      },
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    const tags = data.aggregations?.tags?.buckets || [];

    res.status(200).json(
      tags.map((t) => ({
        tag: t.key,
        count: t.doc_count,
      }))
    );
  } catch (err) {
    logger.error(`Failed to fetch threat tags: ${err.message}`);
    next(createHttpError(500, "Failed to fetch threat tags"));
  }
};

// ===== Top Groups =====
export const fetchTopGroups = async (_req, res, next) => {
  try {
    const body = {
      size: 0,
      aggs: {
        groups: { terms: { field: "rule.groups", size: 10 } }, // removed .keyword
      },
    };
    const data = await wazuhService.indexerPost("/wazuh-alerts-*/_search", body);
    const groups = data.aggregations?.groups?.buckets || [];

    res.status(200).json(
      groups.map((g) => ({
        name: g.key,
        count: g.doc_count,
      }))
    );
  } catch (err) {
    logger.error(`Failed to fetch top groups: ${err.message}`);
    next(createHttpError(500, "Failed to fetch top groups"));
  }
};




