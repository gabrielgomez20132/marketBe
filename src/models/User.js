const mongoose = require('mongoose');
const Role = require('./Role');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nombre: String,
    apellido: String,
    dni: String,
    direccion: String,
    codigo_postal: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;