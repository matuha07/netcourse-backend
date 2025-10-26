import { Router } from "express";
import {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answerController";

const router = Router();

router.post("/", createAnswer);
router.get("/", getAllAnswers);
router.get("/:id", getAnswerById);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);

export default router;
