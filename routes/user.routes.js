const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();

const userController = require('../controller/user.controller');

userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/getUserById/:userid', userController.getUsersById);

module.exports = {userRouter,adminRouter};
