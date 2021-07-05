const express = require('express');
const router = express.Router();

const passwordControllers = require('../controllers/index');

router.get('/pass', passwordControllers.getPassword);
router.post('/pass', passwordControllers.createPassword);

module.exports = router;
