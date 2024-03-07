const User = require("../models/user.model")

module.exports = {
    getUsersByKey : async(item) => {
        try {
            const response = User.findOne(item, {otp:0, otptimestamp:1}).select("otp otptimestamp email name signupSession")
            return response
        } catch (error) {
            console.error('Error in getUsersByKey : ', error);
            throw error;
        }
    },
    getUsersById : async(_id) => {
        try {
            const response = User.findOne({_id})
            return response
        } catch (error) {
            console.error('Error in getUsersByKey : ', error);
            throw error;
        }
    },
    getUsersByEmail : async(email) => {
        try {
            // const response = User.findOne({email}).select("name email phone -_id")
            const response = User.findOne({email}, {name:1, email:1, phone:1, _id:0})
            return response
        } catch (error) {
            console.error('Error in getUsersByKey : ', error);
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
    userAccountActivate : async(filter, update) => {
        try {
            const response = await User.findOneAndUpdate(filter, update)
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