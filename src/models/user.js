const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: String,
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      }
    },
    photourl: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Create the user model
const User = mongoose.model("User", userSchema);
// Export the user model
module.exports = User;
