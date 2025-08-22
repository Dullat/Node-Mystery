const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const { products } = require("./data.js");

const app = express();

app.get("/", (req, res) => {
  res.json(products);
});

app.all("/*splat", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
