const Shipment = require('../models/Shipment'); 
const User = require('../models/User'); 

class MockService { 
    async generateMocks(quantity = 10) { 
        // Importación dinámica de Faker compatible con ESM y CommonJS 
        const { faker } = await import('@faker-js/faker'); 
        
        const createdUsers = []; 
        const createdShipments = [];

        const qty = parseInt(quantity, 10) || 10; 
        
        for (let i = 0; i < qty; i++) { 
            // Crear usuario mock 
            const user = await User.create({ 
                name: faker.person.fullName(), 
                email: faker.internet.email().toLowerCase(), 
                role: faker.helpers.arrayElement(['ADMIN', 'CLIENT', 'DRIVER']), 
            }); createdUsers.push(user); 

            // Crear envío mock 
            const shipment = await Shipment.create({ 
                trackingNumber: `SHIP-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`, 
                sender: faker.company.name(), 
                recipient: faker.person.fullName(), 
                destinationAddress: faker.location.streetAddress({ useFullAddress: true }), 
                weight: parseFloat((Math.random() * 10 + 0.5).toFixed(2)), 
                status: faker.helpers.arrayElement(['PENDING', 'IN\_TRANSIT', 'DELIVERED', 'CANCELLED']), 
            }); createdShipments.push(shipment); 
        } 
        
        return { 
            usersCount: createdUsers.length, 
            shipmentsCount: createdShipments.length, 
            users: createdUsers, 
            shipments: createdShipments,
        }; 
    } 
}

module.exports = new MockService();