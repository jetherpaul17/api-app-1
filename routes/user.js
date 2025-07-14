const express = require('express');
const router = express.Router();
const { login, register, details } = require('../controllers/user.js');
const verify = require('../auth.js');

router.post('/register', register);
router.post('/login', login);
router.get('/details', verify, details);


module.exports = router;