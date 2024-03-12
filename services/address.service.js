const UserAddress = require("../models/userAddress.model")

module.exports = {
    addUserAddress : async(item) => {
        try {
            let newEntry = new UserAddress(item)
            const response = await newEntry.save()
            return response
        } catch (error) {
            console.error('Error in addUserAddress : ', error);
            throw error;
        }
    }
}