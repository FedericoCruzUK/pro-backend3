const userRepository = require('../repositories/userRepository'); 
const { NotFoundError, BadRequestError } = require('../errors/customError'); 

class UserService { 
    async createUser(userData) {
        const existing = await userRepository.findByEmail(userData.email); 
        if (existing) { 
            throw new BadRequestError('Ya existe un usuario registrado con ese email'); 
        } 
        return await userRepository.create(userData); 
    } 

    async getAllUsers() { 
        return await userRepository.findAll(); 
    } 

    async getUserById(id) { 
        const user = await userRepository.findById(id); 
        if (!user) { 
            throw new NotFoundError(`No se encontró el usuario con ID: ${id}`); 
        } 
        return user; 
    }
} 

module.exports = new UserService();