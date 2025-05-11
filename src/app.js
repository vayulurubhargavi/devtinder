const express = require("express");

const app = express();


// middleware and req. handlers//
///1. all the req-res call back functions are called as middlewares
///2. middlewares are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
///3. the middlware that usually send the response to the client is called as route handler
/// ex: get /users=>middlewares=> route handler
app.use("/", (req, res, next) => {
  console.log("handling / route");
  // res.send("hello world");
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("route handler function 1");

    next();
    // res.send("route handler 1......");
  },
  (req, res, next) => {
    console.log("route handler function 2");
    //  res.send("route handler 2......");
    next();
  },
  (req, res) => {
    console.log("route handler function 3");
    res.send("route handler 3......");
  }
);

//----------api routes and rest api------------------
// app.get("/", (req, res) => {
//   res.send("namaste World!");
// });

// app.use("/hello/xyz", (req, res) => {
//   res.send("hello hello xyz!.....");
// });

// app.get("/user/:userid/:name/:password", (req, res) => {
//   console.log(req.params,'===> req.params');
//   res.send({ firstname: "Akshay", lastname: "kumar", age: "35" });
// });

// app.post("/user", (req, res) => {
//   //saving data to db
//   res.send("Data saved to DB successfully!");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data deleted from DB successfully!");
// });
// app.use("/hello", (req, res) => {
//   res.send("hello hello heelloo!.....");
// });

// app.use("/test", (req, res) => {
//   res.send("teszt server !.....");
// });

// app.use("/dashboard", (req, res) => {
//   res.send("this is dashboard!.....");
// });
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
