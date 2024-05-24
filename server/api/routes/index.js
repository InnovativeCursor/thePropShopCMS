// routes/index.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const authenticateUser = require("../middleware/authenticateUser");

// User routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);
router.get("/users", authenticateUser, userController.allUsers);

//For Selectable Options
router.get("/locationOptions", productController.getLocationOptions);
router.get("/budgetOptions", productController.getBudgetOptions);
router.get("/boothsizeOptions", productController.getBoothSizeOptions);
router.get("/secondaryOptions", productController.getSecondaryOptions);
router.get("/functionalReq", productController.getfunctionalRequirements);
router.get(
  "/webInfo",
  authenticateUser,
  productController.getWebInfoRequirements
);
// Product routes
router.get("/products", authenticateUser, productController.getProducts);
router.post(
  "/createproduct",
  authenticateUser,
  productController.createProduct
);
router.put("/products/:id", authenticateUser, productController.updateProduct);
router.delete(
  "/products/:id",
  authenticateUser,
  productController.deleteProduct
);
module.exports = router;
