import { Router } from "express";
import { getUserCertifications } from "../../controllers/certificationController";
import { authenticate, requireRole } from "../../middleware/authMiddleware";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]));

router.get("/users/:userId", getUserCertifications);

export default router;