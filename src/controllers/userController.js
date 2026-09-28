const userService = require('../services/userService'); 

class UserController { 
    async create(req, res, next) { 
        try {
            const user = await userService.createUser(req.body); 
            res.status(201).json({ 
                status: 'success', 
                data: user, 
            }); 
        } 
    
        catch (error) { 
            next(error); 
        } 
    } 

    async getAll(req, res, next) { 
        try { 
            const users = await userService.getAllUsers(); 
            res.status(200).json({ 
                status: 'success', 
                data: users, 
            }); 
        } 
    
        catch (error) { 
            next(error); 
        } 
    } 

    async getById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id); 
            res.status(200).json({ 
                status: 'success', 
                data: user, 
            }); 
        } 
    
        catch (error) { 
            next(error); 
        } 
    }
}

module.exports = new UserController();