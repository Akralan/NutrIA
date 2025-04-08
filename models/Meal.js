const mongoose = require('mongoose');

const macronutrimentsSchema = new mongoose.Schema({
  glucides: {
    type: Number,
    required: true,
    min: 0,
    description: "Quantité de glucides dans le repas (en grammes)"
  },
  proteines: {
    type: Number,
    required: true,
    min: 0,
    description: "Quantité de protéines dans le repas (en grammes)"
  },
  lipides: {
    type: Number,
    required: true,
    min: 0,
    description: "Quantité de lipides dans le repas (en grammes)"
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
    description: "Quantité de calories dans le repas (en kcal)"
  }
}, { _id: false });

const mealSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    description: "Nom du repas"
  },
  ingredients: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Un repas doit contenir au moins un ingrédient'
    },
    description: "Liste des ingrédients du repas"
  },
  score_nutritionnel: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    description: "Score nutritionnel du repas (noté sur 5)"
  },
  macronutriments: {
    type: macronutrimentsSchema,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    description: "Date à laquelle le repas a été consommé"
  }
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
