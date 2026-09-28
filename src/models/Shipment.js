const mongoose = require('mongoose'); 
const { SHIPMENT_STATUS } = require('../constants/shipmentConstants'); 

const shipmentSchema = new mongoose.Schema
( 
    { 
        trackingNumber: { 
            type: String, 
            required: [true, 'El número de seguimiento es obligatorio'], 
            unique: true, 
            trim: true, 
        }, 
    
        sender: { 
            type: String, 
            required: [true, 'El remitente es obligatorio'], 
            trim: true, 
        }, 

        recipient: {
            type: String, 
            required: [true, 'El destinatario es obligatorio'], 
            trim: true, 
        }, 
    
        destinationAddress: { 
            type: String, 
            required: [true, 'La dirección de destino es obligatoria'], 
            trim: true, 
        }, 
    
        weight: { 
            type: Number, 
            required: [true, 'El peso del paquete es obligatorio'], 
            min: [0.1, 'El peso debe ser mayor a 0'], 
        }, 
    
        status: { 
            type: String, 
            enum: Object.values(SHIPMENT_STATUS), 
            default: SHIPMENT_STATUS.PENDING, 
        }, 
    
        proofOfDelivery: { 
            filename: String, 
            path: String, 
            mimetype: String, 
            size: Number, 
            uploadedAt: Date, 
        }, 
    
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: false, 
        }, 
    },

    {  
        timestamps: true, 
    } 
);
    
module.exports = mongoose.model('Shipment', shipmentSchema);