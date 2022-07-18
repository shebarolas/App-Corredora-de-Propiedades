const {Router} = require('express');
const multer = require('multer');
const images = require('../models/imagen');

const routes = Router();
let nombre = '';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const ext  = file.originalname.split('.').pop();
        nombre = `p${Date.now()}.${ext}`
        cb(null, nombre);
    }
});

const upload = multer({
    storage: storage
});

routes.post('/upload', upload.single('archivo'), (req, res) => {
    console.log(req.body);
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
    } else {
        console.log('file received');
        return res.send({
          success: true
        });
    }
});

module.exports = routes;
