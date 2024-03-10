const {categoryService} = require('../services/index');
const {errorCode, successCode} = require('../utils/message');
const { UnauthorizedError, handleCustomError } = require("../utils/errors");
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify')

module.exports = {
    addNewCategory : async (req, res) => {
        const { title, parentId, image1 } = req.body;
        try {
            let categoryId = uuidv4();
            let categorySlug = await slugify(title, {replacement: '-', lower: true})
            let item = {title, parentId, slug:categorySlug, image1, categoryId}
            await categoryService.createNewCategory(item);
            return res.send({statusCode:successCode, message: `New category ${title} added successfully`});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
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
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return handleCustomError(res, error)
        }
    }
}