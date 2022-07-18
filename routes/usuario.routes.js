const { Router } = require("express");
const { crearUsuario, iniciarSesion } = require("../controllers/usuarioController");

const router = Router();

router.post('/crear-usuario', crearUsuario);
router.post('/iniciar-sesion', iniciarSesion);

module.exports = router;