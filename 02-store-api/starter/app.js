require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require('./db/connect.js')

const productsRouter = require('./routes/products.js')

const notFoundMiddleware = require("./middleware/error-handler.js");
const errorMiddleware = require("./middleware/not-found.js");

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("store api");
});

app.use("/api/v1/products", productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT);
  } catch (err) {
    console.log("Error occured while starting server", err);
  }
};

start();
