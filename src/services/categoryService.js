const Category = require('../models/Category');

// Alta de una nueva categoría
const createCategory = async (categoryData) => {
    try {
        const newCategory = new Category(categoryData);
        await newCategory.save(); 
        return newCategory; 
    } catch (error) {
        throw new Error('Error al crear la categoría');
    }
};


// Obtener todas las categorias que esten activas
const getCategories = async () => {
    try {
        const categories = await Category.find({ isActive: true });
        return categories;
    } catch (error) {
        throw new Error('Error al obtener las Categorías');
    }
};

// Desactivar (eliminar) una categoría por su ID, cambiando isActive a false
const deleteCategoryById = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error('Categoría no encontrada');
    }

    category.isActive = false; 
    await category.save();

    return category; 
};


const updateCategory = async (id, updatedData) => {
    try {
        // Buscar la categoría por su ID
        const category = await Category.findById(id);

        if (!category) {
            throw new Error('Categoría no encontrada');
        }

        // Actualizar los campos de la categoría
        category.name = updatedData.name || category.name;
        category.description = updatedData.description || category.description;
        category.isActive = updatedData.isActive !== undefined ? updatedData.isActive : category.isActive;

        // Guardar los cambios
        await category.save();

        return category;
    } catch (error) {
        throw new Error('Error al actualizar la categoría');
    }
};

// Función para obtener categoría por ID
const getCategoryById = async (id) => {
    try {
      // Buscamos la categoría en la base de datos por su ID
      const category = await Category.findById(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw error;
    }
  };

module.exports = { getCategories, deleteCategoryById , createCategory, updateCategory, getCategoryById};