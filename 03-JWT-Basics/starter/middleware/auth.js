require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnaunthenticatedError } = require("../errors/index.js");
const authorizarion = (req, res, next) => {
  // if (req.path !== "/dashboard") next();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnaunthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnaunthenticatedError("Not authorized to access this route");
  }
};

module.exports = authorizarion;
