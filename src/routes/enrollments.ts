import { Router } from "express";
import {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
} from "../controllers/enrollmentController";
import { validate } from "../middleware/validate";
import { enrollSchema } from "../validators/enrollmentSchemas";

const router = Router({ mergeParams: true });

router.post("/", validate(enrollSchema) ,createEnrollment);
router.get("/", getEnrollments);
router.delete("/:enrollmentId", deleteEnrollment);

export default router;
