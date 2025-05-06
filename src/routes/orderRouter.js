const express = require('express');
const router = express.Router();

const { createOrder, getUserOrders } = require('../controllers/orderController');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Proteger las rutas con authenticateToken
router.post('/', authenticateToken, createOrder);
//router.get('/', authenticateToken, getUserOrders); // si querés listar las órdenes del usuario

// Obtener órdenes por ID de usuario /orders/user/id
router.get('/user/:id', authenticateToken, getUserOrders);

module.exports = router;