const Password = require('../models/password');
const CryptoJS = require('crypto-js');

module.exports = {
  createPassword: (req, res, next) => {
    const { name, password } = req.body;
    if (password && name) {
      Password.findOne({ name }, (err, pass) => {
        if (err) {
          res.status(500).json({
            code: 500,
            message: 'Internal server error',
          });
        }
        if (pass) {
          res.status(400).json({
            code: 400,
            message: `A password with that name (${name}) already exists`,
          });
        } else {
          Password.create(
            {
              ...req.body,
              created: Date.now(),
            },
            (err, pass) => {
              if (err) {
                next(err);
              } else {
                res.status(200).json({
                  code: 200,
                  data: pass,
                  message: `Password with the name ${name} succesfully created`,
                });
              }
            },
          );
        }
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Password and name is required',
      });
    }
  },
  getPassword: (req, res, next) => {
    const { name } = req.body;
    if (name) {
      Password.findOne({ name }, (err, pass) => {
        if (err) {
          next(err);
        }
        if (pass) {
          const encrypted = pass.password;
          const bytes = CryptoJS.AES.decrypt(encrypted, process.env.ENC_DEC_SECRET);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          pass.password = decrypted;
          res.status(200).json({
            code: 200,
            data: pass,
            message: 'Process succesfully completed',
          });
        } else {
          res.status(404).json({
            code: 404,
            message: 'Data not found',
          });
        }
      });
    } else {
      Password.find({}, (err, passwords) => {
        if (err) {
          next(err);
        } else {
          if (passwords) {
            passwords.forEach(pw => {
              const encrypted = pw.password;
              const bytes = CryptoJS.AES.decrypt(encrypted, process.env.ENC_DEC_SECRET);
              const decrypted = bytes.toString(CryptoJS.enc.Utf8);
              pw.password = decrypted;
            });
            res.status(200).json({
              code: 200,
              data: passwords,
              message: 'Process succesfully completed',
            });
          } else {
            res.status(500).json({
              code: 500,
              message: 'Internal server error',
            });
          }
        }
      });
    }
  },
};
