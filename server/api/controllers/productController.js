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
exports.getLocationOptions = async (req, res) => {
  try {
    // Fetch all unique locations from the Products table
    const locations = await Product.findAll({
      attributes: [
        [
          Product.sequelize.fn("DISTINCT", Product.sequelize.col("location")),
          "location",
        ],
      ],
      order: [["location", "ASC"]],
    });

    // Extract the locations from the result
    const locationList = locations.map((loc) => loc.location);

    res.status(200).json(locationList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch locations", error: error.message });
  }
};
exports.getBoothSizeOptions = async (req, res) => {
  try {
    const boothSizes = await Product.findAll({
      attributes: [
        [
          Product.sequelize.fn("DISTINCT", Product.sequelize.col("booth_size")),
          "booth_size",
        ],
      ],
      order: [["booth_size", "ASC"]],
    });

    const boothSizeList = boothSizes.map((size) => size.booth_size);

    res.status(200).json(boothSizeList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch booth sizes", error: error.message });
  }
};

exports.getBudgetOptions = async (req, res) => {
  try {
    const budgets = await Product.findAll({
      attributes: [
        [
          Product.sequelize.fn("DISTINCT", Product.sequelize.col("budget")),
          "budget",
        ],
      ],
      order: [["budget", "ASC"]],
    });

    const budgetList = budgets.map((budget) => budget.budget);

    res.status(200).json(budgetList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch budgets", error: error.message });
  }
};
exports.createProduct = async (req, res) => {
  const {
    product_name,
    location,
    booth_size,
    budget,
    closed_meeting_room,
    demo_stations,
    open_discussion_area,
    bar_area,
    hanging_sign,
    led_video_wall,
    longue_area,
    product_display,
    reception_counter,
    semi_closed_meeting_area,
    storage_room,
    theatre_style_demo,
    touch_screen_kiosk,
    description,
    pictures, // pictures should be an array of base64 strings
  } = req.body;
  try {
    await Product.create({
      product_name,
      location,
      booth_size,
      budget,
      closed_meeting_room,
      demo_stations,
      open_discussion_area,
      bar_area,
      hanging_sign,
      led_video_wall,
      longue_area,
      product_display,
      reception_counter,
      semi_closed_meeting_area,
      storage_room,
      theatre_style_demo,
      touch_screen_kiosk,
      description,
      pictures,
    });
    res.status(201).json({ message: "Product Created Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};
