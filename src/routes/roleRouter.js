const express = require('express');
const router = express.Router();

const { getRolesWithPermissions, createRole, updateRole, deleteRole, addPermissionToRole } = require('../controllers/roleController');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// Obtener todos los roles con sus permisos
router.get('/', authenticateToken, hasPermission('read:roles'), getRolesWithPermissions);
router.post('/', authenticateToken, hasPermission('read:roles'), createRole);
router.put('/:id', authenticateToken, hasPermission('read:roles'), updateRole);
router.delete('/:id', authenticateToken, hasPermission('read:roles'), deleteRole);

router.put('/:id/add-permission', addPermissionToRole);

module.exports = router;