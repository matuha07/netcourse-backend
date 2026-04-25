import { Router } from "express";
import {
  getMyCertifications,
  verifyCertificate,
  getCertificatePdf,
} from "../../controllers/certificationController";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.get("/me", authenticate, getMyCertifications);
router.get("/verify/:code", verifyCertificate);
router.get("/:code/pdf", authenticate, getCertificatePdf);

export default router;
