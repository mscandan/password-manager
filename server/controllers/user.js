const User = require('../models/user');

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
};
