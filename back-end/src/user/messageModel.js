const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Message", messageSchema);
