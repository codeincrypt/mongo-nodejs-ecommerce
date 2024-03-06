const User = require("../models/user.model")

module.exports = {
    getUsersById : async(id) => {
        try {
            const response = User.findOne({id})
            return response
        } catch (error) {
            console.error('Error in getUsersById : ', error);
            throw error;
        }
    },
    getUsers : async() => {
        try {
            const response = User.find()
            return response
        } catch (error) {
            console.error('Error in getUsers : ', error);
            throw error;
        }
    },
    createNewUser : async(item) => {
        try {
            let newEntry = new User(item)
            const response = await newEntry.save()
            return { status:1, data:response }
        } catch (error) {
            console.error('Error in createNewUser : ', error);
            let typesdata = Object.keys(error.keyValue)
            if(error.code === 11000){
                return { status:0, data:`${typesdata[0]} already exists` }
            } else {
                throw error;
            }
        }
    },
    loginUser : async(item) => {
        try {
            const response = User.findOne(item)
            return response
        } catch (error) {
            console.error('Error in loginUser : ', error);
            throw error;
        }
    },
    loginUserVerifyOTP : async(item) => {
        try {
            const response = User.findOne(item)
            return response
        } catch (error) {
            console.error('Error in loginUserVerifyOTP : ', error);
            throw error;
        }
    }
}