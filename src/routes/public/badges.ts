import { Router } from "express";
import {
  getAllBadges,
  getMyBadges,
} from "../../controllers/badgeController";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.get("/", getAllBadges);
router.get("/me", authenticate, getMyBadges);

export default router;