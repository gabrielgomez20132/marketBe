const express = require('express');
const router = express.Router();

const { getTopProducts } = require('../controllers/topProductController.js');
router.get('/', getTopProducts);

module.exports = router;

