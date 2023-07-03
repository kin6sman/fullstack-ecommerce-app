import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProduct,
  getSingleProduct,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formindable from "express-formidable";

const router = express.Router();

// routes

// create Route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formindable(),
  createProductController
);

// update product Route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formindable(),
  updateProductController
);

// get all Product route
router.get("/get-product", getProduct);

// get single Product route
router.get("/get-product/:slug", getSingleProduct);

// delete Product
router.delete("/delete-product/:pid", deleteProductController);

// get photos
router.get("/product-photo/:pid", productPhotoController);

export default router;

// 5:16
