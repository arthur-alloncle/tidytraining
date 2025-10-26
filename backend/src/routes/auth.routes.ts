import { Router } from "express";
import { loginUser, logoutUser, refreshToken, createUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register',validate(createUserSchema), createUser)
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser)

export default router;