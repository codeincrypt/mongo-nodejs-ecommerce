const User = require("../models/user.model")
const mongoose = require("mongoose");

module.exports = {
  getUsersByKey: async (item) => {
    try {
      const response = User.findOne(item, { otp: 0, otptimestamp: 1 }).select("otp otptimestamp email name signupSession")
      return response
    } catch (error) {
      console.error('Error in getUsersByKey : ', error);
      throw error;
    }
  },
  getUsersById: async (_id) => {
    try {
      const response = User.aggregate([
        // Match user by ID
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
        // Join with userAddress table
        {
          $lookup: {
            from: "useraddresses",
            localField: "address",
            foreignField: "_id",
            as: "addressDetail",
          },
        },
        // Unwind userAddress array (this unwind is used to convert single array to an object)
        { $unwind: "$addressDetail" },
        // project is used to filter the data which i want from all the table
        {
          $project: {
            _id: 1,
            uuid:1,
            name: 1,
            email: 1,
            phone: 1,
            accountStatus: 1,
            address: 1,
            date: 1,
            addressDetail: {
              _id: 1,
              fullName: 1,
              phoneNumber: 1,
              address: 1,
              city: 1,
              district: 1,
              pincode: 1,
              landmark: 1,
              state: 1,
              country: 1,
              addressType: 1,
            },
          },
        },
      ]);
      return response
    } catch (error) {
      console.error('USER SERVICE :: Error in getUsersByKey : ', error);
      throw error;
    }
  },
  getUsersByEmail: async (email) => {
    try {
      const response = await User.findOne({ email }, { name: 1, email: 1, phone: 1, _id: 0 })
      return response
    } catch (error) {
      console.error('USER SERVICE :: Error in getUsersByKey : ', error);
      throw error;
    }
  },
  getUsers: async () => {
    try {
      const response = await User.find()
      return response
    } catch (error) {
      console.error('USER SERVICE :: Error in getUsers : ', error);
      throw error;
    }
  },
  createNewUser: async (item) => {
    try {
      let newEntry = new User(item)
      const response = await newEntry.save()
      return { status: 1, data: response }
    } catch (error) {
      console.error('USER SERVICE :: Error in createNewUser : ', error);
      let typesdata = Object.keys(error.keyValue)
      if (error.code === 11000) {
        return { status: 0, data: `${typesdata[0]} already exists` }
      } else {
        throw error;
      }
    }
  },
  userUpdateDetails: async (filter, update) => {
    try {
      const response = await User.findOneAndUpdate(filter, update)
      return { status: 1, data: response }
    } catch (error) {
      console.error('USER SERVICE :: Error in userUpdateDetails : ', error);
      let typesdata = Object.keys(error.keyValue)
      if (error.code === 11000) {
        return { status: 0, data: `${typesdata[0]} already exists` }
      } else {
        throw error;
      }
    }
  },
  loginUser: async (email, password) => {
    try {
      const response = await User.findOne({ email })
      return response
    } catch (error) {
      console.error('USER SERVICE :: Error in loginUser : ', error);
      throw error;
    }
  }
}