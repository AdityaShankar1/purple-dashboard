// import { Router } from "express";
// import auth from "../middleware/auth.js"
// import { userDashboard } from "../controllers/dashboardController.js";
// const router = Router();
// router.get("/user", auth, userDashboard);
// export default router;









import { Router } from "express";
import { requireAuth } from "../middleware/auth.js"; // Named import for requireAuth
import { userDashboard } from "../controllers/dashboardController.js";

const router = Router();

// Use requireAuth middleware to protect the route
router.get("/user", requireAuth, userDashboard);

export default router;
