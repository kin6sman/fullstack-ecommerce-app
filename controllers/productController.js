// note: install express-formidable as a middleware to upload images to mongo

import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// create product
export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      // case !shipping: return res.status(500).send({ error: "shipping is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required less than 1 mb" });
    }

    const product = await productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,

      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Product",
    });
  }
};

// get all product

export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: product.length,
      message: "Successfully getting all products",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Product",
    });
  }
};

// single Product get
export const getSingleProduct = async (req, res) => {
  try {
    const slug = req.params;
    const product = await productModel
      .findOne(slug)
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Successfully getting sigle products",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Product",
    });
  }
};

// get photos
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product Photo",
    });
  }
};

// deleting product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Successfully deleted product",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting product",
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });

      case !category:
        return res.status(500).send({ error: "category is required" });

      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      // case !shipping: return res.status(500).send({ error: "shipping is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required less than 1 mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,

      message: "Product update Successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in update Product",
    });
  }
};

// filter Product
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    // args{
    //   category: category name,
    //   price: greter then [0] to less than[1]
    // }

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while filtering",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while Searching Product",
      error,
    });
  }
};
