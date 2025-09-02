require("dotenv").config();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.getName(),
    },
    token: user.createJWT(),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and passowed");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }

  const token = user.createJWT();
  res.send({ user: user, token: token });
};

module.exports = {
  register,
  login,
};
