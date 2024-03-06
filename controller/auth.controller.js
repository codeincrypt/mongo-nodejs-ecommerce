const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {userService} = require('../services/index');
const {errorCode, successCode, InvalidLogin} = require('../utils/message')

module.exports = {
    userSignup : async (req, res) => {
        const { name, email, phone, password } = req.body;
        try {
            let items = {name, email, phone, password}
            const users = await userService.createNewUser(items);
            if(users.status === 0){
                return res.json({statusCode:errorCode, message:users.data});
            }
            if (users.status === 1){
                return res.json({statusCode:successCode, result:users.data, message:'successful'});
            } else {
                return res.json({statusCode:errorCode, message:'Fail to registered'});
            }
        } catch (error) {
            console.log("controller -- userSignup :: ", error);
            return res.status(500).json({ message: error.message,statusCode:errorCode });
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