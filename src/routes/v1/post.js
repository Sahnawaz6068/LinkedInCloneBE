import express from 'express';
import {authorize} from "../../middlewares/index.js"
import Post from '../../controllers/index.js'

const router = express.Router();

router.post("/createPost",authorize.authorize,Post.postController.createPost);
router.get("/feed",authorize.authorize,Post.postController.getPostsFeed);

export default router;