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

routes.post('/upload', upload.single('archivo'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    // try {
    //     if (!req.file) {
    //         return res.status(400).send({ message: "Error al guardar imagen" })
        
    //     } else {
    //         const newImage = new Imagen({
    //             path: req.file.filename,
    //             idPropiedades: propiedadSaved.idPropiedades
    //         });
    //         await newImage.save();
    //         return res.status(200).send({ message: 'Propiedad e Imagen Creada'});
    //     }

    // }catch (err) {
    //     return res.status(400).send({ message: "Error al guardar imagen" })
    // }
    return res.status(200).send("hola");
});

module.exports = routes;
