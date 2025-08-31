require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error.js");

const authorizarion = (req, res, next) => {
  // if (req.path !== "/dashboard") next();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route");
  }
};

module.exports = authorizarion;
