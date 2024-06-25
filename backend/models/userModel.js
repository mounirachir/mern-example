const mongoose = require("mongoose");
// user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// user model
const User = mongoose.model("User", userSchema);

module.exports = User;
