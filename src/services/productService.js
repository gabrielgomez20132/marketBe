const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Error al obtener productos', error);
    }
};

// Obtener un producto por ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    } catch (error) {
        throw new Error('Error al obtener producto', error);
    }
};

// Crear un nuevo producto
const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        throw new Error('Error al crear producto', error);
    }
};

// Actualizar un producto
const updateProduct = async (id, productData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            throw new Error('Producto no encontrado');
        }
        return updatedProduct;
    } catch (error) {
        throw new Error('Error al actualizar producto', error);
    }
};

// Eliminar un producto
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error('Producto no encontrado');
        }
        return deletedProduct;
    } catch (error) {
        throw new Error('Error al eliminar producto', error);
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
