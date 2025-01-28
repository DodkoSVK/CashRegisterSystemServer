const express = require('express');
const router = express.Router();
const barsController = require('../controllers/barsController');

router.get('/', barsController.getBar);
router.post('/', barsController.createBar);

module.exports = router;