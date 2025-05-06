const userService = require('../services/userService');
const { sendResponse, handleMongooseError } = require('../helpers/responseHelper');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {

        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return sendResponse(res, 404, 'Usuario no encontrado');
        }
        sendResponse(res, 200, 'Usuario actualizado correctamente', updatedUser);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
