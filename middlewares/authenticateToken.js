const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  jwt.verify(req.headers.token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.status(400).json({ message: "Unauthorized" });
    req.body.username = user.username;
    next();
  });
};

module.exports = authenticateToken;
