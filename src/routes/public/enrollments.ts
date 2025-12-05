import { Router } from "express";
import {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
} from "../../controllers/enrollmentController";
import { validate } from "../../middleware/validate";
import { enrollSchema } from "../../validators/enrollmentSchemas";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.post("/", validate(enrollSchema), createEnrollment);
router.get("/", getEnrollments);
router.delete("/:enrollmentId", deleteEnrollment);

export default router;
