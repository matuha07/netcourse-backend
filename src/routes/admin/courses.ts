import { Router } from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById
} from "../../controllers/courseController"
import { createCourseSchema, updateCourseSchema } from "../../validators/courseSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]))

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);
router.post("/", validate(createCourseSchema), createCourse);

export default router;
