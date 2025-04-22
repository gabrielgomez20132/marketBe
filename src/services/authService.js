const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {

    // Método para registrar un nuevo usuario
    async register(userData) {
        const existingUser = await User.findOne({ 
            $or: [
                { email: userData.email },
                { username: userData.username }
            ]
        });

        if (existingUser) {
            throw new Error('Usuario o email ya existe');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const defaultRole = await Role.findOne({ name: 'user' });

        if (!defaultRole) {
            throw new Error('Rol por defecto no encontrado');
        }

        const user = new User({
            ...userData,
            password: hashedPassword,
            role: defaultRole._id
        });

        await user.save();

        // Volvemos a buscar al usuario, esta vez con .populate('role')
        const populatedUser = await User.findById(user._id).populate('role', 'name');

        const userResponse = populatedUser.toObject();
        delete userResponse.password;

        const token = this.generateToken(user); // nota: usamos el original para que el token lleve solo el ID del rol
        return { user: userResponse, token };
    }

    // Método para iniciar sesión
    async login(email, password) {
        const user = await User.findOne({ email }).populate('role', 'name');
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Correo o contraseña incorrectos');
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        const token = this.generateToken(user); // usamos el mismo user original, que tiene role como ID
        return { user: userResponse, token };
    }

    // Método auxiliar para generar tokens JWT
    generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                role: user.role._id ?? user.role // en caso que venga populado, usamos solo el _id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }
}

module.exports = new AuthService();
