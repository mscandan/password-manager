const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async connectionUrl => {
  await mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('connected to database');
};

module.exports = connectDB;
