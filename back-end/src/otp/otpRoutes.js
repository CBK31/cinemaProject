const express = require('express');
const myRoutes = express.Router();
const otpController = require('./otpController');


myRoutes.use('/verifyOTP', otpController.verifyOTP);
myRoutes.use('/resendOTP', otpController.resendOTP);

module.exports = myRoutes;