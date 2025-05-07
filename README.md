# API RESTful MarketApp ( e-commerce)

## Descripción
Esta API RESTful desarrollada con Node.js y Express permite gestionar un sistema de superhéroes y sus creadores. Implementa una arquitectura en capas (controladores, servicios, modelos) con operaciones CRUD completas, autenticación JWT, validación de datos, paginación y un sistema de logging robusto.Roles y permisos asociados a dos tipos de usuarios (admin y user)

## Funcionalidades Principales

### 1. Autenticación
- Registro de usuarios
- Login con JWT
- Protección de rutas sensibles

### 2. Módulo de ABMC (Alta, Baja, Modificación, Consulta)
- Visualización de productos con detalles como ID, descripción, precio y stock.
- Acciones de gestión de productos como **Editar**, **Eliminar** y **Nuevo** (comentadas para ser implementadas).
- Autenticación basada en JWT para proteger el acceso a ciertas funciones.
- Realizar compras con un descuento especifico.
- Categorias
- Ordenes de compras(checkout)
- Api externa de mercadolibre para Top 20 de productos categoria celulares

### 3. Características Técnicas
- Arquitectura en capas (Controladores, Servicios, Modelos)
- Sistema de logging detallado
- Validación de datos de entrada
- Manejo centralizado de errores
- Paginación en listados

## Tecnologías Utilizadas
- **Node.js & Express:** Framework backend
- **MongoDB & Mongoose:** Base de datos y ORM
- **JWT:** Autenticación y autorización
- **Express-validator:** Validación de datos
- **Winston:** Sistema de logging
- **Bcryptjs:** Encriptación de contraseñas
- **Cors:** Manejo de CORS
- **Dotenv:** Manejo de variables de entorno

## Estructura del Proyecto

marketBe/
│
├── controllers/ # Lógica de negocio
├── models/ # Esquemas de Mongoose
├── routes/ # Definición de rutas de la API
├── middleware/ # Middlewares (ej: autenticación)
├── uploads/ # Imágenes subidas por usuarios
├── .env # Variables de entorno
├── app.js # Configuración de Express
└── server.js # Inicio del servidor


## Ejemplos de Uso

### Registro de Usuario

bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "adminUser",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
}'


## Configuración del Proyecto

### 1. Clonar el repositorio

git clone https://github.com/gabrielgomez20132/marketBe.git
cd marketBe
npm install

### 2. Instalar dependencias

bash
npm install


### 3. Configurar variables de entorno
Crear archivo `.env`:

plaintext
MONGODB_URI=mongodb://localhost:27017/superhero-api
PORT=3000
JWT_SECRET=tu_secreto_jwt_aqui

### 4. Iniciar el servidor

bash
npm start
