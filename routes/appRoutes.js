import { Router } from "express";
import { getLinkDetailsById, filterLinksByTag, getAllTags } from "../controller/appController.js";


const router = Router();

router.get('/links/', filterLinksByTag);
router.get('/details/:id', getLinkDetailsById);
router.get('/tags', getAllTags);

export default router;