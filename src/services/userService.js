const User = require('../models/User');

// Obtener todos los usuarios
const getUsers = async () => {
  try {
    const users = await User.find().populate('role');
    return users;
  } catch (error) {
    throw new Error('Error al obtener usuarios');
  }
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).populate('role');
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al obtener usuario');
  }
};

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    // Validar que el email no esté en uso
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      throw new Error('El Correo Electrónico ya está en uso');
    }

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message || 'Error al crear usuario');
  }
};

// Actualizar un usuario
const updateUser = async (id, userData) => {
  try {
    /* console.log(userData,id) */
    // Validar que el nuevo email no esté en uso por otro usuario
    if (userData.email) {
      const userWithEmail = await User.findOne({ email: userData.email });
      if (userWithEmail && userWithEmail._id.toString() !== id) {
        throw new Error('El Correo Electrónico ya está en uso por otro usuario');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true }).populate('role');
    if (!updatedUser) {
      throw new Error('Usuario no encontrado');
    }
    return updatedUser;
  } catch (error) {
    throw new Error('Error al actualizar el USUARIO: ' + error.message);
  }
};

// Eliminar un usuario
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('Usuario no encontrado');
    }
    return deletedUser;
  } catch (error) {
    throw new Error('Error al eliminar usuario');
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
