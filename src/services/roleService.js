// src/services/roleService.js
const Role = require('../models/Role');

const getAllRolesWithPermissions = async () => {
    return await Role.find().populate('permissions');
};

const createRole = async ({ name, description, permissions }) => {
    const newRole = new Role({ name, description, permissions });
    return await newRole.save();
};

const updateRole = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, { new: true }).populate('permissions');
};

const deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};

const addPermissionToRole = async (roleId, permissionId) => {
    return await Role.findByIdAndUpdate(
        roleId,
        { $addToSet: { permissions: permissionId } }, // No duplica
        { new: true }
    ).populate('permissions');
};

module.exports = {
    getAllRolesWithPermissions,
    createRole,
    updateRole,
    deleteRole,
    addPermissionToRole
};