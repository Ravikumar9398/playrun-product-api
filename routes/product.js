const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

module.exports = (upload) => {
  // Create a new product with an image upload
  router.post("/products", upload.single("image"), async (req, res) => {
    try {
      const { file, body } = req;
      const productData = {
        ...body,
        imageUrl: file ? `/uploads/${file.filename}` : body.imageUrl,
      };
      const product = new Product(productData);
      await product.save();
      res.status(201).send({
        success: true,
        message: "Product Successfully Added",
        product,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Get all products
  router.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).send({ success: true, products });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get a product by ID
  router.get("/products/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.status(200).send({ success: true, product });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Update a product by ID
  router.put("/products/:id", upload.single("image"), async (req, res) => {
    try {
      const { file, body } = req;
      const productData = {
        ...body,
        imageUrl: file ? `/uploads/${file.filename}` : body.imageUrl,
      };
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        productData,
        { new: true, runValidators: true }
      );
      if (!product) {
        return res.status(404).send();
      }
      res.status(200).send({
        success: true,
        message: "Product Successfully Updated",
        product,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Delete a product by ID
  router.delete("/products/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.status(200).send({
        success: true,
        message: "Product Successfully Deleted",
        product,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
