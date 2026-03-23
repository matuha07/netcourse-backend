import { Router } from "express";
import {
  getForumRepliesForPost,
  createForumReply,
  updateForumReply,
  deleteForumReply,
} from "../../controllers/forumReplyController";
import { authenticate } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";
import {
  createForumReplySchema,
  updateForumReplySchema,
} from "../../validators/forumReplySchemas";

const router = Router({ mergeParams: true });

router.get("/", getForumRepliesForPost);
router.post("/", authenticate, validate(createForumReplySchema), createForumReply);
router.put(
  "/:replyId",
  authenticate,
  validate(updateForumReplySchema),
  updateForumReply,
);
router.delete("/:replyId", authenticate, deleteForumReply);

export default router;
