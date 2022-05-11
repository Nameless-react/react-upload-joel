import { Router } from "express";
const router = Router();
import { getPosts, newPost, updatePost, deletePost, getPost } from "../controllers/post.controllers.js";


router.get("/", (req, res) => res.send("This is working"))

router.get("/posts", getPosts);

router.post("/posts", newPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPost);


export default router;