const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namstedev:Qolbbdr7uWEDd9f8@namastenode.qi1zogr.mongodb.net/?retryWrites=true&w=majority&appName=namastenode/devtinder"
  );
};

module.exports = connectDB;