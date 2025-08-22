const express = require("express");
const app = express();
let { people } = require("./data.js");

app.use(express.static("./methods-public"));

app.get("/api/people", (req, res) => {
  res.status(200).json({ sucess: true, data: people });
});

app.post("/login", (req, res) => {});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
