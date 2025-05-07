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

// Eliminar una categoría
const deleteCategory = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría de los parámetros
    try {
        const deletedCategory = await categoryService.deleteCategoryById(id);
        res.status(200).json({
            message: 'Categoría eliminada con éxito',
            category: deletedCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    const { name, description, image } = req.body; // Obtener los datos del body de la solicitud

    // Validar los datos
    if (!name || !description) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        const newCategory = await categoryService.createCategory({ name, description, image, isActive: true });
        res.status(201).json({
            message: 'Categoría creada con éxito',
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría de los parámetros
    const { name, description, image, isActive } = req.body; // Obtener los datos del body

    // Validar los datos
    if (!name || !description) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        const updatedCategory = await categoryService.updateCategory(id, { name, description, image, isActive });
        res.status(200).json({
            message: 'Categoría actualizada con éxito',
            category: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Llamamos al servicio para obtener la categoría
      const category = await categoryService.getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


module.exports = { getAllCategory, deleteCategory , createCategory, updateCategory, getCategoryById };