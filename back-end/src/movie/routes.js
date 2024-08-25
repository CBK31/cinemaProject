const express = require("express");
const myRoutes = express.Router();
const movieController = require("./controller");

myRoutes.use("/add", movieController.addMovie);
myRoutes.use("/getMovieById", movieController.getMovieById);
myRoutes.use("/delete", movieController.deleteMovieById);
module.exports = myRoutes;
