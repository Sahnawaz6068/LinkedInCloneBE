import express from 'express';
import auth from './userAuth.js'

const router = express.Router();

router.use('/auth',auth)

export default router