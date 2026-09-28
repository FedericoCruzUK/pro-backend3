const shipmentService = require('../services/shipmentService'); 

class ShipmentController { 
    async create(req, res, next) { 
        try {const shipment = await shipmentService.createShipment(req.body); 
            res.status(201).json({ 
                status: 'success', 
                data: shipment, 
            }); 
        }
        
        catch (error) {
            next(error); 
        } 
    } 
    
    async getAll(req, res, next) { 
        try {const result = await shipmentService.getAllShipments(req.query);
            res.status(200).json({ 
                status: 'success',
                ...result, 
            }); 
        }

        catch (error) {
            next(error); 
        } 
    } 
    
    async getById(req, res, next) { 
        try { 
            const shipment = await shipmentService.getShipmentById(req.params.id); 
            res.status(200).json({ 
                status: 'success', 
                data: shipment, 
            }); 
        } 
        
        catch (error) { 
            next(error); 
        } 
    } 
    
    async getByTracking(req, res, next) { 
        try { 
            const shipment = await shipmentService.getShipmentByTracking(req.params.trackingNumber); 
            res.status(200).json({ 
                status: 'success', 
                data: shipment, 
            }); 
        } 
        
        catch (error) { 
            next(error); 
        } 
    } 
    
    async update(req, res, next) { 
        try { 
            const updatedShipment = await shipmentService.updateShipment(req.params.id, req.body); 
            res.status(200).json({ 
                status: 'success', 
                data: updatedShipment, 
            }); 
        } 
        
        catch (error) { 
            next(error); 
        } 
    } 
    
    async uploadProof(req, res, next) { 
        try { 
            const updatedShipment = await shipmentService.attachProofOfDelivery(req.params.id, req.file); 
            res.status(200).json({ 
                status: 'success', 
                message: 'Comprobante cargado exitosamente', 
                data: updatedShipment, 
            }); 
        } 
        
        catch (error) { 
            next(error); 
        } 
    } 
    
    async delete(req, res, next) { 
        try { await shipmentService.deleteShipment(req.params.id); 
            res.status(200).json({ 
                status: 'success', 
                message: 'Envío eliminado correctamente', 
            }); 
        } 
        
        catch (error) { 
            next(error); 
        } 
    } 
} 

module.exports = new ShipmentController();