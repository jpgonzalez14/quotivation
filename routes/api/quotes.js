const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load model
const Quote = require('../../models/Quote');
const User = require('../../models/User');


//@route  GET api/quotes/quotes
//@desc   get a quote
//@access Public
router.get('/current', (req, res) => {
  const errors = {};
  Quote.findOne({ quote: req.body.quote }).then(quote => {
    if (quote) {
      res.json(quote);
    } else {
      errors.noquote = 'Quote does not exist';
      return res.status(404).json(errors);
    }
  }).catch(err => res.status(404).json(err));
});

//@route  POST api/quotes/create
//@desc   create quote
//@access Public
router.post('/create', (req, res) => {
  const errors = {};
  Quote.findOne({ quote: req.body.quote }).then(quote => {
    if (quote) {
      errors.noprofile = 'Quote allready exist';
      return res.status(400).json(errors);
    } else {
      const newQuote = new Quote({
        quote: req.body.quote,
        author: req.body.author,
        typo: req.body.typo,
        color: req.body.color,
        category: {
          health: req.body.health,
          entrepreneurship: req.body.entrepreneurship
        }
      });
      newQuote.save().then(quote => res.json(quote)).catch(err => console.log(err));
    }
  }).catch(err => res.status(404).json(err));
});

//@route  GET api/quotes/quotes
//@desc   get a list of quotes
//@access Public
router.get('/list', (req, res) => {
  const errors = {};
  Quote.find({}).then(quotes => {
    if (quotes) {
      res.json(quotes);
    } else {
      errors.noquote = 'There are no quotes';
      return res.status(404).json(errors);
    }
  }).catch(err => res.status(404).json(err));
});

//@route  PUT api/quotes/edit
//@desc   edit an existing quote
//@access Private
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Quote.findOne({ quote: req.body.quote }).then(quote => {
    if (quote) {
      Quote.findOneAndUpdate(
        {
          $set: {
            quote: req.body.quote,
            author: req.body.author,
            typo: req.body.typo,
            color: req.body.color,
            category: {
              health: req.body.health,
              entrepreneurship: req.body.entrepreneurship
            }
          }
        },
        { new: true }
      ).then(quote => res.json(quote));
    } else {
      errors.noprofile = 'Quote does not exist';
      return res.status(404).json(errors);
    }
  }).catch(err => res.status(404).json(err));
});

//@route  DELETE api/quotes/delete
//@desc   delete existing quote
//@access Private
router.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {

});

module.exports = router;
