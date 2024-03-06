const {userService} = require('../services/index');

const {errorCode, successCode} = require('../utils/message')

module.exports = {
    getUsersById : async (req, res) => {
        const { userid } = req.params.userid;
        try {
            const users = await userService.getUsersById(userid || null);
            return res.json({statusCode:successCode, result:users, message:'successful'});
        } catch (error) {
            console.log("controller -- getUsersById :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    getAllUsers : async (req, res) => {
        try {
            const users = await userService.getUsers();
            return res.json({statusCode:successCode, result:users, message:'successful'});
        } catch (error) {
            console.log("controller -- getAllUsers :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    }
}