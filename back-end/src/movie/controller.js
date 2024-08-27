const { Request, Response } = require("express");
const { inspect } = require("util");

const {
  // findUserByEmail,
  // createUser,
  // logInService,
  // updatePassword,
  findUserFromToken,
  findMovieById,
  saveMovie,
  delMovieById,
  delMovieByIdAndUserId,
} = require("./services");
// import "express-session";
// import { sendOTP, OTPsaver } from "../otp/otpServices";
// const otpServices = require("../otp/otpServices");
// const jwt = require("jsonwebtoken");
// const userError = require("./error");

// const signUp = async (req, res) => {
//   try {
//     const { email, firstName, lastName, password, dob, phoneNumber } = req.body;
//     await createUser(email, firstName, lastName, password, dob, phoneNumber);
//     res.status(200).json({ message: "user added successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const result = await logInService(req);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const addMovie = async (req, res) => {
  try {
    const user = await findUserFromToken(req);
    const { movie } = req.body;

    if (user) {
      await saveMovie(user._id, movie);
      res.status(200).json({ message: "movie saved successfully" });
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while saving the movie : " + error });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.body;
    const movieFinder = findMovieById(movieId);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while getting the movie : " + error });
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const user = await findUserFromToken(req);
    const { movieId } = req.body;

    if (user) {
    const  s =   await delMovieByIdAndUserId(user._id, movieId);
    console.log(s);
    console.log(s.length);
      res.status(200).json({ message: "movie deleted successfully" });
    } else {
      res.status(401).json({ message: "user not found" });
    }
    // return await delMovieById(movieId);
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while getting the movie : " + error });
  }
};
module.exports = {
  addMovie,
  getMovieById,
  deleteMovieById,
};
