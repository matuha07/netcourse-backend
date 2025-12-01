import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../validators/userSchemas";

const router = Router();

router.post("/", validate(createUserSchema),createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.get("/:id", getUserById);

export default router;
