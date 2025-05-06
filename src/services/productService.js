const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtener todos los productos con paginación opcional
const getProducts = async ({ skip = 0, limit = 10, search = ''} = {}) => {
    try {
        let query = {};

        if (search) {
            const regex = new RegExp(search, 'i'); // Insensible a mayúsculas/minúsculas
            query = {
                $or: [
                    { name: { $regex: regex } },
                    { brand: { $regex: regex } },
                    { sku: { $regex: regex } }
                ]
            };
        }

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
const countProducts = async (filters) => {
    try {
        let query = {};

        // Si existe un filtro de búsqueda, construimos una consulta de búsqueda
        if (filters.search) {
            const regex = new RegExp(filters.search, 'i');
            query = {
                $or: [
                    { name: { $regex: regex } },
                    { brand: { $regex: regex } },
                    { sku: { $regex: regex } }
                ]
            };
        }

        // Contamos los documentos que coincidan con la consulta
        return await Product.countDocuments(query);
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
        //Validar si ya existe un producto con el mismo name
        const existingProductByName = await Product.findOne({ name: productData.name });
        if (existingProductByName) {
            throw new Error(`El nombre del producto "${productData.name}" ya está en uso.`);
        }

        // Validar si ya existe un producto con el mismo SKU
        const existingProductBySku = await Product.findOne({ sku: productData.sku });
        if (existingProductBySku) {
            throw new Error(`El SKU "${productData.sku}" ya está en uso.`);
        }

        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        // Lanza el error para que el frontend lo maneje
        throw new Error('Error al crear producto: ' + error.message);
    }
};

// Actualizar un producto
const updateProduct = async (id, productData) => {
    try {
        // Validar si ya existe un producto con el mismo nombre, pero que no sea el actual producto
        const existingProductByName = await Product.findOne({ name: productData.name, _id: { $ne: id } });
        if (existingProductByName) {
            throw new Error(`El nombre del producto "${productData.name}" ya está en uso.`);
        }

        // Validar si ya existe un producto con el mismo SKU, pero que no sea el actual producto
        const existingProductBySku = await Product.findOne({ sku: productData.sku, _id: { $ne: id } });
        if (existingProductBySku) {
            throw new Error(`El SKU "${productData.sku}" ya está en uso.`);
        }

        // Actualizar el producto
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