const express = require('express');
const router = express.Router();

const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');
const { getAllCategory, deleteCategory, createCategory, updateCategory , getCategoryById} = require('../controllers/categoryController.js');

//router.get('/', getAllCategory);
router.get('/', authenticateToken, getAllCategory);
router.get('/:id', authenticateToken, getCategoryById);
router.patch('/:id', authenticateToken, deleteCategory);
router.post('/', authenticateToken, createCategory);
router.put('/:id', authenticateToken, updateCategory);

module.exports = router;
