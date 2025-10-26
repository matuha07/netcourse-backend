import { Router } from "express";
import userRoutes from "./users";
import courseRoutes from "./courses";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
export default router;
