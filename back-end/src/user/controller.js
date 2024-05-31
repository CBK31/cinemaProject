const { Request, Response } = require("express");
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
const jwt = require("jsonwebtoken");
const userError = require("./error");

const signUp = async (req, res) => {
  try {
    // console.log("1!!!!!!!!!!!!!!!!!!");
    const { email, firstName, lastName, password, dob, phoneNumber } = req.body;
    // console.log(
    //   email +
    //     " ///" +
    //     firstName +
    //     " ///" +
    //     lastName +
    //     " ///" +
    //     password +
    //     " ///" +
    //     dob +
    //     " ///" +
    //     phoneNumber
    // );
    await createUser(email, firstName, lastName, password, dob, phoneNumber);

    res.status(200).json({ message: "user added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFinder = await logInService(email, password);

    if (userFinder) {
      req.session.isLoggedIn = true;
      req.session.userId = userFinder._id;

      const token = jwt.sign({ email: email }, "a_secret_key");
      res.status(200).json({ token: token });
    }
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const cc = await findUserByEmail(email);
    if (cc) {
      const myOTP = Math.floor(100000 + Math.random() * 900000).toString();

      await OTPsaver(myOTP, email);
      await sendOTP(email, myOTP);

      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res
        .status(userError.userNotFound.statusCode)
        .json({ message: userError.userNotFound.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const userFinder = await findUserByEmail(email);
    if (userFinder) {
      await updatePassword(userFinder._id, newPassword);
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
