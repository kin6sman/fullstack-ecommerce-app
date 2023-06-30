import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
import formindable from 'express-formidable'

const router = express.Router();

// routes

// create Route
router.post('/create-product', requireSignIn, isAdmin, formindable(), createProductController);

export default router;