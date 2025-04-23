const mongoose = require('mongoose');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
require('dotenv').config();
const connectDB = require('../config/database');

const initialPermissions = [
    // Productos
    { name: 'read:products', description: 'Puede ver productos' },
    { name: 'create:products', description: 'Puede crear productos' },
    { name: 'update:products', description: 'Puede actualizar productos' },
    { name: 'delete:products', description: 'Puede eliminar productos' },

    // Roles
    { name: 'read:roles', description: 'Puede ver roles' },

    // Usuarios
    { name: 'read:users', description: 'Puede ver usuarios' },
    { name: 'create:users', description: 'Puede crear usuarios' },
    { name: 'update:users', description: 'Puede actualizar usuarios' },
    { name: 'delete:users', description: 'Puede eliminar usuarios' }
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: [
            'read:products',
            'read:users',
            'update:users'  // Ahora el permiso para actualizar usuarios está en el rol 'user'
        ]
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: [
            'read:products', 
            'create:products', 
            'update:products'
        ]
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: [
            'read:products', 
            'create:products', 
            'update:products', 
            'delete:products',
            'read:roles',
            'read:users', 
            'create:users', 
            'delete:users'  // 'update:users' ha sido removido de 'admin'
        ]
    }
];

async function initializeRolesAndPermissions() {
    try {
        await connectDB();
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permission.deleteMany({});
        await Role.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permission.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map(role => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(permName => permissionsMap[permName])
        }));

        await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeRolesAndPermissions();



/* const mongoose = require('mongoose');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
require('dotenv').config();
const connectDB = require('../config/database');



const initialPermissions = [
    // Products
    { name: 'read:products', description: 'Puede ver productos' },
    { name: 'create:products', description: 'Puede crear productos' },
    { name: 'update:products', description: 'Puede actualizar productos' },
    { name: 'delete:products', description: 'Puede eliminar productos' },

    // Roles
    { name: 'read:roles', description: 'Puede ver roles' }
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:products']
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: [
            'read:products', 'create:products', 'update:products'
        ]
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: [
            'read:products', 'create:products', 'update:products', 'delete:products',
            'read:roles'
        ]
    }

];

async function initializeRolesAndPermissions() {
    try {
        await connectDB()
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permission.deleteMany({});
        await Role.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permission.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map(role => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(permName => permissionsMap[permName])
        }));

        await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeRolesAndPermissions(); */