const express = require('express');
const router = express.Router();
const barsController = require('../controllers/barsController');

router.get('/', barsController.getBar);
router.get('/:id', barsController.getBarByID);
router.post('/', barsController.createBar);
router.patch('/:id', barsController.editBar);
router.delete('/:id', barsController.deleteBar);

module.exports = router;