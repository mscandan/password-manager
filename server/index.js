const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');

const app = express();
const host = process.env.HOST;
const port = process.env.PORT || 4001;

connectDB(process.env.DB_CONNECTION);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, application/json, Authorization, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port, host, () => console.log(`server started on port: ${port}`));
app.get('/', (req, res) => res.send('router works fine'));
