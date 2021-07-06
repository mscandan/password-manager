const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: (req, res, next) => {
    const { password, username } = req.body;
    if (password && username) {
      User.findOne({ username }, (err, user) => {
        if (user) {
          res.status(403).json({
            code: 403,
            message: 'An account with this username already exists',
          });
        } else {
          User.create(
            {
              ...req.body,
              created: Date.now(),
            },
            (err, user) => {
              if (err) {
                next(err);
              } else {
                res.status(200).json({
                  code: 200,
                  data: user,
                  message: 'Process succesfully completed',
                });
              }
            },
          );
        }
      });
    } else {
      res.status(403).json({
        code: 403,
        message: 'Username and password is required',
      });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;
    if (password && username) {
      User.findOne({ username }, (err, user) => {
        if (err) {
          res.status(403).json({
            code: 403,
            message: `User with the ${username} not found`,
          });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(500).json({
                message: 'Server Error',
              });
            }
            if (!isMatch) {
              res.status(400).json({
                message: 'Password is wrong',
              });
            } else {
              const token = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
              User.findOneAndUpdate({ username: username }, { lastLogIn: Date.now(), token }, { new: true }).exec(
                (err, model) => {
                  if (!err) {
                    console.log(model.username + ' is logged in');
                    res.status(200).json({
                      code: 200,
                      token: token,
                    });
                  } else {
                    console.log(err);
                  }
                },
              );
            }
          });
        }
      });
    } else {
      res.status(400).json({
        message: 'Password and username is required',
      });
    }
  },
};
