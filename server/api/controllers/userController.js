// controllers/userController.js

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({ email, password: hashedPassword });
    res.status(200).json({ message: "User Successfully registered!" });
  } catch (error) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { encryptedEmail, encryptedPassword } = req.body;

    "encryptedEmail", encryptedEmail;
    "encryptedPassword", encryptedPassword;
    const email = CryptoJS.AES.decrypt(
      encryptedEmail,
      process.env.ENCRYPTION
    ).toString(CryptoJS.enc.Utf8);
    const password = CryptoJS.AES.decrypt(
      encryptedPassword,
      process.env.ENCRYPTION
    ).toString(CryptoJS.enc.Utf8);

    "email", email;
    if (!(email || password)) {
      return res
        .status(400)
        .json({ message: "Need to fill in both, email and password" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not Registered" });
    }
    // Compare hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    // Generate JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ encode: user.id, exp }, process.env.SECRET);

    // const token = jwt.sign(
    //   { id: user.id, email: user.email },
    //   process.env.SECRET
    // );
    const sendUserInfo = await User.findOne({
      where: { email },
      attributes: ["id", "email"],
    });
    res.status(200).json({ sendUserInfo, token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error.message });
  }
};
exports.allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"],
    });
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
