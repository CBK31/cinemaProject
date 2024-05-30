const errorMessages = require("./userError");
import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const userModel = require("./userModel");
const jwt = require("jsonwebtoken");

const updatePassword = async (userid, newPassword) => {
  let hashedpass = await bcrypt.hash(newPassword, 12);

  await userModel.findOneAndUpdate(
    { _id: userid },
    { $set: { password: hashedpass } }
  );
};

const findUserByEmail = async (email: String) => {
  const aUser = await userModel.findOne({ email: email });
  return aUser;
};

const findUserById = async (userId: String) => {
  const aUser = await userModel.findOne({ _id: userId });
  return aUser;
};

const createUser = async (
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  isVIP: Boolean,
  isAdmin: Boolean
) => {
  let hashedpass = await bcrypt.hash(password, 12);

  let userF = await findUserByEmail(email);

  if (userF) {
    const error: any = new Error(errorMessages.userExist.message);
    error.statusCode = errorMessages.userExist.statusCode;
    throw error;
  } else {
    await new userModel({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedpass,
      isVIP: isVIP,
      isAdmin: isAdmin,
    }).save();
  }
};

const logInService = async (email: String, password: String) => {
  let userFinder = await findUserByEmail(email);

  if (userFinder) {
    let passChecker = await bcrypt.compare(password, userFinder.password);

    if (email == userFinder.email && passChecker) {
      return userFinder;
    } else {
      const error: any = new Error(errorMessages.incorrectPass.message);
      error.statusCode = errorMessages.incorrectPass.statusCode;
      throw error;
    }
  } else {
    const error: any = new Error(errorMessages.userNotFound.message);
    error.statusCode = errorMessages.userNotFound.statusCode;
    throw error;
  }
};

const findUserFromToken = async (req: Request) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, "a_secret_key");
  const userEmail = decoded.email;

  return await findUserByEmail(userEmail);
};

export {
  findUserById,
  createUser,
  logInService,
  findUserByEmail,
  updatePassword,
  findUserFromToken,
};
