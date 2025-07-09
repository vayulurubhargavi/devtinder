const express = require('express');
const profileRouter = express.Router(); 

const { user_auth } = require("../middlewares/auth"); 
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const User = require("../models/user");

profileRouter.get("/profile/view", user_auth, async (req, res) => {
  try {
    const user = req.user; // user is attached to the request object by the user_auth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});


profileRouter.patch("/profile/edit",user_auth,async(req,res)=>{
  try{
  if(!validateEditProfileData(req)){
    throw new Error("Invalid Edit request")
  }
  const loggedInUser=req.user;
  Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
  await loggedInUser.save();
  res.json({
    message:`${loggedInUser.firstName} , your profile updated successfully`,
    data: loggedInUser
  })
}catch(err){
  res.status(400).send("ERROR: " + err.message);  

}
});

profileRouter.patch("/profile/edit/password",user_auth, async(req,res)=>{
  try{
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await findUser.validatePassword(password);
  if (isPasswordMatch){
    throw new Error("you have entered same password");
  }
const loggedInUser=req.user;
loggedInUser.password=await bcrypt.hash(req.body.password, 10);  
await loggedInUser.save();
res.json({
  message:`${loggedInUser.firstName} , your password updated successfully`,
  data: loggedInUser      

})
  }catch(err){
  res.status(400).send("ERROR: " + err.message);  
  }
})



module.exports = profileRouter;