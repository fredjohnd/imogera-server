const express = require('express');

const router = express.Router();
const condController = require('../controllers/condominioController');

router.get('/', condController.condominio_list);
router.post('/add', condController.condominio_add);
router.get('/:id', condController.condominio_detail);
router.delete('/:id', condController.condominio_delete);

module.exports = router;
