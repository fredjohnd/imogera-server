const express = require('express');

const router = express.Router();
const condController = require('../controllers/condController');

router.get('/', condController.cond_list);
router.get('/new', condController.cond_add);
router.get('/:id', condController.cond_detail);
router.get('/delete', condController.cond_delete);

module.exports = router;
