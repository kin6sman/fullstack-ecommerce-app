import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from 'fs'


export const createProductController = async (req, res) => {
  try {
    const {name, description, slug, price, category, quantity, shipping} = req.fields
    const {photo} = req.files;

    // validation
    switch(true){
      case !name: return res.status(500).send({ error: "name is required" });

      case !price: return res.status(500).send({ error: "price is required" });

      case !category: return res.status(500).send({ error: "category is required" });

      case !quantity: return res.status(500).send({ error: "quantity is required" });

      case !shipping: return res.status(500).send({ error: "shipping is required" });

      case !description: return res.status(500).send({ error: "description is required" });

      case photo && photo.size > 10000 :  
      return res.status(500).send({ error: "photo is required less than 1 mb" });

    }

    const product = await productModel({...req.fields, slug:slugify(name)});
    if(photo){
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: 'Product Created Successfully',
      product
    })

  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Creating Product'
    })
  }
}



// note: install express-formidable as a middleware to upload images to mongo