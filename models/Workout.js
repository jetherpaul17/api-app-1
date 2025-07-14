const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  duration: { type: String },
  status: { type: String, default: 'pending' },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);