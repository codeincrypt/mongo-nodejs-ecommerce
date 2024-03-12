const {productService} = require('../services/index');
const {errorCode, successCode} = require('../utils/message');
const { UnauthorizedError, handleCustomError } = require("../utils/errors");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    addProduct : async (req, res) => {
        const { title, description, image1, variants, categoryId } = req.body;
        try {
            let productId = uuidv4();
            let item = {title, description, image1, productId, categoryId}
            const response1 = await productService.createNewProduct(item);
            variants.map((item) => {
                item.productId = response1.data._id;
                item.variantId = uuidv4();
            })
            const response2 = await productService.createNewVariants(variants);
            let countVariant = response2.data.length
            return res.send({statusCode:successCode, message: `New Product ${title} with ${countVariant} Variants added successfully`});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return handleCustomError(res, error)
        }
    },
    addVariants : async (req, res) => {
        const { productId, variants } = req.body;
        try {
            variants.map((item) => {
                item.productId = productId;
                item.variantId = uuidv4();
            })
            const response2 = await productService.createNewVariants(variants);
            let countVariant = response2.data.length
            return res.send({statusCode:successCode, message: `${countVariant} Variants added successfully`});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return handleCustomError(res, error)
        }
    },
    getProductById : async (req, res) => {
        const { id } = req.params;
        try {
            const response = await productService.getProductById(id);
            if(response){
                return res.send({statusCode:successCode, data : response[0], message: 'Product fetched successfully'});
            } else {
                return res.send({statusCode:successCode, data : {}, message: 'No Product found from this Product Id'});
            }
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProductById :: ", error);
            return handleCustomError(res, error)
        }
    },
    getProducts : async (req, res) => {
        const {page, limit} = req.query
        try {
            let skip = (page-1)*limit
            const response = await productService.getProducts(skip, limit);
            if(!response){
                return res.send({statusCode:successCode, data:[], message: 'All Product fetched successfully'});
            }
            return res.send({statusCode:successCode, data:response, message: 'All Product fetched successfully'});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProducts :: ", error);
            return handleCustomError(res, error)
        }
    }
}