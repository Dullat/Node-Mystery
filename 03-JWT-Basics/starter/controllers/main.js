require("dotenv").config();
const { BadRequestError } = require("../errors/index.js");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.headers);
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "hello John", token });
};

const dashboard = async (req, res, next) => {
  console.log(req.headers.authorization);
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({ msg: `Hello ${req.user.username}`, secret: luckyNumber });
};

module.exports = { login, dashboard };
