const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, ref:'User',
        required : true
    },
    fullName : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    address : {
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
    addressType : {
        type : String,
        required : true
    },
    date: { type: Date, default: Date.now },
}, {timestamps:true, timeseries:true})

const UserAddress = mongoose.model("userAddress", userAddressSchema)

module.exports = UserAddress