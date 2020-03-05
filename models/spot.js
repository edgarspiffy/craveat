const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  city: String,
  alcohol: Boolean,
  happyHour: Boolean,
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }]
});

module.exports = mongoose.model('Spot', spotSchema);