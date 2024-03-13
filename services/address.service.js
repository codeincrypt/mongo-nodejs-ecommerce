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
    },
    getUserAddress : async(userId) => {
        try {
            const response = UserAddress.find(
                {userId}, 
                {_id:1, addressline1:1, addressline1:1, city:1, landmark:1, pincode:1, district:1, state:1, country:1}
            )
            .sort({ _id:-1})
            return response
        } catch (error) {
            console.error('Error in addUserAddress : ', error);
            throw error;
        }
    }
}