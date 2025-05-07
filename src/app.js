const express = require("express");

const app = express();

app.get("/",(req, res) => {
  res.send("namaste World!");
});

app.get("/dashboard", (req, res) => {
  res.send("this is dashboard!.....");
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
