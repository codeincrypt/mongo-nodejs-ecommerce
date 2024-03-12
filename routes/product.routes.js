const express = require('express');
const adminRouter = express.Router();

const productController = require('../controller/product.controller');
const { validateProduct } = require('../middleware/validation/productValidation');

adminRouter.post('/addProduct', validateProduct, productController.addProduct);
adminRouter.post('/addVariants', productController.addVariants);
adminRouter.get('/getProducts/:id', productController.getProductById);
adminRouter.get('/getProducts', productController.getProducts);

module.exports = {adminRouter};