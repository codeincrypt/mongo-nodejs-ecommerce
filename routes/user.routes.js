const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();
const {requireUserLogin} = require('../middleware/auth/requireUserLogin');

const userController = require('../controller/user.controller');

adminRouter.get('/getAllUsers', userController.getAllUsers);
adminRouter.get('/getUserById/:userid', userController.getUsersById);
userRouter.post('/addUserAddress', requireUserLogin, userController.addUserAddress);
userRouter.get('/profile', requireUserLogin, userController.getUserProfile);
userRouter.get('/getUserAddress', requireUserLogin, userController.getUserAddress);

module.exports = {userRouter,adminRouter};