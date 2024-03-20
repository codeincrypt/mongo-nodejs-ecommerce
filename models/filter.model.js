const mongoose = require("mongoose");

const FilterSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  subCategoryId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attributes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});

const Filter = mongoose.model("Filter", FilterSchema);

module.exports = Filter;
