import { Router } from "express";
import {
  createForumPost,
  updateForumPost,
  deleteForumPost,
} from "../../controllers/forumPostController";
import {
  createForumPostSchema,
  updateForumPostSchema,
} from "../../validators/forumPostSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]));

router.post("/", validate(createForumPostSchema), createForumPost);
router.put("/:postId", validate(updateForumPostSchema), updateForumPost);
router.delete("/:postId", deleteForumPost);

export default router;
