import express from 'express';
import auth from './userAuth.js'
import post from './post.js'

const router = express.Router();

router.use('/auth',auth);
router.use('/post',post);

export default router;