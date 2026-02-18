import { Router } from "express";
import {
  getMyCertifications,
  verifyCertificate,
} from "../../controllers/certificationController";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.get("/me", authenticate, getMyCertifications);
router.get("/verify/:code", verifyCertificate);

export default router;