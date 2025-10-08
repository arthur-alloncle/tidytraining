import { Router } from "express";

import { testRoute } from "../controllers/defaultController";

const router = Router();

router.get('/', testRoute);

export default router;
