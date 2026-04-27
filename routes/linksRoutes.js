import { Router } from "express";
import { createLinks, createTag, addComment, addVote, linkDetail } from "../controller/linksController.js";

const router = Router();

router.post('/', createLinks);
router.post('/tag', createTag);
router.patch('/comment/:id', addComment);
router.patch('/vote/:id', addVote);
router.get('/details/:id', linkDetail);

export default router;