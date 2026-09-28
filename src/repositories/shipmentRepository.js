const Shipment = require('../models/Shipment'); 

class ShipmentRepository { 
    async create(shipmentData) { 
        return await Shipment.create(shipmentData); 
    } 
    
    async findAll(filter = {}, options = {}) { 
        const { limit = 10, skip = 0, sort = { createdAt: -1 } } = options; 
        return await Shipment.find(filter) 
        .populate('user', 'name email role') 
        .sort(sort) 
        .limit(limit) 
        .skip(skip); 
    } 
        
    async findById(id) { 
        return await Shipment.findById(id).populate('user', 'name email role'); 
    } 
        
    async findByTrackingNumber(trackingNumber) { 
        return await Shipment.findOne({ trackingNumber }).populate('user', 'name email role'); 
    } 
        
    async update(id, updateData) { 
        return await Shipment.findByIdAndUpdate(id, updateData, { 
            new: true, 
            runValidators: true, 
        }).populate('user', 'name email role'); 
    } 
        
    async delete(id) { 
        return await Shipment.findByIdAndDelete(id); 
    } 
        
    async count(filter = {}) { 
        return await Shipment.countDocuments(filter); 
    } 
} 
    
module.exports = new ShipmentRepository();