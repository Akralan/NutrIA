const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  quality: {
    type: String,
    required: true,
    enum: ['mauvaise', 'moyenne', 'bonne', 'excellente']
  }
}, {
  timestamps: true
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
