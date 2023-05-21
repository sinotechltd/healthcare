const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const cors = require("cors");
const userController = require("./controllers/user.controller");

var app = express();
const port = 5000;
app.use(cors());

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Requested route: ${req.method} ${req.originalUrl}`);
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
app.post("/healthdata", userController.updateHealthData);
app.post("/exercises", userController.addExerciseEntry);
app.put("/updateweight/:userId", userController.updateweight);

app.get("/user/:id", userController.getUser);
app.get("/health", userController.getHealth);
app.get("/exercises", userController.fetchExerciseEntries);

//add diet
app.get("/diet", userController.fetchDietEntries);
app.get("/goals", userController.fetchGoals);
// app.get("/goals", userController.fetchGoals);
app.post("/diet", userController.addDietEntry);
app.post("/goals", userController.addGoal);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
