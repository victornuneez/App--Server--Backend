import { Router } from "express";
import { getLinkDetails, filterTags, getTags } from "../controller/appController.js";
import { get } from "mongoose";

const router = Router();

router.get('/links', filterTags);
router.get('/details/:id', getLinkDetails);
router.get('/tags', getTags);

export default router;