const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Rutas públicas (podés protegerlas descomentando los middlewares)
router.get('/', /* authenticateToken, hasPermission('read:users'), */ getAllUsers);
router.get('/:id', /* authenticateToken, hasPermission('read:users'), */ getUserById);

// Rutas protegidas
router.post('/', authenticateToken, hasPermission('create:users'), createUser);
router.put('/:id', authenticateToken, hasPermission('update:users'), updateUser);
router.delete('/:id', authenticateToken, hasPermission('delete:users'), deleteUser);

module.exports = router;
