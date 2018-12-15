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
  published:{
    type: Boolean,
    default: false
  },
  typo:{
    type: String,
    require: true
  },
  color:{
    type: String,
    require: true
  },
  category:{
    health: {
      type: Boolean,
      require: true
    },
    entrepreneurship: {
      type: Boolean,
      require: true
    }
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);
