const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['duration', 'reps'],
    lowercase: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['sec', 'min', 'reps'],
    lowercase: true,
    validate: {
      validator: function(unit) {
        if (this.type === 'duration' && !['sec', 'min'].includes(unit)) {
          return false;
        }
        if (this.type === 'reps' && unit !== 'reps') {
          return false;
        }
        return true;
      },
      message: 'Unité invalide pour ce type d\'exercice'
    }
  }
}, {
  timestamps: true
});

// Middleware pour valider la cohérence entre type et unité
exerciseSchema.pre('save', function(next) {
  if (this.type === 'duration' && !['sec', 'min'].includes(this.unit)) {
    next(new Error('Les exercices de type duration doivent utiliser sec ou min comme unité'));
  } else if (this.type === 'reps' && this.unit !== 'reps') {
    next(new Error('Les exercices de type reps doivent utiliser reps comme unité'));
  } else {
    next();
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
