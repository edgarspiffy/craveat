const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  calories:Number,
  vegan:Boolean,
  spicy:Boolean,
  ingredients: [String],
  spotInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot'
  }
})

module.exports = mongoose.model('Dish', dishSchema);