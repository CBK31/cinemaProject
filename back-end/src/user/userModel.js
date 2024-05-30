const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isVIP: { type: Boolean, default: false, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("User", userSchema);
