const mongoose = require("mongoose");
const User = require("./user");
const dietSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  calorificCount: {
    type: Number,
    required: true,
  },
  meal: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    required: true,
  },
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
