// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('../config');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register',
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, password, address } = req.body;

    console.log(name, email, password, address);
    // res.send('hi').status(201)

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        address
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  // [
  //   check('email', 'Please include a valid email').isEmail(),
  //   check('password', 'Password is required').exists()
  // ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //console.log(email, password)

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      console.log(user)

      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      console.log(isMatch);


      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      return res.json({ hi: 'hi' })

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };



      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ hi: 'hi' });
        }
      );
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/user
// @desc    Get authenticated user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/logout
// @desc    Logout user / Clear credentials
// @access  Private
router.post('/logout', auth, (req, res) => {
  try {
    // Since we're using JWT, we just need to tell the client to remove the token
    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
