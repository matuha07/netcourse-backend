import { Router } from "express";
import { authenticate } from "../../middleware/authMiddleware";
import {
  getUserProgress,
  updateUserProgress,
} from "../../controllers/progressController";
import { validate } from "../../middleware/validate";
import { updateProgressSchema } from "../../validators/progressSchemas";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getUserProgress);
router.put("/", authenticate, validate(updateProgressSchema), updateUserProgress);

export default router;
