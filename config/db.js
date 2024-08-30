const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGOURL}backend-task-02`)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
