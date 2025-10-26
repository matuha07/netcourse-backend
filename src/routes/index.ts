import { Router } from "express";
import userRoutes from "./users";
import courseRoutes from "./courses";
import sectionRoutes from "./sections";
import lessonRoutes from "./lessons";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/sections", sectionRoutes);
router.use("/lessons", lessonRoutes);
export default router;
