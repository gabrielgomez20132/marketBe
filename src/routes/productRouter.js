const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', /* authenticateToken, hasPermission('read:products'), */ getProducts);// Ruta pública con buscador por ?search= y paginación ?page=&limit=
router.get('/:id', /* authenticateToken, hasPermission('read:products'), */ getProductById);

// Rutas protegidas
router.post('/', authenticateToken, hasPermission('create:products'), createProduct);
router.put('/:id', authenticateToken, hasPermission('update:products'), updateProduct);
router.delete('/:id', authenticateToken, hasPermission('delete:products'), deleteProduct);

module.exports = router;
