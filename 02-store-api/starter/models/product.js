const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product must have a name"]
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: "value not supported"
        }
    }
})

module.exports = mongoose.model('product', productsSchema)