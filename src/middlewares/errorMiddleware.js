const logger = require('../config/logger'); 

const errorMiddleware = (err, req, res, next) => { 
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Error interno del servidor'; 
    
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - IP: ${req.ip}`); 
        if (err.stack) { 
            logger.error(err.stack); 
        } 
        
        res.status(statusCode).json({ 
            status: err.status || 'error', 
            statusCode, 
            message, 
            ...(err.details && { details: err.details }), 
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), 
        }); 
    }; 

module.exports = errorMiddleware;