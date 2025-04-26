const categoryService = require('../services/categoryService');

// Obtener todos los usuarios
const getAllCategory = async (req, res) => {
    try {
        const categorias = await categoryService.getCategories();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllCategory };