const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const QuoteSchema = new Schema({
  quote:{
    type: String,
    require: true
  },
  author:{
    type: String,
    require: true
  },
  typo:{
    type: String,
    require: true
  },
  color:{
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);
