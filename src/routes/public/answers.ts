import { Router } from "express";
import {
  getAllAnswers,
  getAnswerById,
} from "../../controllers/answerController";

const router = Router({ mergeParams: true });

router.get("/", getAllAnswers);
router.get("/:id", getAnswerById);

export default router;
