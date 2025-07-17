const express = require("express");
const { user_auth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();



userRouter.get("/user/requests/received", user_auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName email photourl");

    res.json({
      message: "Connection requests ...",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


userRouter.get("/user/connections",user_auth,async(req,res)=>{
  try{
   const loggedInUser=req.user;
   const connections = await connectionRequest
     .find({
       $or: [
         { fromUserId: loggedInUser._id, status: "accepted" },
         { toUserId: loggedInUser._id, status: "accepted" },
       ],
     })
     .populate("fromUserId", "firstName lastName email photourl")
     .populate("toUserId", "firstName lastName email photourl");
   console.log(connections);
   const data=connections.map((row)=>{
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
      return row.toUserId;
    }
    return row.fromUserId;
   });
   res.send({data});


  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})
module.exports = userRouter;