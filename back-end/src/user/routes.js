const express = require("express");
const myRoutes = express.Router();
const userController = require("./controller");
//const { verifyToken } = require('../validations/tokenValidation');

myRoutes.use("/signUp", userController.signUp);
myRoutes.use("/login", userController.login);
myRoutes.use("/forgetpassword", userController.forgetpassword);
myRoutes.use("/resetpassword", userController.resetpassword);
myRoutes.use("/changepassword", userController.changePassword);
myRoutes.use("/getinfo", userController.getUserInfo); // todo

module.exports = myRoutes;
