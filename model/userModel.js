const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter a username"],
    unique: true,
  },
  email: { type: String, required: [true, "please enter an email"] },
  password: {
    type: String,
    require: [true, "Please enter a password"],
  },
});

const User = mongoose.model("Users", UserSchema, "Users");
module.exports = User;
