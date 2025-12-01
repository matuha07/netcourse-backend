import { Router } from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController";
import { validate } from "../middleware/validate";
import { createQuestionSchema, updateQuestionSchema } from "../validators/questionSchemas";

const router = Router({ mergeParams: true });

router.post("/", validate(createQuestionSchema), createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", validate(updateQuestionSchema), updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
