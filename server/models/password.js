const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const PasswordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
});

PasswordSchema.pre('save', function () {
  const passObj = this;
  const encrypted = CryptoJS.AES.encrypt(passObj.password, process.env.ENC_DEC_SECRET).toString();
  passObj.password = encrypted;
});

const Password = mongoose.model('Passwords', PasswordSchema);
module.exports = Password;
