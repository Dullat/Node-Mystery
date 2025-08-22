const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");

const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("/*splat", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
