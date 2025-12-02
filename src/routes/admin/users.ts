import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
} from "../../controllers/userController"
import { createUserSchema, updateUserSchema } from "../../validators/userSchemas";
import { authenticate, requireRole } from "../../middleware/authMiddleware";
import { validate } from "../../middleware/validate";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]))

router.post("/",  validate(createUserSchema), createUser);
router.get("/",  getAllUsers);
router.delete("/:id",  deleteUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.get("/:id", getUserById);

export default router;
