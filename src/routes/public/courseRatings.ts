import { Router } from "express";
import {
  getCourseRatings,
  getMyCourseRating,
  upsertCourseRating,
} from "../../controllers/courseRatingController";
import { authenticate } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";
import {
  courseRatingParamsSchema,
  upsertCourseRatingSchema,
} from "../../validators/courseRatingSchemas";

const router = Router({ mergeParams: true });

router.get("/", validate(courseRatingParamsSchema), getCourseRatings);
router.get(
  "/me",
  authenticate,
  validate(courseRatingParamsSchema),
  getMyCourseRating,
);
router.post(
  "/",
  authenticate,
  validate(upsertCourseRatingSchema),
  upsertCourseRating,
);

export default router;
