const Order = require("../models/order.model");

module.exports = {
  createNewOrder: async (item) => {
    try {
      let newEntry = new Order(item);
      const response = await newEntry.save();
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in ORDER SERVICE :: createNewOrder : ", error);
      throw error;
    }
  },
  getUserOrder: async (userId) => {
    try {
      const response = new Order.find({userId});
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in ORDER SERVICE :: getUserOrder : ", error);
      throw error;
    }
  },
  getUserOrderById: async (userId, orderId) => {
    try {
      const response = new Order.find({userId, orderId});
      return { status: 1, data: response };
    } catch (error) {
      console.error("Error in ORDER SERVICE :: getUserOrderById : ", error);
      throw error;
    }
  },
};
