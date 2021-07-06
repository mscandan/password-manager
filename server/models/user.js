const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  enc_dec_key: {
    type: String,
  },
  passwords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Password' }],
  created: {
    type: Date,
  },
});

UserSchema.pre('save', function () {
  const user = this;
  const hashed = bcrypt.hashSync(user.password);
  const enc_dec = randomstring.generate(30);
  user.enc_dec_key = enc_dec;
  user.password = hashed;
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;
