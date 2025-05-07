const express = require('express');
const router = express.Router();
const { getPermissions } = require('../controllers/permissionController'); // Verifica que la ruta sea correcta

// Ruta para obtener todos los permisos
router.get('/', getPermissions);

module.exports = router;