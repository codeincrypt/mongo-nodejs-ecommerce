const express = require('express');
const adminRouter = express.Router();
const homeRouter = express.Router();

const categoryController = require('../controller/category.controller');
const { validateCategory } = require('../middleware/validation/productValidation');

adminRouter.post('/addCategory', validateCategory, categoryController.addNewCategory);
adminRouter.get('/getCategory/:id', categoryController.getCategory);
adminRouter.get('/getCategory', categoryController.getCategory);
homeRouter.get('/getCategory', categoryController.getCategoryHome);
homeRouter.get('/getSubCategory', categoryController.getSubCategoryHome);

module.exports = {adminRouter, homeRouter};