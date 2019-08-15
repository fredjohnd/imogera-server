const express = require('express');

const router = express.Router();

// Require controller modules.
const userController = require('../controllers/userController');

router.get('/', userController.user_list);
router.post('/add', userController.user_add);
router.get('/:id', userController.user_detail);
router.delete('/:id', userController.user_delete);

module.exports = router;
