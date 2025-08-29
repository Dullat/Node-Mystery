const Product = require('../models/product')
const { createCustomError } = require("../errors/customError")

const getAllProductsStatic = async (req, res, next) => {
    const search = req.query.name
    const products = await Product.find({})
        .sort('-name price')
    res.status(200).json(products)
}
const getAllProducts = async (req, res, next) => {
    const { featured, company, name } = req.query
    console.log(name)
    const queryObject = {
        ...(featured === 'true' || featured === 'false' ? { featured } : {}),
        ...(company && { company }),
        ...(name && { name: { $regex: name, $options: 'i' } })
    }

    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({ products, nbHits: products.length })
}



module.exports = {
    getAllProducts,
    getAllProductsStatic
}