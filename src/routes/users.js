const express = require('express');

const router = express.Router();

// Require controller modules.
const userController = require('../controllers/userController');

// GET User home page.
router.get('/', userController.user_list);
router.get('/add', userController.user_add);
router.get('/delete', userController.user_delete);
router.get('/:id', userController.user_detail);

module.exports = router;
