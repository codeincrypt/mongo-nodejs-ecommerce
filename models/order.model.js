const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Product",
    required: true,
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Variant",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
  },
  totalDiscount: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;