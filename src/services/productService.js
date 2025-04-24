const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtener todos los productos con paginación opcional
const getProducts = async ({ skip = 0, limit = 10 } = {}) => {
    try {
        const products = await Product.find()
            .populate('category')
            .skip(skip)
            .limit(limit);
        return products;
    } catch (error) {
        throw new Error('Error al obtener productos: ' + error.message);
    }
};

// Contar productos para paginación
const countProducts = async () => {
    try {
        return await Product.countDocuments();
    } catch (error) {
        throw new Error('Error al contar productos: ' + error.message);
    }
};

// Obtener un producto por ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id).populate('category');
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    } catch (error) {
        throw new Error('Error al obtener producto: ' + error.message);
    }
};

// Crear un nuevo producto
const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        throw new Error('Error al crear producto: ' + error.message);
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
        throw new Error('Error al actualizar producto: ' + error.message);
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
        throw new Error('Error al eliminar producto: ' + error.message);
    }
};

module.exports = {
    getProducts,
    countProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};