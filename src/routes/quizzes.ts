import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController";
import { validate } from "../middleware/validate";
import { createQuizSchema, updateQuizSchema } from "../validators/quizSchemas";

const router = Router({ mergeParams: true });

router.post("/", validate(createQuizSchema), createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", validate(updateQuizSchema), updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
