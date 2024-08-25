const { Request, Response } = require("express");
const { inspect } = require("util");

const {
  findUserByEmail,
  createUser,
  logInService,
  updatePassword,
  findUserFromToken,
  findUserById,
} = require("./services");
// import "express-session";
// import { sendOTP, OTPsaver } from "../otp/otpServices";
const otpServices = require("../otp/otpServices");
const jwt = require("jsonwebtoken");
const userError = require("./error");

const signUp = async (req, res) => {
  try {
    const { email, firstName, lastName, password, dob, phoneNumber } = req.body;
    await createUser(email, firstName, lastName, password, dob, phoneNumber);
    res.status(200).json({ message: "user added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await logInService(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// message: error.message
const forgetpassword = async (req, res) => {
  try {
    // res.status(200).json({ message: "OTP sent successfully" });
    const { email } = req.body;
    const cc = await findUserByEmail(email);
    if (cc) {
      // const myOTP = Math.floor(100000 + Math.random() * 900000).toString();

      // await otpServices.OTPsaver(myOTP, email);
      // const aa = await otpServices.sendOTP(email, myOTP);
      // console.log("OTP sender : " + inspect(aa));

      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res
        .status(userError.userNotFound.statusCode)
        .json({ message: userError.userNotFound.message });
    }
  } catch (error) {
    res.status(400).json({ message: "error while sending OTP " });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, confirmPassword, newPassword } = req.body;

    if (oldPassword !== newPassword) {
      res.status(400).json({ message: "Confirm password do not match" });
    }

    const userFinder = await findUserByEmail(email);
    if (userFinder) {
      await updatePassword(userFinder._id, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res
        .status(userError.userNotFound.statusCode)
        .json({ message: userError.userNotFound.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userFinder = await findUserFromToken(req);
    const userF = await findUserById(userFinder._id);
    if (userF) {
      await updatePassword(userF._id, newPassword);
      res.status(200).json({ message: "password updated successfully" });
    } else {
      res
        .status(userError.userNotFound.statusCode)
        .json({ message: userError.userNotFound.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export { signUp, login, forgetpassword, resetpassword, changePassword };
module.exports = {
  signUp,
  login,
  forgetpassword,
  resetpassword,
  changePassword,
};
