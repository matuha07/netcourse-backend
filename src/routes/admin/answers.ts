import { Router } from "express";
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAllAnswers,
  getAnswerById
} from "../../controllers/answerController"
import { createAnswerSchema, updateAnswerSchema } from "../../validators/answerSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.get("/", getAllAnswers);
router.get("/:id", getAnswerById);
router.post("/",  validate(createAnswerSchema), createAnswer);
router.put("/:id",  validate(updateAnswerSchema), updateAnswer);
router.delete("/:id", deleteAnswer);

export default router;
