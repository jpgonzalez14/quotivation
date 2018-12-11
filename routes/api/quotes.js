const express = require('express');
const router = express.Router();

//@route  GET api/quotes/
//@desc   Test get route
//@access Public
router.get('/', (req,res) => res.json({quote: "this is a quote"}));

module.exports = router;
