// src/controllers/roleController.js
const roleService = require('../services/roleService');

const getRolesWithPermissions = async (req, res) => {
    try {
        const roles = await roleService.getAllRolesWithPermissions();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles con permisos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getRolesWithPermissions
};