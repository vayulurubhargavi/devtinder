const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength:4,
      maxlength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough" + value);
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },
    photourl: {
      type: String,
      // default:
      //   "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL" + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getJWTToken=async function () {
  const user=this;
  const jwtToken = await jwt.sign({ _id: user._id }, "Dev@Tinder123", {
    expiresIn: "1d",
  });

  return jwtToken; 
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const passwordHash=user.password;
 const isPasswordMatched = await bcrypt.compare(
   passwordInputByUser,
   passwordHash
 );
 return isPasswordMatched;

}
// Create the user model
const User = mongoose.model("User", userSchema);
// Export the user model
module.exports = User;
