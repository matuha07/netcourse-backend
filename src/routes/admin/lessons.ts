import { Router } from "express";
import {
  createLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
} from "../../controllers/lessonController"
import { createLessonSchema, updateLessonSchema } from "../../validators/lessonSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.get("/", getAllLessons);
router.get("/:id", getLessonById);
router.post("/", validate(createLessonSchema) ,createLesson);
router.put("/:id", validate(updateLessonSchema), updateLesson);
router.delete("/:id", deleteLesson);

export default router;
