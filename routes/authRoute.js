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

// protected routh auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true
  });
})

export default router;