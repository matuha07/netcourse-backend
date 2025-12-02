import { Router } from "express";
import {
  getLessonProgress,
  updateProgress,
} from "../../controllers/progressController";
import { validate } from "../../middleware/validate";
import { updateProgressSchema } from "../../validators/progressSchemas";

const router = Router({ mergeParams: true });

router.get("/", getLessonProgress);
router.put("/", validate(updateProgressSchema), updateProgress);

export default router;
