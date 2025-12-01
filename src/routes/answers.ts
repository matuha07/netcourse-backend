import { Router } from "express";
import {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answerController";
import { createAnswerSchema, updateAnswerSchema } from "../validators/answerSchemas";
import { validate } from "../middleware/validate";

const router = Router({ mergeParams: true });

router.post("/", validate(createAnswerSchema), createAnswer);
router.get("/", getAllAnswers);
router.get("/:id", getAnswerById);
router.put("/:id", validate(updateAnswerSchema), updateAnswer);
router.delete("/:id", deleteAnswer);

export default router;
