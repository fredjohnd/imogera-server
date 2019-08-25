const express = require('express');

const router = express.Router();
const condController = require('../controllers/condominioController');

router.get('/', condController.condominio_list);
router.post('/', condController.condominio_add);
router.get('/:id', condController.condominio_detail);
router.put('/:id', condController.condominio_update);
router.delete('/:id', condController.condominio_delete);
router.post('/:id/incidents', condController.condominio_add_incident);

router.post('/:id/members', condController.condominio_add_member);

module.exports = router;
