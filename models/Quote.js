const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const QuoteSchema = new Schema({
  quote:{
    type: String,
    require: true
  }
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);
