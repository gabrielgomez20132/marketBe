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


// POST - Crear nuevo rol
const createRole = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        // Validación opcional (puedes extenderla si querés)
        if (!name || !Array.isArray(permissions)) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const newRole = await roleService.createRole({ name, description, permissions });
        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error al crear rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// PUT - Modificar rol
const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const updatedData = req.body;
        const updatedRole = await roleService.updateRole(roleId, updatedData);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(updatedRole);
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ message: 'Error al actualizar el rol' });
    }
};

// DELETE - Eliminar rol
const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const deletedRole = await roleService.deleteRole(roleId);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        res.status(500).json({ message: 'Error al eliminar el rol' });
    }
};

const addPermissionToRole = async (req, res) => {
    try {
        const { permissionId } = req.body;
        const roleId = req.params.id;

        const updatedRole = await roleService.addPermissionToRole(roleId, permissionId);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json(updatedRole);
    } catch (error) {
        console.error('Error al agregar permiso al rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getRolesWithPermissions,
    createRole,
    updateRole,
    deleteRole,
    addPermissionToRole
};