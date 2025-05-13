const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "sachin",
  //   lastName: "tendulkar",
  //   email: "sachin@gmail.com",
  //   password: "vay124",
  //   age: 65,
  // };
  // // create a new user instance to a model
  // const newUser = new User(userObj);
  // // save the user to the database
  // try {
  //   await newUser.save(); //this saves the user to the database and returns a promise
  //   res.send("User created successfully");
  // } catch (err) {
  //   console.error("Error creating user:", err);
  //   res.status(400).send("Error creating user");
  // }

  // read the data from the request body
  console.log(req.body);
  const new_user = new User(req.body);
  // save the user to the database
  try {
    await new_user.save(); //this saves the user to the database and returns a promise
    res.send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).send("Error creating user");
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
