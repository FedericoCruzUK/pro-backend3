const User = require('../models/User'); 

class UserRepository { 
    async create(userData) { 
        return await User.create(userData); 
    } 
    
    async findAll() { 
        return await User.find();
    } 
    
    async findById(id) { 
        return await User.findById(id); 
    } 
    
    async findByEmail(email) { 
        return await User.findOne({ email }); 
    } 
} 

module.exports = new UserRepository();