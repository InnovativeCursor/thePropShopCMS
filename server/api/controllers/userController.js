// controllers/userController.js

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(200).json({ message: "User Successfully registered!" });
  } catch (error) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Compare hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error.message });
  }
};
exports.allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
