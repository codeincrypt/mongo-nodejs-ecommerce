const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const {userService} = require('../services/index');
const {errorCode, successCode, InvalidLogin, InvalidOtp} = require('../utils/message');
const { ACCESS_TOKEN_SECERT } = require("../utils/config");
const { UnauthorizedError, handleCustomError } = require("../utils/errors");

module.exports = {
    userSignup : async (req, res) => {
        const { name, email, phone, password } = req.body;
        try {
            let uuid = uuidv4();
            let otp = Math.floor(Math.random() * 900000) + 100000;
            // let hashedOTP = await bcrypt.hash(otp.toString(), 10)
            let current_timestamp = Math.floor(Date.now() / 1000)
            let hashedPassword = await bcrypt.hash(String(password), await bcrypt.genSalt(10));
            let signupSession = await bcrypt.hash(`${current_timestamp}-${email}`, await bcrypt.genSalt(10))
            let items = {uuid, name, email, phone, password:hashedPassword, signupSession, otp:otp, otptimestamp:current_timestamp}
            const users = await userService.createNewUser(items);
            if(users.status === 0){
                return res.json({statusCode:errorCode, message:users.data});
            }
            if (users.status === 1){
                return res.json({statusCode:successCode, sessionId:users.data.signupSession, message:'successful'});
            }
            throw new UnauthorizedError(InvalidOtp);
        } catch (error) {
            console.log("controller -- userSignup :: ", error);
            return handleCustomError(res, error)
        }
    },
    userSignupVerifyOTP : async (req, res) => {
        const { signupSession, otp } = req.body;
        try {
            let update = { accountStatus:1 }
            let filter = { signupSession }
            const users = await userService.getUsersByKey({signupSession})
            if (users) {
                const usersData = await userService.getUsersByEmail(users.email)
                let current_timestamp = Math.floor(Date.now() / 1000)
                if((Number(users.otptimestamp)+10020 > Number(current_timestamp) && (Number(users.otp) === Number(otp)))){
                    await userService.userUpdateDetails(filter, update);
                    const accessToken = jwt.sign(
                        {
                            user: {
                                name: users.name,
                                email: users.email,
                                id: users.id,
                            },
                        },
                        ACCESS_TOKEN_SECERT,
                        { expiresIn: "15m" });
                    return res.json({statusCode:successCode, token:accessToken, data:usersData, message:'successful'});
                }
                throw new UnauthorizedError(InvalidOtp);
            } else {
                throw new UnauthorizedError(InvalidLogin);
            }
        } catch (error) {
            console.log("controller -- userLoginVerifyOTP :: ", error);
            return handleCustomError(res, error)
        }
    },
    userLogin : async (req, res) => {
        const { email, password } = req.body;
        try {
            const users = await userService.loginUser(email);
            if (users && (await bcrypt.compare(password, users.password))) {
                let otp = Math.floor(Math.random() * 900000) + 100000;
                let current_timestamp = Math.floor(Date.now() / 1000)
                await userService.userUpdateDetails({ email }, { otp:otp, otptimestamp:current_timestamp });
                return res.json({statusCode:successCode, message:"Login Successfully"});
            } else {
                throw new UnauthorizedError(InvalidLogin);
            }
        } catch (error) {
            console.log("controller -- userLogin :: ", error);
            return handleCustomError(res, error)
        }
    },
    userLoginVerifyOTP : async (req, res) => {
        const { email, password, otp } = req.body;
        try {
            const users = await userService.loginUser(email);
            if (users && (await bcrypt.compare(password, users.password))) {
                let current_timestamp = Math.floor(Date.now() / 1000)
                if((Number(users.otptimestamp)+10020 > Number(current_timestamp) && (Number(users.otp) === Number(otp)))){
                    const usersData = await userService.getUsersByEmail(users.email)
                    const accessToken = jwt.sign(
                      {
                        user: {
                            name: users.name,
                            email: users.email,
                            id: users.id,
                        },
                      },
                      process.env.ACCESS_TOKEN_SECERT,
                      { expiresIn: "15m" }
                    );
                    return res.json({statusCode:successCode, token:accessToken, result:usersData, message:'successful'});
                }
                throw new UnauthorizedError(InvalidOtp);
              } else {
                throw new UnauthorizedError(InvalidLogin);
              }
        } catch (error) {
            console.log("controller -- userLoginVerifyOTP :: ", error);
            return handleCustomError(res, error)
        }
    }
}