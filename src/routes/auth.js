const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

const { validateUserSignUpData } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // read the data from the request body
    // validate the data from req body
    validateUserSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    //encrypt the password
    const passwordHashed = await bcrypt.hash(password, 10);

    const new_user = new User({
      firstName,
      lastName,
      email,

      password: passwordHashed,
    });
    // save the user to the database
    const savedUser = await new_user.save();
    const token = await savedUser.getJWTToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    });
    res.json("User created successfully", { data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  // read the email from req.body and check if it exists in db otherwise throw error
  // read the password from req.body and compare it with the hashed password stored in db -if not matched throw error
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("Invalid Credentials");
    }
    // const isPasswordMatch=await bcrypt.compare(password,findUser.password);
    const isPasswordMatch = await findUser.validatePassword(password);
    if (isPasswordMatch) {
      // create a JWT token
      // const token = await jwt.sign({ _id: findUser._id},"Dev@Tinder123",{expiresIn:"1d"});
      const token = await findUser.getJWTToken();

      //add the token to cookie and send the response back to the client
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // cookie will be removed after 8 days
      });
      res.send(findUser);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful");
});

module.exports = authRouter;
