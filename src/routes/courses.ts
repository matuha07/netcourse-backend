import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { validate } from "../middleware/validate";
import { createCourseSchema } from "../validators/courseSchemas";

const router = Router();

router.post("/", validate(createCourseSchema), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
