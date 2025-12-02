import { Router } from "express";
import {
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../controllers/quizController"
import { createQuizSchema, updateQuizSchema } from "../../validators/quizSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";


const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.post("/", validate(createQuizSchema), createQuiz);
router.put("/:id", validate(updateQuizSchema), updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
