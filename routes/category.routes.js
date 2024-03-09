const express = require('express');
const adminRouter = express.Router();
const homeRouter = express.Router();

const categoryController = require('../controller/category.controller');
// const { validateProduct } = require('../middleware/validation/productValidation');

adminRouter.post('/addCategory', categoryController.addNewCategory);
adminRouter.get('/getProducts', categoryController.getCategory);
homeRouter.get('/getProducts', categoryController.getCategory);

module.exports = {adminRouter, homeRouter};