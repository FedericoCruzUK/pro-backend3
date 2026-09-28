const request = require('supertest'); 
const mongoose = require('mongoose'); 
const { expect } = require('chai'); 
const app = require('../src/app'); 
const Shipment = require('../src/models/Shipment'); 
const User = require('../src/models/User'); 

describe('Suite de Tests Funcionales - ShipNow Backend API', function () {
    this.timeout(10000); 
    
    before(async () => { 
        const testMongoURI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/shipnow\_test'; 
        if (mongoose.connection.readyState === 0) { 
            await mongoose.connect(testMongoURI); 
        } 
    }); 
    
    after(async () => { 
        if (mongoose.connection.db) { 
            await mongoose.connection.db.dropDatabase(); 
        } 
        await mongoose.connection.close(); 
    }); 
    
    beforeEach(async () => { 
        await Shipment.deleteMany({}); 
        await User.deleteMany({}); 
    }); 
    
    describe('1\. Health Check Endpoint', () => { 
        it('Debe responder 200 OK y confirmar que la API está activa', async () => { 
            const res = await request(app).get('/api/health'); 
            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('status', 'success'); 
        }); 
    }); 
    
    describe('2\. Módulo de Mocks', () => { 
        it('Debe generar envíos y usuarios mock', async () => { 
            const res = await request(app).post('/api/mocks/generate?qty=5'); 
            expect(res.status).to.equal(201); 
            expect(res.body.shipmentsCount).to.equal(5); 
        }); 
    }); 
    
    describe('3\. Flujo Principal de Envíos (CRUD)', () => { 
        it('Debe crear un nuevo envío correctamente', async () => { 
            const newShipment = { 
                sender: 'Logística Central', 
                recipient: 'Carlos Gómez', 
                destinationAddress: 'Av. Libertador 5000, CABA', 
                weight: 3.5, 
            }; 
            
            const res = await request(app).post('/api/shipments').send(newShipment); expect(res.status).to.equal(201); expect(res.body.data).to.have.property('trackingNumber'); expect(res.body.data.status).to.equal('PENDING'); 
        }); 
    }); 
});