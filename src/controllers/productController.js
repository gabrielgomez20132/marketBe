const productService = require('../services/productService');

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        res.json({ message: 'Producto eliminado', product: deletedProduct });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
