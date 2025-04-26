const productService = require('../services/productService');
const paginate = require('../helpers/pagination');
const { sendResponse, handleMongooseError } = require('../helpers/responseHelper');

// Obtener todos los productos con paginación
const getProducts = async (req, res) => {
    try {
        const paginatedResult = await paginate(
            req,
            productService.getProducts,        // Función para obtener productos paginados
            productService.countProducts       // Función para contar productos totales
        );

        sendResponse(res, 200, 'Productos obtenidos correctamente', paginatedResult);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        sendResponse(res, 200, 'Producto obtenido correctamente', product);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        /* console.log(req.body); */
        const product = await productService.createProduct(req.body);
        sendResponse(res, 201, 'Producto creado correctamente', product);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        sendResponse(res, 200, 'Producto actualizado correctamente', updatedProduct);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        sendResponse(res, 200, 'Producto eliminado correctamente', deletedProduct);
    } catch (error) {
        const err = handleMongooseError(error);
        sendResponse(res, err.status, err.message, err.data);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
