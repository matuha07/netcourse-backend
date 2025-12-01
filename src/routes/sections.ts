import { Router } from "express";
import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/sectionController";
import { validate } from "../middleware/validate";
import { createSectionSchema, updateSectionSchema } from "../validators/sectionSchemas";

const router = Router({ mergeParams: true });

router.post("/", validate(createSectionSchema), createSection);
router.get("/", getAllSections);
router.get("/:sectionId", getSectionById);
router.put("/:sectionId", validate(updateSectionSchema), updateSection);
router.delete("/:sectionId", deleteSection);

export default router;
