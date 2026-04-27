import { Router } from "express";
import { createLinks, createTag } from "../controller/linksController.js";

const router = Router();

router.post('/', createLinks)
router.post('/tag', createTag)

export default router;