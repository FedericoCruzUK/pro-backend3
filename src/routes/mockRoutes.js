const express = require('express'); 
const router = express.Router(); 
const mockController = require('../controllers/mockController'); 

/**
 * @swagger
 * /mocks/generate:
 *   post:
 *     summary: Generar envíos y usuarios simulados (Mocks con Faker)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de envíos mock a generar (por defecto 10)
 *     responses:
 *       201:
 *         description: Mocks generados exitosamente
 */ 
router.post('/generate', (req, res, next) => mockController.generate(req, res, next)); 

module.exports = router;