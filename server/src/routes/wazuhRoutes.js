// // // // server/src/routes/wazuhRoutes.js


// import { Router } from "express";
// import {
//   fetchMetrics,
//   fetchIncidents,
//   fetchThreatIntel,
//   fetchNetworking,
//   fetchUserEndpoint,
//   fetchCompliance,
// } from "../controllers/wazuhController.js";

// const router = Router();

// router.get("/metrics", fetchMetrics);
// router.get("/incidents", fetchIncidents);
// router.get("/threat-intel", fetchThreatIntel);
// router.get("/networking", fetchNetworking);
// router.get("/user-endpoint", fetchUserEndpoint);
// router.get("/compliance", fetchCompliance);



// export default router;











import { Router } from "express";
import {
  fetchMetrics,
  fetchIncidents,
  fetchThreatIntel,
  fetchNetworking,
  fetchUserEndpoint,
  getComplianceData,
  fetchTrainTest,
  fetchTrending,
  fetchThreatTags,
  fetchAgentDetails,
  fetchAgentHealth,
  fetchActiveAgents,
  fetchAgentList,
  fetchSecurityAlerts,
  fetchMitreAlerts,
  fetchAlertsCount,
  fetchMitreMap,
} from "../controllers/wazuhController.js";
import { requireAuth } from "../middleware/auth.js"
import { rbac } from "../middleware/auth.js"



const router = Router();

// Main dashboard routes
router.get("/metrics", fetchMetrics);
router.get("/incidents", fetchIncidents);
router.get("/threat-intel", fetchThreatIntel);
router.get("/networking", fetchNetworking);
router.get("/user-endpoint", fetchUserEndpoint);
// server/src/routes/wazuhRoutes.js
router.get("/compliance", requireAuth, rbac(["admin"]), getComplianceData)

// Additional dashboard cards
router.get("/train-test", fetchTrainTest);
router.get("/trending", fetchTrending);
router.get("/threat-tags", fetchThreatTags);
router.get("/mitre-map", fetchMitreMap);


router.get("/agent/:name", fetchAgentDetails);
router.get("/agent-health", fetchAgentHealth);
router.get("/active-agents", fetchActiveAgents);
router.get("/agents", fetchAgentList);

// Specific routes first
router.get("/alerts/count", fetchAlertsCount);
router.get("/alerts/:agent", fetchSecurityAlerts);
router.get("/alerts", fetchMitreAlerts);


export default router;
