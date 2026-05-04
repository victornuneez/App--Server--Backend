import { Router } from "express";
import { createLinks, createTag, addComment, addVote } from "../controller/userController.js";

const router = Router();

router.post('/create', createLinks);
router.post('/tag', createTag);
router.patch('/comment/:id', addComment);
router.patch('/vote/:id', addVote);

export default router;