const {userService, userAddressService} = require('../services/index');
const {errorCode, successCode} = require('../utils/message')

module.exports = {
    getUsersById : async (req, res) => {
        const {userId} = req.params.userid
        try {
            const users = await userService.getUsersById(userId || null);
            return res.json({statusCode:successCode, data:users, message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUsersById :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    getUserProfile : async (req, res) => {
        const userId = req.user.id
        try {
            const users = await userService.getUsersById(userId);
            return res.json({statusCode:successCode, data:users[0], message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUsersById :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    getAllUsers : async (req, res) => {
        try {
            const users = await userService.getUsers();
            return res.json({statusCode:successCode, data:users, message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getAllUsers :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    getUserAddress : async (req, res) => {
        try {
            const userId = req.user.id
            const users = await userAddressService.getUserAddress(userId);
            return res.json({statusCode:successCode, data:users, message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUserAddress :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    addUserAddress : async (req, res) => {
        const { addressline1, addressline2, city, landmark, pincode, district, state, country } = req.body;
        try {
            const userId = req.user.id
            let item = {userId, addressline1, addressline2, city, landmark, pincode, district, state, country}
            await userAddressService.addUserAddress(item);
            return res.json({statusCode:successCode, message:'Address added successfully'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUsersById :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    updateUserAddress : async (req, res) => {
        const { userid } = req.params.userid;
        try {
            await userService.getUsersById(userid || null);
            return res.json({statusCode:successCode, message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUsersById :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    }
}