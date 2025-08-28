const connectDb = require("./db/connect.js")
const express = require("express");
const app = express();
const tasks = require("./routes/tasks.js");
const notFound = require("./middleware/notfound.js");
require('dotenv').config()
const errorHandler = require('./middleware/errorHandler.js')

// middleware
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.json("im runing");
});

app.use(notFound)
app.use(errorHandler)

const port = 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () => console.log("server is listening on 3000"));
  } catch (error) {
    console.log(error)
  }
}


start()