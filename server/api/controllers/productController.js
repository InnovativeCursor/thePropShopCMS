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
  const {
    prd_id,
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
      prd_id,
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
