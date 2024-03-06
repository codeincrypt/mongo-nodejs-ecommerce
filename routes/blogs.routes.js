const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();

const userController = require('../controller/user.controller');

userRouter.get('/getAllBlogs', userController.getAllUsers);
userRouter.get('/getBlogById/:id', userController.getUsersById);

module.exports = {userRouter,adminRouter};
