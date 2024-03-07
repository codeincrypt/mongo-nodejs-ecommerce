const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();

const authController = require('../controller/auth.controller');
const { validateLogin, validateSignup } = require('../middleware/validation/requestValidation');

userRouter.post('/signup', validateSignup, authController.userSignup);
userRouter.post('/login', validateLogin, authController.userLogin);
userRouter.post('/verifySignup', authController.userSignupVerifyOTP);

module.exports = {userRouter, adminRouter};
