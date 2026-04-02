import { Router } from "express";
import {
  getForumRepliesForPost,
  createForumReply,
  updateForumReply,
  deleteForumReply,
  likeForumReply,
  unlikeForumReply,
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
router.post("/:replyId/likes", authenticate, likeForumReply);
router.delete("/:replyId/likes", authenticate, unlikeForumReply);
router.put(
  "/:replyId",
  authenticate,
  validate(updateForumReplySchema),
  updateForumReply,
);
router.delete("/:replyId", authenticate, deleteForumReply);

export default router;
