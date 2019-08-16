const express = require('express');

const router = express.Router();

// Require controller modules.
const accountController = require('../controllers/accountController');

router.post('/login', accountController.login);
router.post('/logout', accountController.logout);
router.post('/register', accountController.register);
router.post('/register/confirm', accountController.confirm);

module.exports = router;
