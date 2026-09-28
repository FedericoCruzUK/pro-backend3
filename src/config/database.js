require('dotenv').config(); 
const mongoose = require('mongoose'); 
const logger = require('./logger'); 

const connectDB = async () => { 
    try { 
        const mongoURI = 
        (process.env.NODE_ENV === 'test' 
        ? process.env.TEST_MONGO_URI 
        : process.env.MONGO_URI) || 'mongodb://localhost:27017/shipnow'; 
                
        await mongoose.connect(mongoURI); 
        logger.info(`Conexión exitosa a MongoDB (${process.env.NODE_ENV || 'development'})`); 
    } 
                
    catch (error) { 
        logger.error(`Error al conectar con MongoDB: ${error.message}`); 
        process.exit(1); 
    }       
};

module.exports = connectDB;