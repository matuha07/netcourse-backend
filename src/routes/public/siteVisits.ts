import { Router } from "express";
import {
  getSiteVisits,
  incrementSiteVisits,
} from "../../controllers/siteVisitController";

const router = Router();

router.get("/", getSiteVisits);
router.post("/increment", incrementSiteVisits);

export default router;
