const bcrypt = require("bcryptjs");
const User = require("../models/user");
const HealthData = require("../models/healthData");

// Register route
exports.registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne().or([{ username }, { email }]);

    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    res.send("Login successful!");
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
