// const errorMessages = require("./error");
// import { Request, Response } from "express";
// const bcrypt = require("bcryptjs");
const movieModel = require("./model");
const jwt = require("jsonwebtoken");
const { findUserById } = require("../user/services");

const findMovieById = async (movieId) => {
  const aMovie = await movieModel.findOne({ movieId: movieId });
  return aMovie;
};

const deleteMovieById = async (movieId) => {
  const aMovie = await movieModel.deleteOne({ movieId: movieId });
  return aMovie;
};

const findUserFromToken = async (req) => {
  try {
    const token = req.body.token;
    console.log("my tokkkeeenn : " + token);
    // const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "a_secret_key");
    const userId = decoded._id;
    console.log("from movie services : " + userId);
    return await findUserById(userId);
  } catch (error) {
    res.status(400).json({ message: "user not found" });
  }
};

const saveMovie = async (userId, movie) => {
  console.log("my movie detaile before saving : ");
  const movieFinder = await findMovieById(movie.show.id);
  if (!movieFinder) {
    await new movieModel({
      userId: userId,
      movieId: movie.show.id,
      ended: movie.show.ended,
      image: movie.show.image.medium,
      language: movie.show.language,
      name: movie.show.name,
      rating: movie.score,
      runtime: movie.premiered,
      summary: movie.show.summary,
      genres: movie.show.genres,
    }).save();
  } else {
    console.log("movie already added");
  }
};

// const logInService = async (req) => {
//   const { email, password } = req.body;
//   let userFinder = await findUserByEmail(email);
//   console.log("user found : " + userFinder);
//   if (userFinder) {
//     let passChecker = await bcrypt.compare(password, userFinder.password);

//     if (email == userFinder.email && passChecker) {
//       const toSign = {
//         exp: Math.floor(Date.now() / 1000) + 60 * 20,
//         _id: userFinder._id,
//       };

//       const token = jwt.sign(JSON.stringify(toSign), "a_secret_key");

//       return { message: "User successfully signed in", userFinder, token };
//     } else {
//       const error = new Error(errorMessages.incorrectPass.message);
//       error.statusCode = errorMessages.incorrectPass.statusCode;
//       throw error;
//     }
//   } else {
//     const error = new Error(errorMessages.userNotFound.message);
//     error.statusCode = errorMessages.userNotFound.statusCode;
//     throw error;
//   }
// };

module.exports = {
  findMovieById,
  findUserFromToken,
  saveMovie,
  deleteMovieById,
};
