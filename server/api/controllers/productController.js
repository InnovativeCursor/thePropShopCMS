// controllers/productController.js
const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }
    const product = await Product.create({ name, description });
    res.status(201).json({ message: "Product Created Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};
