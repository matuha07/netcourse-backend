import { Router } from "express";
import {
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../controllers/lessonController"
import { createLessonSchema, updateLessonSchema } from "../../validators/lessonSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.post("/", validate(createLessonSchema) ,createLesson);
router.put("/:id", validate(updateLessonSchema), updateLesson);
router.delete("/:id", deleteLesson);

export default router;
