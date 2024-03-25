const {categoryService} = require('../services/index');
const {errorCode, successCode} = require('../utils/message');
const { UnauthorizedError, handleCustomError } = require("../utils/errors");
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify')

module.exports = {
    addNewCategory : async (req, res) => {
        const { title, parentId, image } = req.body;
        try {
            let categoryId = uuidv4();
            let categorySlug = await slugify(title, {replacement: '-', lower: true})
            let item = {title, parentId, slug:categorySlug, image, categoryId}
            await categoryService.createNewCategory(item);
            return res.send({statusCode:successCode, message: `New category ${title} added successfully`});
        } catch (error) {
            console.log("CATEGORY CONTROLLER -- addNewCategory :: ", error);
            return handleCustomError(res, error)
        }
    },
    getCategory : async (req, res) => {
        const {page, limit} = req.query
        try {
            let skip = (page-1)*limit
            const response = await categoryService.getCategory(skip, limit);
            return res.send({statusCode:successCode, data:response, message: 'All Category fetched successfully'});
        } catch (error) {
            console.log("CATEGORY CONTROLLER -- getCategory :: ", error);
            return handleCustomError(res, error)
        }
    },
    getSubCategory : async (req, res) => {
        const {category, page, limit} = req.query
        try {
            const response = await categoryService.getSubCategory(category, page, limit);
            return res.send({statusCode:successCode, data:response, message: 'All Category fetched successfully'});
        } catch (error) {
            console.log("CATEGORY CONTROLLER -- getCategory :: ", error);
            return handleCustomError(res, error)
        }
    },
    getCategoryHome : async (req, res) => {
        let slug = req.params.slug
        try {
            const response = await categoryService.getCategory(slug);
            return res.send({statusCode:successCode, data:response, message: 'All Category fetched successfully'});
        } catch (error) {
            console.log("CATEGORY CONTROLLER -- getCategoryHome :: ", error);
            return handleCustomError(res, error)
        }
    },
    getSubCategoryHome : async (req, res) => {
        let slug = req.params.slug
        try {
            const response = await categoryService.getCategory(slug);
            return res.send({statusCode:successCode, data:response, message: 'All Category fetched successfully'});
        } catch (error) {
            console.log("CATEGORY CONTROLLER -- getCategoryHome :: ", error);
            return handleCustomError(res, error)
        }
    }
}