const authService = require('../services/authService');
const BlacklistedToken = require('../models/BlacklistedToken');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result); // Retorna { user, token }
    } catch (error) {
        console.error('Error en registro:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result); // Retorna { user, token }
    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(401).json({ message: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);

        if (!decoded?.exp) {
            return res.status(400).json({ message: 'Token inválido' });
        }

        await BlacklistedToken.create({
            token,
            expiresAt: new Date(decoded.exp * 1000)
        });

        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};
