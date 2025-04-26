// Enviar respuesta estándar
const sendResponse = (res, status = 200, message = '', data = null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
};

// Manejo básico de errores de Mongoose y otros
const handleMongooseError = (error) => {
    let status = 500;
    let message = 'Error del servidor';
    let data = null;

    if (error.name === 'ValidationError') {
        // Error de validación, retornamos un 400 con detalles de los errores
        status = 400;
        message = 'Error de validación';
        // Accedemos a los errores de Mongoose y extraemos los mensajes
        data = Object.values(error.errors).map(e => e.message);
    } else if (error.name === 'CastError') {
        // Error cuando el formato del ID es inválido
        status = 400;
        message = 'ID inválido';
    } else if (error.message && error.message.includes('no encontrado')) {
        // Error cuando no se encuentra un documento
        status = 404;
        message = error.message;
    } else if (error.code === 11000) {
        // Error por clave duplicada
        status = 409;
        message = 'Duplicado: ya existe un registro con esos datos';
    } else if (error.message) {
        // Otros errores generales
        message = error.message;
    }

    return { status, message, data };
};

module.exports = {
    sendResponse,
    handleMongooseError
};