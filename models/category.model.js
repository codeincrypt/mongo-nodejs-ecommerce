const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
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
