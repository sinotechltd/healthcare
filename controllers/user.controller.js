const bcrypt = require("bcryptjs");
const User = require("../models/user");
const HealthData = require("../models/healthData");
const Exercise = require("../models/exercise");
const Diet = require("../models/diet");

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

    res.send(`Login successful! Welcome, ${user.fullName}!`);
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Login failed");
  }
};
exports.updateHealthData = async (req, res) => {
  const userId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID
  const { height, weight, age, bloodPressure } = req.body;

  try {
    // Find the health data for the user
    let healthData = await HealthData.findOne({ user: userId });

    if (!healthData) {
      return res.status(404).send("Health data not found");
    }

    // Update the health data fields
    healthData.height = height;
    healthData.weight = weight;
    healthData.age = age;
    healthData.bloodPressure = bloodPressure;

    // Save the updated health data
    await healthData.save();

    res.send("Health data updated successfully!");
  } catch (error) {
    console.error("Error updating health data", error);
    res.status(500).send("Failed to update health data");
  }
};
exports.addExerciseEntry = async (req, res) => {
  const userId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID
  const { exerciseType, duration, distance } = req.body;

  try {
    // Create a new exercise entry
    const newExercise = new Exercise({
      user: userId,
      exerciseType,
      duration,
      distance,
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
