const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware to parse JSON request bodies
app.use(express.json());

// GET the user by email
app.get("/user", async (req, res) => {
  const user_email = req.body.email;
  // whenever we want to get the data from the database, we need to use aysnc-await
  try {
    const user = await User.findOne({ email: user_email }); //finds only one user
    // const user = await User.find({ email: user_email });//finds all users
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET the user by _id--using findById
app.get("/userById", async (req, res) => {
  const id = req.body._id;
  // whenever we want to get the data from the database, we need to use aysnc-await
  try {
    const user = await User.findById({ _id: id }); //finds user by id

    if (!id) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//GET -/feed api-finds all the user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

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

// delete the partciular user by id
app.delete("/user", async (req, res) => {
  try {
    const userid = req.body.userid;
    // console.log(userid);
    await User.findByIdAndDelete(userid);
    // await User.findByIdAndDelete({_id:userid});--both are same
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update the user document
app.patch("/user", async (req, res) => {
  const userid = req.body.userid;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userid, data);
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
