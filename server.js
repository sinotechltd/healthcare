const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const userController = require("./controllers/user.controller");

var app = express();
const port = 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware for logging req object
app.use((req, res, next) => {
  console.log(req);
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Register route
app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);
app.put("/healthdata", userController.updateHealthData);
app.post("/exercise", userController.addExerciseEntry);
app.post("/diet", userController.addDietEntry);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
