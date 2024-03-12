const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId, ref:'Category',
        required : true
    },
    image1 : {
        type : String,
        required : true
    },
    image2 : {
        type : String
    },
    image3 : {
        type : String
    },
    date: { type: Date, default: Date.now }
}, {timestamps:true, timeseries:true})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product