import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
} from "../../controllers/quizController";
import { authenticate } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";
import { submitQuizSchema } from "../../validators/quizSchemas";


const router = Router({ mergeParams: true });

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/attempts", authenticate, validate(submitQuizSchema), submitQuizAttempt);

export default router;
