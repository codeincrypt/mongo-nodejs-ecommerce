const { orderService } = require("../services/index");
const { successCode } = require("../utils/message");
const { handleCustomError } = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getUserOrderList: async (req, res) => {
    const { userId } = req.user.id
    try {
      const response = await orderService.getUserOrder(userId);
      return res.send({
        statusCode: successCode,
        message: "Order fetched successfully",
        data : response
      });
    } catch (error) {
      console.log("ORDER CONTROLLER -- getUserOrderList :: ", error);
      return handleCustomError(res, error);
    }
  },
  createNewOrder: async (req, res) => {
    const { productId, variantId, userId, sellerId, orderId } = req.body;
    try {
      let orderId = uuidv4();
      let item = { productId, variantId, userId, sellerId, orderId };
      const response = await orderService.createNewOrder(item);
      return res.send({statusCode: successCode, message: "Order created successfully", orderId : response._id});
    } catch (error) {
      console.log("ORDER CONTROLLER -- createNewOrder :: ", error);
      return handleCustomError(res, error);
    }
  }
};
