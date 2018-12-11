const express = require('express');
const router = express.Router();

//@route  GET api/users/
//@desc   Test get route
//@access Public
router.get('/', (req,res) => res.json({user: "this is a user"}));

module.exports = router;
