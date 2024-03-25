const Category = require("../models/category.model");
const mongoose = require("mongoose");

module.exports = {
  createNewCategory: async (item) => {
    try {
      let newEntry = new Category(item);
      const response = await newEntry.save();
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in CATEGORY SERVICE :: createNewCategory : ", error);
      throw error;
    }
  },
  getCategory: async (skip, limit) => {
    try {
      const response = Category.find({}, { title: 1, categoryId: 1, slug: 1, parentId: 1, image: 1 })
			.sort({ _id: -1 })
			.skip(skip)
			.limit(limit);
      return response;
    } catch (error) {
      console.error("Error in CATEGORY SERVICE :: getCategory : ", error);
      throw error;
    }
  },

  getSubCategory: async (category, skip, limit) => {
    try {
      const response = Category.aggregate([
				{ $match: { slug: category } }, // Match documents with the given slug
				{ $lookup: { // Perform a left outer join with the same collection to fetch documents with matching parentId
						from: "categories",
						localField: "_id",
						foreignField: "parentId",
						as: "children"
				}},
				{ $unwind: "$children" }, // Unwind the children array to get individual documents
				{ $project: { // Project the required fields
						_id: "$children._id",
						categoryId: "$children.categoryId",
						title: "$children.title",
						slug: "$children.slug",
						parentId: "$children.parentId"
				}}
      ]);
      return response;
    } catch (error) {
      console.error("Error in CATEGORY SERVICE :: getSubCategory : ", error);
      throw error;
    }
  },
  getCategoryHome: async () => {
    try {
      const response = Category.find({parentId:0}, {title:1, slug:1, image:1})
      return response;
    } catch (error) {
      console.error("Error in CATEGORY SERVICE :: getCategoryHome : ", error);
      throw error;
    }
  },
  getSubCategoryHome: async (slug) => {
    try {
      const response = Category.find(
        { slug: slug },
        { title: 1, slug: 1, image: 1 }
      );
      return response;
    } catch (error) {
      console.error(
        "Error in CATEGORY SERVICE :: getSubCategoryHome : ",
        error
      );
      throw error;
    }
  },
};