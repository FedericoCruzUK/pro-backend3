const express = require('express'); 
const router = express.Router(); 
const userController = require('../controllers/userController'); 

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios 
 */
router.post('/', (req, res, next) => userController.create(req, res, next)); 
router.get('/', (req, res, next) => userController.getAll(req, res, next)); 

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado 
 */ 
router.get('/:id', (req, res, next) => userController.getById(req, res, next)); 

module.exports = router;