const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,        // Elimina espacios en blanco
    lowercase: true    // Normaliza el nombre en minúsculas
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(v);
      },
      message: props => `${props.value} no es una URL válida de imagen.`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);