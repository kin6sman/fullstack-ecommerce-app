import express from 'express';
import {registerController, loginController, testContoller} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routing

// REGISTER || METHOD POST
router.post('/register', registerController);


// LOGIN || POST
router.post('/login', loginController);

// test routes
router.get('/test', requireSignIn, isAdmin, testContoller)

export default router;