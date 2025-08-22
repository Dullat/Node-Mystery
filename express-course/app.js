const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const { products } = require("./data.js");
const logger = require("./logger.js");
const authorize = require("./authorized.js");
const app = express();

// req => middleware => res

app.use([logger, authorize]);

app.get("/", (req, res) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();

  console.log(method, url, time);

  res.send("home");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/api", (req, res) => {
  res.send("apiiii...........");
});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
