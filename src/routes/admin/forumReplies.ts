import { Router } from "express";
import {
  createForumReply,
  updateForumReply,
  deleteForumReply,
} from "../../controllers/forumReplyController";
import {
  createForumReplySchema,
  updateForumReplySchema,
} from "../../validators/forumReplySchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]));

router.post("/", validate(createForumReplySchema), createForumReply);
router.put("/:replyId", validate(updateForumReplySchema), updateForumReply);
router.delete("/:replyId", deleteForumReply);

export default router;
