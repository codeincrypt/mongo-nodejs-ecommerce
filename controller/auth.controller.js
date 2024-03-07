const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {userService} = require('../services/index');
const {errorCode, successCode, InvalidLogin, InvalidOtp} = require('../utils/message');
const { ACCESS_TOKEN_SECERT } = require("../utils/config");
const { UnauthorizedError, handleCustomError } = require("../utils/errors");

module.exports = {
    userSignup : async (req, res) => {
        const { name, email, phone, password } = req.body;
        try {
            let otp = Math.floor(Math.random() * 900000) + 100000;
            let hashedOTP = await bcrypt.hash(otp.toString(), 10)
            let current_timestamp = Math.floor(Date.now() / 1000)
            let signupSession = await bcrypt.hash(`${current_timestamp}-${email}`, await bcrypt.genSalt(10))
            let items = {name, email, phone, password, signupSession, otp:otp, otptimestamp:current_timestamp}
            const users = await userService.createNewUser(items);
            if(users.status === 0){
                return res.json({statusCode:errorCode, message:users.data});
            }
            if (users.status === 1){
                return res.json({statusCode:successCode, sessionId:users.data.signupSession, message:'successful'});
            } else {
                return res.json({statusCode:errorCode, message:'Fail to registered'});
            }
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
            const usersData = await userService.getUsersByEmail(users.email)
            
            if (users) {
                let current_timestamp = Math.floor(Date.now() / 1000)
                if((Number(users.otptimestamp)+10020 > Number(current_timestamp) && (Number(users.otp) === Number(otp)))){
                    // console.log("otp, users.otp", typeof otp, typeof users.otp, await bcrypt.compare(otp, users.otp));
                    const updateData = await userService.userAccountActivate(filter, update);
                    const accessToken = jwt.sign(
                        {
                            user: {
                                name: users.name,
                                email: users.email,
                                id: users.id,
                            },
                        },
                        ACCESS_TOKEN_SECERT,
                        { expiresIn: "15m" }
                    );
                    return res.json({statusCode:successCode, token:accessToken, data:usersData, message:'successful'});
                } else {
                    throw new UnauthorizedError(InvalidOtp);
                }
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
            let item = {email, password}
            const users = await userService.loginUser(item);
            if (users && (await bcrypt.compare(password, users.password))) {
                return res.json({statusCode:successCode, message:"Login Successfully"});
            }
            return res.json({statusCode:errorCode, message:InvalidLogin});
        } catch (error) {
            console.log("controller -- userLogin :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    },
    userLoginVerifyOTP : async (req, res) => {
        const { email, password, otp } = req.body;
        try {
            let items = {email, password, otp}
            const users = await userService.loginUserVerifyOTP(items);
            if (users && (await bcrypt.compare(password, users.password))) {
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
                return res.json({statusCode:successCode, token:accessToken, result:users, message:'successful'});
              } else {
                res.status(401);
                throw new Error("email or password is not valid");
              }
        } catch (error) {
            console.log("controller -- userLoginVerifyOTP :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
        }
    }
}