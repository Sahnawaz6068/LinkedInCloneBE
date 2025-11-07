import express from 'express';
import auth from '../../controllers/auth.js';
import {authorize, userDataValidation}  from '../../middlewares/index.js'




const router = express.Router();

router.post('/register', userDataValidation.userDataValidation,auth.register);

router.post('/login', userDataValidation.logInDataValidation, auth.login);

router.get('/me',authorize.authorize ,auth.getUserProfile);

export default router;