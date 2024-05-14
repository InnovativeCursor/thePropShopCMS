const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get token from request headers
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
