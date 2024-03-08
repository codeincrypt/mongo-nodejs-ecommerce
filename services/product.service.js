const Product = require("../models/product.model")
const Variant = require("../models/variant.model")

module.exports = {
    createNewProduct : async(item) => {
        console.log("item", item);
        try {
            let newEntry = new Product(item)
            const response = await newEntry.save()
            return { status:1, data:response }
        } catch (error) {
            console.error('Error in SERVICE :: createNewProduct : ', error);
            throw error;
        }
    },
    createNewVariants : async(item) => {
        try {
            const response = Variant.insertMany(item)
            return { status:1, data:response }
        } catch (error) {
            console.error('Error in createNewVariants : ', error);
            throw error;
        }
    },
    getProductById : async(_id) => {
        try {
            const response = Product.findById({_id}, {__v:0})
            return response
        } catch (error) {
            console.error('Error in createNewVariants : ', error);
            throw error;
        }
    },
    getProducts : async(skip, limit) => {
        try {
            const response = Product.find({}, {productId:1, title:1, categoryId:1, image1:1}, { skip: skip, limit: limit })
            .sort({ _id:-1})
            return response
        } catch (error) {
            console.error('Error in createNewVariants : ', error);
            throw error;
        }
    }
}