import { Router } from "express";
import { register, login } from "../../controllers/authController";
import { validate} from "../../middleware/validate";
import { verifyTurnstile } from "../../middleware/turnstileMiddleware";
import { createUserSchema } from "../../validators/userSchemas";
import { loginSchema } from "../../validators/authSchemas";

const router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;