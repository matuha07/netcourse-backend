import { Router } from "express";
import {
  getAllLessons,
  getLessonById,
} from "../../controllers/lessonController";

const router = Router({ mergeParams: true });

router.get("/", getAllLessons);
router.get("/:id", getLessonById);

export default router;
