const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  ingredients: [String]
})

module.exports = mongoose.model('Dish', dishSchema);