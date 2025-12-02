import { Router } from "express";
import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../../controllers/sectionController";


const router = Router({ mergeParams: true });

router.get("/", getAllSections);
router.get("/:sectionId", getSectionById);

export default router;
