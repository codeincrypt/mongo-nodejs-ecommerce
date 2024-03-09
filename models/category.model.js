const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
