class CustomError extends Error { 
    constructor(message, statusCode = 500, details = null) { 
        super(message); this.statusCode = statusCode; 
        this.details = details; 
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; 
        Error.captureStackTrace(this, this.constructor); 
        }} 

class NotFoundError extends CustomError { 
        constructor(message = 'Recurso no encontrado') { 
        super(message, 404);}} 
        
    
class BadRequestError extends CustomError { 
    constructor(message = 'Petición inválida', details = null) { 
    super(message, 400, details); } } 
    
class ValidationError extends CustomError { 
    constructor(message = 'Error de validación en los datos ingresados', details = null) { 
    super(message, 422, details); } } 
    
module.exports = { 
    CustomError, 
    NotFoundError, 
    BadRequestError, 
    ValidationError, 
};