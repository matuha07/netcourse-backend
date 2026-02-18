import { Router } from "express";
import {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../controllers/socialLinkController";
import {
  createSocialLinkSchema,
  updateSocialLinkSchema,
} from "../../validators/socialLinkSchemas";
import { authenticate } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router();

router.use(authenticate);

router.get("/", getSocialLinks);
router.post("/", validate(createSocialLinkSchema), createSocialLink);
router.put("/:id", validate(updateSocialLinkSchema), updateSocialLink);
router.delete("/:id", deleteSocialLink);

export default router;