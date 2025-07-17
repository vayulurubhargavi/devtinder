# devTinder

auth Router
-POST /signup
-POST /login
-POST /profile

profileRouter
-GET   /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter
<!-- -POST /request/send/interested/:userid
-POST /request/send/ignored/:userid -->
--POST /request/send/:status/:userid

--POST /request/review/:status/:requestId
<!-- -POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId -->

userRouter
-GET /user/connections
-GET /user/requests/received
-GET /user/feed -gets the profile of other users on platform 

Status : ignored,interested, rejected, accepted, 

