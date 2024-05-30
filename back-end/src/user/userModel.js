const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: String, default: false, required: true },
  phoneNumber: { type: Number, default: false, required: true },
  favoriteMovies: { type: [String] },
});

module.exports = mongoose.model("User", userSchema);
