// const errorMessages = require("./error");
// import { Request, Response } from "express";
// const bcrypt = require("bcryptjs");
const movieModel = require("./model");
const jwt = require("jsonwebtoken");
const { findUserById } = require("../user/services");
const Movie = require("./model");

const findMovieById = async (movieId) => {
  const aMovie = await movieModel.findOne({ movieId: movieId });
  return aMovie;
};
const findMovieByIdAndUserId = async (movieId, userId) => {
  console.log("show id oo : A" + movieId + "A");
  console.log("user id kk : A" + userId + "A");

  let myUserId = String(userId);
  let myMovieId = String(movieId);

  const aaMovie = await movieModel.find({
    userId: myUserId,
    movieId: myMovieId,
  });
  console.log("my aa movie variable witout aggregation : " + aaMovie);
  // const aMovie = await Movie.aggregate([
  //   {
  //     $match: {
  //       userId: String(userId),
  //       movieId: String(movieId),
  //     },
  //   },
  // ]);
  return aaMovie;
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

  console.log(
    "from services movieFinder 4 : " + Object.keys(movieFinder).length
  );

  console.log("from services movieFinder 1 : " + movieFinder.userId);
  console.log("from services movieFinder 2 : " + movieFinder["userId"]);

  if (Object.keys(movieFinder).length === 0) {
    console.log("movie not founnddd ");
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
//todo charbel
const delMovieByIdAndUserId = async (userId, movieId) => {
  console.log("my useerrr id : " + userId);
  console.log("my movviiiieee id : " + movieId);
  const result = await movieModel.aggregate([
    {
      $match: {
        userId: userId,
        movieId: movieId,
      },
    },
    {
      $limit: 1, // Limit to one document if there could be multiple matches
    },
    {
      $project: {
        _id: 1, // Only project the _id field, needed to delete the document
      },
    },
  ]);
  console.log("my resulttt :::" + result);
  return await movieModel.findOneAndDelete({
    userId: userId,
    movieId: movieId,
  });
};
module.exports = {
  findMovieById,
  findUserFromToken,
  saveMovie,
  delMovieById,
  getAllMovieByUserId,
  delMovieByIdAndUserId,
};
