import { Router } from "express";
import {
  getPublicProfileById,
  getPublicProfileByUsername,
} from "../../controllers/userController";

const router = Router();

router.get("/u/:username", getPublicProfileByUsername);
router.get("/:id", getPublicProfileById);

export default router;
