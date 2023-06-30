import express, { Router } from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { allCategoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

// routes

// create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// update cateegory
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


// get all category
router.get('/get-category', allCategoryController)

// get single category
router.get('/single-category/:slug', singleCategoryController)

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router;