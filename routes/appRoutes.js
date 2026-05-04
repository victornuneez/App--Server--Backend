import { Router } from "express";
import { getLinkDetails, filterTags } from "../controller/appController.js";

const router = Router();

router.get('/links', filterTags);
router.get('/details/:id', getLinkDetails);

export default router;