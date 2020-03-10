const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,

  location:{
    city:String,
    zip:Number,
    address:String
  },
  
  hours:[
    {
      day:String,
      start:String,
      end:String,
      happyHour:{
        happyHour:Boolean,
        start:Number,
        end:Number
      }
    }
  ],
  
  alcohol: Boolean,

  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }]
});

module.exports = mongoose.model('Spot', spotSchema);