const express = require('express');
const router = express.Router();

const { getRolesWithPermissions } = require('../controllers/roleController');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Obtener todos los roles con sus permisos
router.get('/', authenticateToken, hasPermission('read:roles'), getRolesWithPermissions);

module.exports = router;