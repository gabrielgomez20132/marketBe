const express = require('express');
const router = express.Router();
const {
    getSuperheros,
    getSuperheroById,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero
} = require('../controllers/superheroController');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Rutas públicas
//Verifricamos si el usuario tiene acceso y luego verificamos si tiene permisos
router.get('/', authenticateToken, hasPermission('read:superheros'), getSuperheros);
router.get('/:id', authenticateToken, hasPermission('read:superheros'), getSuperheroById);

// Rutas protegidas
router.post('/', authenticateToken, hasPermission('create:superheros'), createSuperhero);

router.put('/:id', authenticateToken,hasPermission('update:superheros'), updateSuperhero);

router.delete('/:id', authenticateToken, hasPermission('delete:superheros'), deleteSuperhero);

module.exports = router;