const Product = require("../models/product");
const { createCustomError } = require("../errors/customError");

const getAllProductsStatic = async (req, res, next) => {
  const search = req.query.name;
  const products = await Product.find({ price: { $gt: 30, $lt: 60 } })
    .sort("price")
    .select("name price")
    .skip(2)
    .limit(10);
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {
    ...(featured === "true" || featured === "false" ? { featured } : {}),
    ...(company && { company }),
    ...(name && { name: { $regex: name, $options: "i" } }),
  };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
