import { Router } from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
} from "../../controllers/questionController"
import { createQuestionSchema, updateQuestionSchema } from "../../validators/questionSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))


router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.post("/", validate(createQuestionSchema), createQuestion);
router.put("/:id", validate(updateQuestionSchema), updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
