const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();
const {requireUserLogin} = require('../middleware/auth/requireUserLogin');

const userController = require('../controller/user.controller');

adminRouter.get('/getAllUsers', userController.getAllUsers);
adminRouter.get('/getUserById/:userid', userController.getUsersById);
userRouter.get('/profile', requireUserLogin, userController.getUserProfile);
userRouter.get('/getUserAddress', requireUserLogin, userController.getUserAddress);
userRouter.post('/updateUserAddress', requireUserLogin, userController.updateUserAddress);
userRouter.post('/updateDefaultAddress', requireUserLogin, userController.updateDefaultAddress);
userRouter.post('/addUserAddress', requireUserLogin, userController.addUserAddress);

module.exports = {userRouter,adminRouter};