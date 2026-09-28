const shipmentRepository = require('../repositories/shipmentRepository'); 
const userRepository = require('../repositories/userRepository'); 
const { NotFoundError, BadRequestError } = require('../errors/customError'); 
const { SHIPMENT_STATUS } = require('../constants/shipmentConstants'); 

class ShipmentService { 
    generateTrackingNumber() { 
        const randomPart = Math.floor(100000 + Math.random() * 900000); 
        return `SHIP-${Date.now().toString().slice(-4)}-${randomPart}`; 
    } 
    
    async createShipment(shipmentData) { 
        if (shipmentData.user) { 
            const userExists = await userRepository.findById(shipmentData.user); 
            if (!userExists) { 
                throw new BadRequestError('El usuario asociado no existe'); 
            } 
        } 
            
        if (!shipmentData.trackingNumber) { 
            shipmentData.trackingNumber = this.generateTrackingNumber(); 
        } 
            
        else { 
            const existing = await shipmentRepository.findByTrackingNumber(shipmentData.trackingNumber); 
            if (existing) {
                throw new BadRequestError('El número de seguimiento ya se encuentra registrado'); 
            } 
        } 
        
        return await shipmentRepository.create(shipmentData); 
    } 
        
    async getAllShipments(query = {}) { 
        const { status, sender, recipient, page = 1, limit = 10 } = query; 
        const filter = {}; 
        
        if (status) filter.status = status;
        if (sender) filter.sender = new RegExp(sender, 'i'); 
        if (recipient) filter.recipient = new RegExp(recipient, 'i');

        const skip = (parseInt(page) - 1) * parseInt(limit); 
        const shipments = await shipmentRepository.findAll(filter, {
            limit: parseInt(limit), 
            skip, 
        }
    ); 
    
    const total = await shipmentRepository.count(filter); 
    
    return { 
        total, 
        page: parseInt(page), 
        totalPages: Math.ceil(total / parseInt(limit)), 
        data: shipments, }; 
    } 
    
    async getShipmentById(id) { 
        const shipment = await shipmentRepository.findById(id); 
        if (!shipment) { 
            throw new NotFoundError(`No se encontró el envío con ID: ${id}`); 
        }           
        return shipment; 
    } 
    
    async getShipmentByTracking(trackingNumber) { 
        const shipment = await shipmentRepository.findByTrackingNumber(trackingNumber); 
        if (!shipment) { 
            throw new NotFoundError(`No se encontró el envío con el número de tracking: ${trackingNumber}`); 
        } 
        return shipment; 
    } 
    
    async updateShipment(id, updateData) { 
        await this.getShipmentById(id); 

        if (updateData.status && !Object.values(SHIPMENT_STATUS).includes(updateData.status)) { 
            throw new BadRequestError(`Estado no válido. Los estados permitidos son: ${Object.values(SHIPMENT_STATUS).join(', ')}`); 
        } 
        return await shipmentRepository.update(id, updateData); 
    } 
    
    async attachProofOfDelivery(id, file) { 
        if (!file) { throw new BadRequestError('Debe adjuntar un archivo válido como comprobante');} 
    
        const shipment = await this.getShipmentById(id);

        const proofData = { 
            filename: file.filename, 
            path: file.path, 
            mimetype: file.mimetype, 
            size: file.size, 
            uploadedAt: new Date(), 
        }; 
    
        return await shipmentRepository.update(shipment._id, { 
            proofOfDelivery: proofData, 
            status: SHIPMENT_STATUS.DELIVERED, 
        }); 
    } 

    async deleteShipment(id) { 
        await this.getShipmentById(id); 
        return await shipmentRepository.delete(id); 
    } 
}

module.exports = new ShipmentService();