require('dotenv').config(); 
const express = require('express'); 
const path = require('path'); 
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/database'); 
const logger = require('./config/logger'); 
const swaggerSpec = require('./config/swagger'); 
const routes = require('./routes'); 
const errorMiddleware = require('./middlewares/errorMiddleware'); 
const { NotFoundError } = require('./errors/customError'); 

const app = express(); 
const PORT = process.env.PORT || 8080; 

// Conexión a la Base de Datos (excepto en ejecución de tests) 
if (process.env.NODE_ENV !== 'test') { 
    connectDB(); 
} 

// Middlewares para lectura de JSON y Formularios 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Servidor estático para la carpeta de descargas/subidas 
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 

// Documentación interactiva con Swagger 
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

// Rutas de la API 
app.use('/api', routes); 

// Ruta no encontrada (404) 
app.use((req, res, next) => { 
    next(new NotFoundError(`Ruta no encontrada - ${req.originalUrl}`)); 
}); 

// Middleware Global de Manejo de Errores 
app.use(errorMiddleware); 

// Inicio del servidor HTTP 
let server; 
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => { 
        logger.info(`Servidor escuchando en http://localhost:${PORT}`); 
        logger.info(`Documentación Swagger lista en http://localhost:${PORT}/api/docs`);
    }); 
} 

// Manejo de errores no capturados 
process.on('unhandledRejection', (err) => { 
    logger.error(`UNHANDLED REJECTION: ${err.message}`);
}); 

process.on('uncaughtException', (err) => { 
    logger.error(`UNCAUGHT EXCEPTION: ${err.message}`); 
}); 

module.exports = app;