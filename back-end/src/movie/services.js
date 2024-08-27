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
const findMovieByIdAndUserId = async (movieId, userId) => {
  const aMovie = await movieModel.findOne({ userId: userId, movieId: movieId });
  return aMovie;
};
const delMovieById = async (movieId) => {
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
  const movieFinder = await findMovieByIdAndUserId(movie.show.id, userId);
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

const getAllMovieByUserId = async (userId) => {
  try {
    return await movieModel.find({ userId: userId });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while getting the movies : " + error });
  }
};

const delMovieByIdAndUserId = async (userId, movieId) => {
  const userFinder = await findUserById(userId);
  if (userFinder) {
    return await movieModel.deleteOne({ userId: userId, movieId: movieId });
  } else {
    const error = new Error("user not found");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  findMovieById,
  findUserFromToken,
  saveMovie,
  delMovieById,
  getAllMovieByUserId,
  delMovieByIdAndUserId,
};
