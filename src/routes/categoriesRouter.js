const express = require('express');
const router = express.Router();

const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');
const { getAllCategory } = require('../controllers/categoryController.js');

//router.get('/', getAllCategory);
router.get('/', authenticateToken, getAllCategory);

module.exports = router;
