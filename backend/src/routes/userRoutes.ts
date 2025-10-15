import { Router } from "express";
import { createUser, findUserById } from "../controllers/userController.js";

const router = Router();

router.get('/me/:id', findUserById);
router.post('/register', createUser);

export default router