const mongoose = require('mongoose');

const ProductStockSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId, ref:'Product',
        required : true
    },
    variantId : {
        type : mongoose.Schema.Types.ObjectId, ref:'Variant',
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
}, {timestamps:true, timeseries:true})

const ProductStock = mongoose.model("productstock", ProductStockSchema)

module.exports = ProductStock