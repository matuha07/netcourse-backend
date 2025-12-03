import { Router } from "express";
import {
  getAllCourseProgress,
  getUserProgressAdmin,
  updateUserProgressAdmin,
} from "../../controllers/progressController";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";
import { updateProgressSchema } from "../../validators/progressSchemas";

const router = Router({ mergeParams: true });

router.get("/", authenticate, requireRole(["ADMIN"]), getAllCourseProgress);

router.get(
  "/:userId",
  authenticate,
  requireRole(["ADMIN"]),
  getUserProgressAdmin
);

router.put(
  "/:userId",
  authenticate,
  requireRole(["ADMIN"]),
  validate(updateProgressSchema),
  updateUserProgressAdmin
);

export default router;
