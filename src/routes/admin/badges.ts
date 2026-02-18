import { Router } from "express";
import {
  createBadge,
  getAllBadges,
  updateBadge,
  deleteBadge,
  getUserBadges,
} from "../../controllers/badgeController";
import {
  createBadgeSchema,
  updateBadgeSchema,
} from "../../validators/badgeSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]));

router.get("/", getAllBadges);
router.post("/", validate(createBadgeSchema), createBadge);
router.put("/:id", validate(updateBadgeSchema), updateBadge);
router.delete("/:id", deleteBadge);
router.get("/users/:userId", getUserBadges);

export default router;