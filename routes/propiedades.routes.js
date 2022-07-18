const { Router } = require("express");
const Propiedad = require("../models/Propiedades");
const { obtenerTipoPropiedades, crearPropiedad, buscarPropiedadesTitulo,obtenerPropiedadesId, obtenerPropiedades } = require("../controllers/propiedadesController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const ext  = file.originalname.split('.').pop();
        nombre = `${Date.now()}.${ext}`
        cb(null, nombre);
    }
});

const upload = multer({
    storage: storage
});


const router = Router();

// Todas las rutas de propiedades
// http://localhost:7000/api/propiedades
router.get("/", obtenerTipoPropiedades);
router.get("/obtener-prop", obtenerPropiedades);
router.get("/buscar-prop/:nombreProp", buscarPropiedadesTitulo);
router.get("/obtener-prop/:idProp", obtenerPropiedadesId);
router.post("/crear", upload.single('archivo'), crearPropiedad);

module.exports = router;
