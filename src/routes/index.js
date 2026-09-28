const express = require('express'); 
const router = express.Router(); 

const shipmentRoutes = require('./shipmentRoutes'); 
const userRoutes = require('./userRoutes'); 
const mockRoutes = require('./mockRoutes'); 

// Health Check Endpoint 
router.get('/health', (req, res) => { 
    res.status(200).json({ 
        status: 'success', 
        message: 'ShipNow Backend API activa y funcionando', 
        timestamp: new Date(), 
    }); 
}); 

router.use('/shipments', shipmentRoutes); 
router.use('/users', userRoutes); 
router.use('/mocks', mockRoutes); 

module.exports = router;