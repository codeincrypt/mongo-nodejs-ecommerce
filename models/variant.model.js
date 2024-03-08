const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId, ref:'Product',
        required : true
    },
    variantId : {
        type : String,
        required : true
    },
    variantName : {
        type : String,
        required : true
    },
    price : {
        type : String
    },
    discount : {
        type : String
    },
    discountType : {
        type : String
    },
    date: { type: Date, default: Date.now },
})

const Variant = mongoose.model("variant", VariantSchema)

module.exports = Variant