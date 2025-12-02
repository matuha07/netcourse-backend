import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../../controllers/quizController";


const router = Router({ mergeParams: true });

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);

export default router;
