import express from 'express';
import auth from '../../controllers/auth.js';

const router = express.Router();

router.get('/lol',auth.userRegister)

export default router;