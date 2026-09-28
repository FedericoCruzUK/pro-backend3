const swaggerJSDoc = require('swagger-jsdoc'); 
const path = require('path'); 

// Normalizamos las barras de Windows (\\ -&gt; /) para que glob reconozca la carpeta 
const routesPath = path.join(__dirname, '../routes/\*.js').replace(/\\\\/g, '/'); 

const options = { 
    definition: { 
        openapi: '3.0.0', 
        info: { 
            title: 'ShipNow Backend API', 
            version: '1.0.0', 
            description: 'API RESTful profesional para la gestión e integración de envíos y logística de ShipNow.', 
        }, 
        
        servers: [ { 
            url: 'http://localhost:8080/api', 
            description: 'Servidor de Desarrollo', 
        }, ], 
        
        components: { 
            schemas: { 
                Shipment: { 
                    type: 'object', 
                    properties: { 
                        _id: { 
                            type: 'string', 
                            example: '650f1a2b3c4d5e6f7a8b9c0d' }, 
                            trackingNumber: { type: 'string', example: 'SHIP-1234-56789' }, 
                            sender: { type: 'string', example: 'Empresa A' }, 
                            recipient: { type: 'string', example: 'Juan Pérez' }, 
                            destinationAddress: { type: 'string', example: 'Av. Corrientes 1234, CABA' }, 
                            weight: { type: 'number', example: 2.5 }, 
                            status: { type: 'string', enum: ['PENDING', 'IN\_TRANSIT', 'DELIVERED', 'CANCELLED'], example: 'PENDING' }, 
                        }, 
                    }, 
                    
                    User: { 
                        type: 'object', 
                        properties: {
                            _id: { type: 'string', example: '650f1a2b3c4d5e6f7a8b9c0e' }, 
                            name: { type: 'string', example: 'Laura Gómez' }, 
                            email: { type: 'string', example: 'laura@example.com' }, 
                            role: { type: 'string', enum: ['ADMIN', 'CLIENT', 'DRIVER'], example: 'CLIENT' }, 
                        }, 
                    }, 
                    
                    ErrorResponse: { 
                        type: 'object', 
                        properties: { 
                            status: { type: 'string', example: 'fail' }, 
                            statusCode: { type: 'number', example: 404 }, 
                            message: { type: 'string', example: 'Recurso no encontrado' }, 
                        }, 
                    }, 
                }, 
            }, 
        }, 

        apis: [routesPath, './src/routes/\*.js'], 
    }; 
    
    const swaggerSpec = swaggerJSDoc(options); 
    module.exports = swaggerSpec;