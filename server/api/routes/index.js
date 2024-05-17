// routes/index.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const authenticateUser = require("../middleware/authenticateUser");

// User routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/users", authenticateUser, userController.allUsers);
router.get(
  "/locationOptions",
  authenticateUser,
  productController.getLocationOptions
);
router.get(
  "/budgetOptions",
  authenticateUser,
  productController.getBoothSizeOptions
);
router.get(
  "/boothsizeOptions",
  authenticateUser,
  productController.getBudgetOptions
);

// Product routes
router.get("/products", productController.getProducts);
router.post(
  "/createproduct",
  authenticateUser,
  productController.createProduct
);

module.exports = router;
