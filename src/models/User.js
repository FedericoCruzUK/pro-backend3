const mongoose = require('mongoose'); 
const { USER_ROLES } = require('../constants/shipmentConstants'); 

const userSchema = new mongoose.Schema( 
    { 
        name: { 
            type: String, 
            required: [true, 'El nombre es obligatorio'], 
            trim: true, 
        }, 
        
        email: { 
            type: String, 
            required: [true, 'El email es obligatorio'], 
            unique: true, 
            lowercase: true, 
            trim: true, 
        }, 
        
        role: { 
            type: String, 
            enum: Object.values(USER_ROLES), 
            default: USER_ROLES.CLIENT, 
        }, 
    }, 
    
    { 
        timestamps: true, 
    } 
); 

module.exports = mongoose.model('User', userSchema);