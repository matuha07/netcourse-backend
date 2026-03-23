import { Router } from "express";
import {
  getAllForumPosts,
  getForumPostById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
} from "../../controllers/forumPostController";
import { authenticate } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";
import {
  createForumPostSchema,
  updateForumPostSchema,
} from "../../validators/forumPostSchemas";

const router = Router();

router.get("/", getAllForumPosts);
router.get("/:postId", getForumPostById);
router.post("/", authenticate, validate(createForumPostSchema), createForumPost);
router.put(
  "/:postId",
  authenticate,
  validate(updateForumPostSchema),
  updateForumPost,
);
router.delete("/:postId", authenticate, deleteForumPost);

export default router;
