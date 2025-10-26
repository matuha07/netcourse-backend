import { Router } from "express";
import {
  getLessonProgress,
  updateProgress,
} from "../controllers/progressController";

const router = Router({ mergeParams: true });

router.get("/", getLessonProgress);
router.put("/", updateProgress);

export default router;
