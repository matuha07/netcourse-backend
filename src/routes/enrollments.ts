import { Router } from "express";
import {
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
} from "../controllers/enrollmentController";

const router = Router({ mergeParams: true });

router.post("/", createEnrollment);
router.get("/", getEnrollments);
router.delete("/:enrollmentId", deleteEnrollment);

export default router;
