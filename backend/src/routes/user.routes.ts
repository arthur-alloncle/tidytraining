import { Router } from "express";
import { findUserById } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { findUserByIdSchema } from "../schemas/user.schema.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.get('/:id', authGuard, validate(findUserByIdSchema), findUserById);

export default router