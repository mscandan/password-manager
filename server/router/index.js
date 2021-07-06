const express = require('express');
const router = express.Router();

const passwordControllers = require('../controllers/index');
const userControllers = require('../controllers/user');

router.get('/pass', passwordControllers.getPassword);
router.post('/pass', passwordControllers.createPassword);
router.post('/create-user', userControllers.createUser);

module.exports = router;
