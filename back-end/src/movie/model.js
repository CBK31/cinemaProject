const mongoose = require("mongoose");
const schema = mongoose.Schema;

const movieSchema = new schema({
  userId: { type: String },
  movieId: { type: String },
  ended: { type: String },
  image: { type: String },
  language: { type: String },
  name: { type: String },
  rating: { type: String },
  runtime: { type: String },
  summary: { type: String },
  genres: { type: [String] },
});

module.exports = mongoose.model("Movie", movieSchema);
