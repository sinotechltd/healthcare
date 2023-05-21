const bcrypt = require("bcryptjs");
const User = require("../models/user");
const HealthData = require("../models/healthData");
const Exercise = require("../models/exercise");
const Diet = require("../models/diet");
const mongoose = require("mongoose");
const Goal = require("../models/Goals");
// Register route
exports.registerUser = async (req, res) => {
  //   console.log(req.body);
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne().or([{ username }, { email }]);

    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    // Hash the password
    console.log("Password:", password);
    const hashedPassword = await bcrypt.hash(String(password), 10);
    console.log("Password:", hashedPassword);

    // Create a new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log(username);
    res.send("Registration successful!");
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).send("Registration failed");
  }
};

// Login route
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid username or password");
    }
    const userData = {
      userID: user.id,
      fullName: "John Doe",
      message: "Success",
    };

    // Send the response with user ID and full name
    // Send the response with user ID and full name
    res.send(userData);
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Login failed");
  }
};
exports.updateHealthData = async (req, res) => {
  //const userId = req.body.user; // Assuming the user ID is provided in the request body
  const { user, height, weight, age, bloodPressure } = req.body;
  console.log(user);

  try {
    // Create a new HealthData document
    const healthData = new HealthData({
      user,
      height,
      weight,
      age,
      bloodPressure,
    });

    // Save the new health data
    data = await healthData.save();
    console.log(data);

    res.send("Health data created successfully!");
  } catch (error) {
    console.error("Error creating health data", error);
    res.status(500).send("Failed to create health data");
  }
};

exports.addExerciseEntry = async (req, res) => {
  //const userId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID
  const { user, exerciseType, duration } = req.body;

  try {
    // Create a new exercise entry
    const newExercise = new Exercise({
      user,
      exerciseType,
      duration,
    });

    // Save the exercise entry to the database
    await newExercise.save();

    res.send("Exercise entry added successfully!");
  } catch (error) {
    console.error("Error adding exercise entry", error);
    res.status(500).send("Failed to add exercise entry");
  }
};

// Add diet entry route
exports.addDietEntry = async (req, res) => {
  const userId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID
  const { food, calorificCount, meal } = req.body;

  try {
    // Create a new diet entry
    const newDiet = new Diet({
      user: userId,
      food,
      calorificCount,
      meal,
    });

    // Save the diet entry to the database
    await newDiet.save();

    res.send("Diet entry added successfully!");
  } catch (error) {
    console.error("Error adding diet entry", error);
    res.status(500).send("Failed to add diet entry");
  }
};
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error("Error retrieving user", error);
    res.status(500).send("Failed to retrieve user");
  }
};
exports.getHealth = async (req, res) => {
  const userId = req.query.id;
  // console.log(userId);
  try {
    // const goal = await Goal.find({ user: userId });
    // // console.log(goal)
    // res.json(goal);
    const health = await HealthData.find({ user: userId });
    console.log(health);
    res.json(health);
  } catch (error) {
    console.error("Error fetching health data", error);
    res.status(500).send("Failed to fetch health data");
  }
};
exports.fetchExerciseEntries = async (req, res) => {
  //const userId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID
  const userId = req.query.id;
  try {
    // Fetch all exercise entries for the specified user
    const exerciseEntries = await Exercise.find({ user: userId });

    res.json(exerciseEntries);
  } catch (error) {
    console.error("Error fetching exercise entries", error);
    res.status(500).send("Failed to fetch exercise entries");
  }
};

//diet controllers

exports.addDietEntry = async (req, res) => {
  const { user, food, calorificCount, meal } = req.body;

  try {
    // Create a new diet entry
    const newDietEntry = new Diet({
      user,
      food,
      calorificCount,
      meal,
    });

    // Save the diet entry to the database
    await newDietEntry.save();

    res.send("Diet entry added successfully!");
  } catch (error) {
    console.error("Error adding diet entry", error);
    res.status(500).send("Failed to add diet entry");
  }
};

exports.fetchDietEntries = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  try {
    const dietEntries = await Diet.find({ user: userId });
    // const dietEntries = await Diet.find({ user: id });
    console.log(dietEntries);

    res.json(dietEntries);
  } catch (error) {
    console.error("Error fetching diet entries", error);
    res.status(500).send("Failed to fetch diet entries");
  }
};
exports.fetchGoals = async (req, res) => {
  const userId = req.query.id;
  // console.log(userId);
  try {
    const goal = await Goal.find({ user: userId });
    // console.log(goal)
    res.json(goal);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};
exports.addGoal = async (req, res) => {
  try {
    const { user, target, date } = req.body;
    console.log(user);

    // Create a new goal
    const newGoal = new Goal({
      user,
      target,
      date,
    });

    // Save the goal to the database
    await newGoal.save();

    res.status(201).json({ message: "Goal created successfully" });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};
exports.getUserGoals = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};
exports.addGoal = async (req, res) => {
  try {
    const { user, target, date } = req.body;
    console.log(user);

    // Create a new goal
    const newGoal = new Goal({
      user,
      target,
      date,
    });

    // Save the goal to the database
    await newGoal.save();

    res.status(201).json({ message: "Goal created successfully" });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

exports.updateweight = async (req, res) => {
  try {
    console.log("you are here mf");
    newWeight = req.body.weight;
    const userId = req.params.userId;
    HealthData.findOneAndUpdate(
      { userId: userId },
      { weight: newWeight },
      { new: true }
    )
      .then((updatedData) => {
        // Handle the case where the user's weight was successfully updated
        if (updatedData) {
          res.status(200).send("Weight updated successfully");
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the update process
        console.error("Failed to update weight:", error);
        res.status(500).send("Failed to update weight");
      });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};
