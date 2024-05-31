const errorMessages = require("./error");
// import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const userModel = require("./model");
const jwt = require("jsonwebtoken");

const updatePassword = async (userid, newPassword) => {
  let hashedpass = await bcrypt.hash(newPassword, 12);

  await userModel.findOneAndUpdate(
    { _id: userid },
    { $set: { password: hashedpass } }
  );
};

const findUserByEmail = async (email) => {
  const aUser = await userModel.findOne({ email: email });
  return aUser;
};

const findUserById = async (userId) => {
  const aUser = await userModel.findOne({ _id: userId });
  return aUser;
};

const createUser = async (
  email,
  firstName,
  lastName,
  password,
  dob,
  phoneNumber
) => {
  let userF = await findUserByEmail(email);
  let hashedpass = await bcrypt.hash(password, 12);

  if (userF) {
    const error = new Error(errorMessages.userExist.message);
    error.statusCode = errorMessages.userExist.statusCode;
    throw error;
  } else {
    await new userModel({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedpass,
      dob: dob,
      phoneNumber: phoneNumber,
    }).save();
  }
};

const logInService = async (req) => {
  const { email, password } = req.body;
  let userFinder = await findUserByEmail(email);

  if (userFinder) {
    let passChecker = await bcrypt.compare(password, userFinder.password);

    if (email == userFinder.email && passChecker) {
      return userFinder;
    } else {
      const error = new Error(errorMessages.incorrectPass.message);
      error.statusCode = errorMessages.incorrectPass.statusCode;
      throw error;
    }
  } else {
    const error = new Error(errorMessages.userNotFound.message);
    error.statusCode = errorMessages.userNotFound.statusCode;
    throw error;
  }
};

const findUserFromToken = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, "a_secret_key");
  const userEmail = decoded.email;

  return await findUserByEmail(userEmail);
};

module.exports = {
  findUserById,
  createUser,
  logInService,
  findUserByEmail,
  updatePassword,
  findUserFromToken,
};
