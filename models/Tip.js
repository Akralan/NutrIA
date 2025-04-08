const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'entityType'
  },
  entityType: {
    type: String,
    required: true,
    enum: ['meal', 'goal', 'exercise'],
    lowercase: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index composé pour optimiser les recherches par entité
tipSchema.index({ entityId: 1, entityType: 1 });

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
