const express = require('express');
const router = express.Router();

const { getAllCategory } = require('../controllers/categoryController.js');
router.get('/', getAllCategory);

module.exports = router;
