import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id", getUserById);

export default router;
