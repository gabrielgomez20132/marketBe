const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,  // Precio con descuento
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
    image: {
        type: String,  // URL de la imagen
    },
    brand: {
        type: String,  // Marca del producto
        required: false
    },
    isActive: {
        type: Boolean,  // Producto disponible o descontinuado
        default: true
    },
    rating: {
        type: Number,  // Calificación promedio del producto
        min: 0,
        max: 5,
        default: 0
    },
    tags: {
        type: [String],  // Etiquetas asociadas al producto
        required: false
    },
    sku: {
        type: String,  // Identificador único del producto en el inventario
        unique: true,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
