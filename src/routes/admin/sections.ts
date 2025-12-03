import { Router } from "express";
import {
  createSection,
  updateSection,
  deleteSection,
  getAllSections,
  getSectionById,
} from "../../controllers/sectionController"
import { createSectionSchema, updateSectionSchema } from "../../validators/sectionSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";


const router = Router({ mergeParams: true });

router.use(authenticate, requireRole(["ADMIN"]))

router.get("/", getAllSections);
router.get("/:sectionId", getSectionById);
router.post("/", validate(createSectionSchema), createSection);
router.put("/:sectionId", validate(updateSectionSchema), updateSection);
router.delete("/:sectionId", deleteSection);

export default router;
