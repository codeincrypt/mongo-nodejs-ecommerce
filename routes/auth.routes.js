const express = require('express');
const userRouter = express.Router();
const adminRouter = express.Router();

const authController = require('../controller/auth.controller');
const { validateLoginOtp, validateLogin, validateSignup } = require('../middleware/validation/requestValidation');

userRouter.post('/signup', validateSignup, authController.userSignup);
userRouter.post('/verifySignup', authController.userSignupVerifyOTP);
userRouter.post('/login', validateLogin, authController.userLogin);
userRouter.post('/verifyOtp', validateLoginOtp, authController.userLoginVerifyOTP);

module.exports = {userRouter, adminRouter};
