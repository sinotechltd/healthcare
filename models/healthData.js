const mongoose = require("mongoose");
const User = require("./user");

const healthDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  // Add any additional fields for other physical details
  // For example:
  age: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
});

const HealthData = mongoose.model("HealthData", healthDataSchema);

module.exports = HealthData;
