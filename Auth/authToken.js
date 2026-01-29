const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const verified = jwt.verify(token, "secret");
    console.log(verified);
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
