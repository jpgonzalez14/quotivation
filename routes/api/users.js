const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load model
const User = require('../../models/User');

//@route  GET api/users/
//@desc   Test get route
//@access Public
router.get('/', (req, res) => res.json({user: "this is a user"}));

//@route  GET api/users/register
//@desc   register a user
//@access Public
router.post('/register', (req, res) => {
 const { errors, isValid } = validateRegisterInput(req.body);
 //Check validation
 if (!isValid) {
   return res.status(400).json(errors);
 }
 User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({email:'email allready exists'});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUser.password = hash;
            newUser.save().then(user => res.json(user)).catch(err => console.log(err));
          }
        })
      });
    }
  });
});

//@route  GET api/users/login
//@desc   login from existing account and return JWTtoken
//@access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //Find user in DB
  User.findOne({email})
    .then(user => {
      //check user
      if (!user) {
        return res.status(404).json({email:'User not found'});
      } else {
        //check password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //User match
              const payload = { id: user.id, name: user.name } //create jwt payload
              //sign JWTtoken
              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
            } else {
              return res.status(400).json({password:'Password incorrect'});
            }
          })
      }
    })
});

//@route  GET api/users/current
//@desc   get current User
//@access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});



module.exports = router;
