const express = require('express');
const requestRouter = express.Router(); 
const { user_auth } = require("../middlewares/auth"); 
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", user_auth, async (req, res) => {
  try {
    const user = req.user;
    const fromUserId = user._id;
    const { status, toUserId } = req.params;

    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).send({message:`Invalid Status:${status}`});
    }

    const toUser=await User.findById(toUserId);
    if(!toUser){
      return res.status(404).send({message:"User not found !!"});
    }
    const existingConnectionRequest=await ConnectionRequest.findOne({
     $or: [{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
    });
    if(existingConnectionRequest){
      return res.status(400).send({message:"Connection request already exists !!"});
    }
    
    const connectionRequest = new ConnectionRequest({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status,
    });
   const data= await connectionRequest.save();
   res.json({
    message: req.user.firstName+" is "+status+ " in connection with " + toUser.firstName,
    data: data
   })
  
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId",user_auth,async (req,res)=>{
  try{
    const {status,requestId} = req.params;
    const loggedInUser = req.user;

    const allowedStatus=["ignored","accepted"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid Status" + status});
    }

    console.log(requestId, loggedInUser._id);
    
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status:"interested",
    });
    if(!connectionRequest){
      return res.status(404).json({message:"Connection request not found !!"});
    }
    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({
      message: loggedInUser.firstName + " has " + status + " the connection request",
      data: data
    })
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

})


module.exports = requestRouter;