const Category = require('../models/Category');

// Obtener todas las categorias
const getCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw new Error('Error al obtener las Categorias');
    }
};

module.exports = { getCategories };