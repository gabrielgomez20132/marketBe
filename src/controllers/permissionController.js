const Permission = require('../models/Permission'); // Asegúrate de que el modelo de permisos esté correctamente importado

// Obtener todos los permisos
const getPermissions = async (req, res) => {
    try {
        const permisos = await Permission.find();  // Asegúrate de que el modelo esté configurado correctamente
        if (!permisos || permisos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron permisos' });
        }
        res.status(200).json(permisos);
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error al obtener los permisos' });
    }
};

module.exports = { getPermissions };