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
            // const response = await User.findById({_id}, {__v:0}).populate('categoryId')
            const response = User.findOne({_id})
            // const response = Product.aggregate([
            //     // Match product by ID
            //     { $match: { _id: new mongoose.Types.ObjectId(_id) } },
            //     // Join with category table
            //     {
            //       $lookup: {
            //         from: "userAddress",
            //         localField: "address",
            //         foreignField: "_id",
            //         as: "address",
            //       },
            //     },
            //     // Unwind category array (this unwind is used to convert single array to an object)
            //     { $unwind: "$address" },
            //     // project is used to filter the data which i want from all the table
            //     {
            //       $project: {
            //         _id: 1,
            //         userId: 1,
            //         image1: 1,
            //         address: {
            //           _id: 1,
            //           addressline1: 1,
            //           city: 1,
            //         },
            //       },
            //     },
            //   ]);
            return response
        } catch (error) {
            console.error('USER SERVICE :: Error in getUsersByKey : ', error);
            throw error;
        }
    },
    getUsersByEmail : async(email) => {
        try {
            const response = await User.findOne({email}, {name:1, email:1, phone:1, _id:0})
            return response
        } catch (error) {
            console.error('USER SERVICE :: Error in getUsersByKey : ', error);
            throw error;
        }
    },
    getUsers : async() => {
        try {
            const response = await User.find()
            return response
        } catch (error) {
            console.error('USER SERVICE :: Error in getUsers : ', error);
            throw error;
        }
    },
    createNewUser : async(item) => {
        try {
            let newEntry = new User(item)
            const response = await newEntry.save()
            return { status:1, data:response }
        } catch (error) {
            console.error('USER SERVICE :: Error in createNewUser : ', error);
            let typesdata = Object.keys(error.keyValue)
            if(error.code === 11000){
                return { status:0, data:`${typesdata[0]} already exists` }
            } else {
                throw error;
            }
        }
    },
    userUpdateDetails : async(filter, update) => {
        try {
            const response = await User.findOneAndUpdate(filter, update)
            return { status:1, data:response }
        } catch (error) {
            console.error('USER SERVICE :: Error in createNewUser : ', error);
            let typesdata = Object.keys(error.keyValue)
            if(error.code === 11000){
                return { status:0, data:`${typesdata[0]} already exists` }
            } else {
                throw error;
            }
        }
    },
    loginUser : async(email, password) => {
        try {
            const response = await User.findOne({email})
            return response
        } catch (error) {
            console.error('USER SERVICE :: Error in loginUser : ', error);
            throw error;
        }
    }
}