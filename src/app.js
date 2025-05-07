require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');




// Cargar modelos
require('./models/Permission');
require('./models/Role');
require('./models/User');
require('./models/Product');
require('./models/Category');
const app = express();

// Configuración de CORS más segura y específica
//Intercambio de recursos de origen cruzado

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400 // 24 horas en segundos
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

//Endpoint de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando' });
});

// Iniciar conexión a MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`🌍 Accede en: http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
     console.log('Error no manejado:', err);
    process.exit(1);
});