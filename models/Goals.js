const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  achieved: {
    type: Boolean,
    default: false,
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
