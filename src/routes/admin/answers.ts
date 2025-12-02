import { Router } from "express";
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../controllers/answerController"
import { createAnswerSchema, updateAnswerSchema } from "../../validators/answerSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.post("/",  validate(createAnswerSchema), createAnswer);
router.put("/:id",  validate(updateAnswerSchema), updateAnswer);
router.delete("/:id", deleteAnswer);

export default router;
