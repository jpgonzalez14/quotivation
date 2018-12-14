const express = require('express');
const router = express.Router();

//@route  GET api/quotes/
//@desc   Test get route
//@access Public
router.get('/', (req,res) => res.json({quote: "this is a quote"}));

//@route  POST api/quotes/create
//@desc   create quote
//@access Public


//@route  GET api/quotes/quotes
//@desc   get a lis of quotes
//@access Public


//@route  PUT api/quotes/edit
//@desc   edit an existing quote
//@access Private


//@route  DELETE api/quotes/delete
//@desc   delete existing quote
//@access Private


module.exports = router;
