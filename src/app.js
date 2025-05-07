const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("namaste World!");
});

// app.use("/hello/xyz", (req, res) => {
//   res.send("hello hello xyz!.....");
// });

app.get("/user/:userid/:name/:password", (req, res) => {
  console.log(req.params,'===> req.params');
  res.send({ firstname: "Akshay", lastname: "kumar", age: "35" });
});

app.post("/user", (req, res) => {
  //saving data to db
  res.send("Data saved to DB successfully!");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted from DB successfully!");
});
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
