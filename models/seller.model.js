const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    signupSession: {
      type: String,
    },
    accountStatus: {
      type: Number,
      default: 0,
    },
    otp: {
      type: String,
    },
    otptimestamp: {
      type: String,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, timeseries: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
