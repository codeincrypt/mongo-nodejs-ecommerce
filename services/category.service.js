const Category = require("../models/category.model")

module.exports = {
    createNewCategory : async(item) => {
        try {
            let newEntry = new Category(item)
            const response = await newEntry.save()
            return { status:1, data:response }
        } catch (error) {
            console.error('Error in CATEGORY SERVICE :: createNewCategory : ', error);
            throw error;
        }
    },
    getCategory : async(skip, limit) => {
        try {
            const response = Category.find({}, {title:1, categoryId:1, slug:1, parentId:1, image1:1}, { skip: skip, limit: limit })
            .sort({ _id:-1})
            return response
        } catch (error) {
            console.error('Error in CATEGORY SERVICE :: getCategory : ', error);
            throw error;
        }
    },
    getCategoryHome : async(skip, limit) => {
        try {
            const response = Category.find({parentId:0}, {title:1, slug:1, image1:1}, { skip: skip, limit: limit })
            .sort({ _id:-1})
            return response
        } catch (error) {
            console.error('Error in CATEGORY SERVICE :: getCategory : ', error);
            throw error;
        }
    }
}