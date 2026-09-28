const mockService = require('../services/mockService'); 

class MockController {
    async generate(req, res, next) {
        try {
            const qty = req.query.qty ? parseInt(req.query.qty) : 10; 
            const result = await mockService.generateMocks(qty); 
            res.status(201).json({ 
                status: 'success', 
                ...result, 
            }); 
        }
        
        catch (error) { 
            next(error); 
        } 
    } 
} 

module.exports = new MockController();