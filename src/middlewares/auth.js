const jwt = require("jsonwebtoken");
const User = require("../models/user");

const user_auth = async(req, res, next) => {
  try{
    const cookies=req.cookies;
    const { token } = cookies;
    // validate the token
    if (!token) {
      throw new Error("No token found, please login");
    }
    const decodedMessage = await jwt.verify(token, "Dev@Tinder123");
    const { _id } = decodedMessage;
    // find the user by id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // attach user to request object
   
    next(); // call next middleware or route handler
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {

  user_auth
};
