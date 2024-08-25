const express = require("express");
const myRoutes = express.Router();
const movieController = require("./controller");
//const { verifyToken } = require('../validations/tokenValidation');

myRoutes.use("/add", movieController.addMovie);
// myRoutes.use("/delete", movieController.login);
// myRoutes.use("/forgetpassword", userController.forgetpassword);
// myRoutes.use("/resetpassword", userController.resetpassword);
// myRoutes.use("/changepassword", userController.changePassword);
module.exports = myRoutes;
