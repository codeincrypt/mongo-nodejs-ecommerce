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
        console.log('====================================');
        console.log("userId", req.user);
        console.log('====================================');
        try {
            const users = await userService.getUsersById(userId);
            return res.json({statusCode:successCode, data:users[0], message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- getUserProfile :: ", error);
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
        const { fullName, phoneNumber, address, city, landmark, pincode, district, state, country, addressType } = req.body;
        try {
            const userId = req.user.id
            let item = {userId, fullName, phoneNumber, address, city, landmark, pincode, district, state, country, addressType}
            let insertData = await userAddressService.addUserAddress(item);
            return res.json({statusCode:successCode, data:{addressId:insertData._id}, message:'Address added successfully'});
        } catch (error) {
            console.log("USER CONTROLLER -- addUserAddress :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    updateUserAddress : async (req, res) => {
        const { addressId, fullName, phoneNumber, address, city, landmark, pincode, district, state, country, addressType } = req.body;
        try {
            const userId = req.user.id
            let update = {fullName, phoneNumber, address, city, landmark, pincode, district, state, country, addressType}
            let filter = {_id:addressId, userId:userId}
            await userAddressService.updateUserAddress(filter, update);
            return res.json({statusCode:successCode, message:'successful'});
        } catch (error) {
            console.log("USER CONTROLLER -- updateUserAddress :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    updateDefaultAddress : async (req, res) => {
        const {addressId} = req.body
        const userId = req.user.id
        try {
            let update = { address: addressId}
            let filter = { _id:userId }
            const result = await userService.userUpdateDetails(filter, update);
            if(result.status === 1){
                return res.json({statusCode:successCode, message:'Default address has been updated successfully'});
            }
            res.json({statusCode:errorCode, message:'Default address updating failed'});
        } catch (error) {
            console.log("USER CONTROLLER -- updateDefaultAddress :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    }
}