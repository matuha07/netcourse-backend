import { Router } from "express";
import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController";
import { validate } from "../middleware/validate";
import { createLessonSchema } from "../validators/lessonSchemas";

const router = Router({ mergeParams: true });

router.post("/", validate(createLessonSchema) ,createLesson);
router.get("/", getAllLessons);
router.get("/:id", getLessonById);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

export default router;
