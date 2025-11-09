import { Router } from "express";

import { urlShort } from "../controllers/urlController";

const router = Router();

router.post("/", urlShort);

export default router;
