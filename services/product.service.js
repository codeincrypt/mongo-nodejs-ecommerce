const Product = require("../models/product.model");
const Variant = require("../models/variant.model");
const mongoose = require("mongoose");

module.exports = {
  createNewProduct: async (item) => {
    try {
      let newEntry = new Product(item);
      const response = await newEntry.save();
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in PRODUCT SERVICE :: createNewProduct : ", error);
      throw error;
    }
  },
  createNewVariants: async (item) => {
    try {
      const response = await Variant.insertMany(item);
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in PRODUCT SERVICE :: createNewVariants : ", error);
      throw error;
    }
  },
  getProductById: async (_id) => {
    try {
      // const response = Product.findById({_id}, {__v:0}).populate('categoryId')
      const response = Product.aggregate([
        // Match product by ID
        // IF IT WORKS DO NOT TOUCH
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
        // Join with category table
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        // Unwind category array (this unwind is used to convert single array to an object)
        { $unwind: "$category" },
        // Lookup variants for the product (added variant table with parent table product)
        {
          $lookup: {
            from: "variants",
            localField: "_id",
            foreignField: "productId",
            as: "variant",
          },
        },
        // project is used to filter the data which i want from all the table
        {
          $project: {
            _id: 1,
            productId: 1,
            title: 1,
            description: 1,
            categoryId: 1,
            image1: 1,
            category: {
              _id: 1,
              title: 1,
              image1: 1,
            },
            variant: {
              variantId: 1,
              variantName: 1,
              price: 1,
              discount: 1,
              discountType: 1,
            },
          },
        },
      ]);
      return response;
    } catch (error) {
      console.error("Error in PRODUCT SERVICE :: getProductById : ", error);
      throw error;
    }
  },
  getProducts: async (skip, limit) => {
    try {
      const response = Product.find(
        {},
        { productId: 1, title: 1, categoryId: 1, image1: 1 }
      )
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
      return response;
    } catch (error) {
      console.error("Error in PRODUCT SERVICE :: getProducts : ", error);
      throw error;
    }
  },
};
