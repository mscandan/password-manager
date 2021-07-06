const express = require('express');
const router = express.Router();

const passwordControllers = require('../controllers/password');
const userControllers = require('../controllers/user');

router.get('/pass', passwordControllers.getPassword);
router.post('/pass', passwordControllers.createPassword);
router.post('/create-user', userControllers.createUser);
router.post('/login', userControllers.login);

module.exports = router;
