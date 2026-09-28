const express = require('express'); 
const router = express.Router(); 
const shipmentController = require('../controllers/shipmentController'); 
const upload = require('../middlewares/uploadMiddleware'); 

/** 
 * @swagger 
 * /shipments: 
 *   post: 
 *     summary: Crear un nuevo envío 
 *     tags: [Envíos]
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sender, recipient, destinationAddress, weight]
 *             properties:
 *               sender:
 *                 type: string
 *               recipient:
 *                 type: string
 *               destinationAddress:
 *                 type: string 
 *               weight:
 *                 type: number
 *     responses:
 *       201: 
 *         description: Envío creado exitosamente
 *   get: 
 *    summary: Obtener listado de envíos
 *    tags: [Envíos]
 *    responses:
 *      200:
 *        description: Lista de envíos obtenida
 */
router.post('/', (req, res, next) => shipmentController.create(req, res, next)); 
router.get('/', (req, res, next) => shipmentController.getAll(req, res, next)); 

/**
 * @swagger
 * /shipments/tracking/{trackingNumber}:
 *   get:
 *     summary: Buscar envío por número de tracking
 *     tags: [Envíos]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío encontrado
 *       404:
 *         description: Envío no encontrado
 */
router.get('/tracking/:trackingNumber', (req, res, next) => shipmentController.getByTracking(req, res, next)); 

/**
 * @swagger
 * /shipments/{id}:
 *   get:
 *     summary: Obtener envío por ID
 *     tags: [Envíos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío encontrado
 *       404:
 *         description: Envío no encontrado
 *   put:
 *     summary: Actualizar estado o datos de un envío
 *     tags: [Envíos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Envío actualizado
 *   delete:
 *     summary: Eliminar un envío
 *     tags: [Envíos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío eliminado
 */

router.get('/:id', (req, res, next) => shipmentController.getById(req, res, next)); 
router.put('/:id', (req, res, next) => shipmentController.update(req, res, next)); 
router.delete('/:id', (req, res, next) => shipmentController.delete(req, res, next)); 

/**
 * @swagger
 * /shipments/{id}/proof:
 *   post:
 *     summary: Subir comprobante de entrega (Multer)
 *     tags: [Envíos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               proof:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprobante subido exitosamente
 */ 
router.post('/:id/proof', upload.single('proof'), (req, res, next) => shipmentController.uploadProof(req, res, next)); 

module.exports = router;