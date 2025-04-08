const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  duration: {
    type: Number,
    min: 1,
    required: false
  }
}, {
  timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
