// src/services/roleService.js
const Role = require('../models/Role');

const getAllRolesWithPermissions = async () => {
    return await Role.find().populate('permissions');
};

module.exports = {
    getAllRolesWithPermissions
};
