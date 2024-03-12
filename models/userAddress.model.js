const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, ref:'User',
        required : true
    },
    addressline1 : {
        type : String,
        required : true
    }, 
    addressline2 : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    landmark : {
        type : String
    },
    pincode : {
        type : Number,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    date: { type: Date, default: Date.now },
}, {timestamps:true, timeseries:true})

const UserAddress = mongoose.model("userAddress", userAddressSchema)

module.exports = UserAddress