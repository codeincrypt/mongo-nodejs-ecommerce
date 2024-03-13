const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uuid : {
        type : String,
        required : true
    }, 
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId, ref:'userAddress',
        default:null
    },
    signupSession : {
        type : String,
    },
    accountStatus : {
        type: Number,
        default:0
    },
    otp : {
        type: String,
    },
    otptimestamp : {
        type: String,
    },
    date: { type: Date, default: Date.now },
}, {timestamps:true, timeseries:true})

const User = mongoose.model("User", userSchema)

module.exports = User