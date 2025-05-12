const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
});

// Create the user model
const User = mongoose.model("User", userSchema);
// Export the user model
module.exports = User;
