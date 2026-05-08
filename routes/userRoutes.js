import { Router } from "express";
import { createLinks, createTag, updateLink, addComment, addVote, deleteLink } from "../controller/userController.js";

const router = Router();

router.post('/create', createLinks);
router.post('/tag', createTag);
router.put('/update/:id', updateLink);
router.patch('/comment/:id', addComment);
router.patch('/vote/:id', addVote);
router.delete('/delete/:id', deleteLink);

export default router;