const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const { products } = require("./data.js");

const app = express();

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get(`/api/products/:productID`, (req, res) => {
  const { productID } = req.params;
  const id = Number(productID);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const singleProduct = products.find(
    (product) => product.id === Number(productID),
  );

  if (!singleProduct) {
    return res.status(404).json({ error: "Product does not exist" });
  }

  res.json(singleProduct);
});

//  working with query
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    // res.status(200).send("No products matched your search query");
    return res.status(200).json({ sucess: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

app.all("/*splat", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
