const multer = require('multer'); 
const path = require('path'); 
const { BadRequestError } = require('../errors/customError'); 

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, path.join(__dirname, '../../uploads'));
    },
    
    filename: (req, file, cb) => { 
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; 
        const ext = path.extname(file.originalname); 
        cb(null, `proof-${uniqueSuffix}${ext}`); 
    }, 
}); 

const fileFilter = (req, file, cb) => { 
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']; 
    if (allowedMimeTypes.includes(file.mimetype)) { 
        cb(null, true); 
    } 
    
    else { 
        cb(new BadRequestError('Formato de archivo no permitido. Solo se aceptan imágenes (JPG, PNG, WEBP) y PDF.'), false); 
    } 
}; 

const upload = multer({
    storage, 
    fileFilter, 
    limits: { 
        fileSize: 5 * 1024 * 1024, // Máximo 5MB por archivo 
    }, 
}); 

module.exports = upload;