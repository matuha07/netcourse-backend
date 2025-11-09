import { Router } from "express";

import { urlRedirect, urlShort } from "../controllers/urlController";

const router = Router();

router.post("/", urlShort);
router.get("/:short", urlRedirect);

export default router;
