const mongoose = require("mongoose");
const User = require("./user");

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
