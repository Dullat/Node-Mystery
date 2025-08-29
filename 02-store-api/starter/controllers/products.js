const { createCustomError } = require("../errors/customError")

const getAllProductsStatic = async (req, res, next) => {
    throw createCustomError("Dummy error", 505)
    res.status(200).json({msg: 'products testing routs'})
} 
const getAllProducts = async (req, res, next) => {
    res.status(200).json({msg: 'products route'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}