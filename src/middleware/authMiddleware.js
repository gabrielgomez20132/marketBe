const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const BlacklistedToken = require('../models/BlacklistedToken');

// Middleware para verificar el token de autenticación y la lista negra
exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// Middleware para verificar si el usuario tiene el permiso necesario
exports.hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' });
      }

      const user = await User.findById(req.user.id)
        .populate({
          path: 'role',
          populate: {
            path: 'permissions'
          }
        });

      if (!user || !user.role || !user.role.permissions) {
        return res.status(403).json({ message: 'Permisos no disponibles' });
      }

      const hasPermission = user.role.permissions.some(
        (permission) => permission.name === requiredPermission
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      next();
    } catch (error) {
      console.error('Error en hasPermission:', error);
      return res.status(500).json({ message: 'Error al verificar permisos' });
    }
  };
};

// Middleware para manejar el logout
exports.logout = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    await BlacklistedToken.create({ token });
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al procesar el logout' });
  }
};



/* 
//Creamos el middleware

const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');

const jwt = require('jsonwebtoken');

// Middleware para verificar el token de autenticación
exports.authenticateToken = (req, res, next) => {

    // Obtenemos el header de autorización
    const authHeader = req.headers['authorization'];
    // Extraemos el token del header (formato: "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];

      // Si no hay token, devolvemos error 401 (No autorizado)
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Guardamos la información del usuario decodificada en el objeto request
        req.user = decoded;
        // Continuamos con la siguiente función middleware
        next();
    } catch (error) {
        // Si el token es inválido, devolvemos error 403 (Prohibido)
        return res.status(403).json({ message: 'Token inválido' });
    }
  
};



exports.hasPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'No autenticado' });
            }

            // Obtener usuario con rol y permisos populados
            const user = await User.findById(req.user.id)
                .populate({
                    path: 'role',
                    populate: {
                        path: 'permissions'
                    }
                });
                

            const hasPermission = user.role.permissions.some(
                permission => permission.name === requiredPermission
            );

            if (!hasPermission) {
                return res.status(403).json({ 
                    message: 'No tienes permiso para realizar esta acción' 
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};


//logout
exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    // Verificamos si el token está en la base de datos
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }; */