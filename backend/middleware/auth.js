const jwt = require("jsonwebtoken");
require("dotenv").config();


//authentication with JWT for the middleware so it is secure
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. Not authorized...");
  try {
    const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid auth token...");
  }
}

module.exports = auth;
