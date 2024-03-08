const mongoose = require('mongoose');

const ProductStockSchema = new mongoose.Schema({
    productid : {
        type : String,
        required : true
    },
    variantid : {
        type : String,
        required : true
    },
    quatity : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    stocks : {
        type : String,
        required : true
    },
    date: { type: Date, default: Date.now },
})

const ProductStock = mongoose.model("productstock", ProductStockSchema)

module.exports = ProductStock