const { Router } = require("express");
const {obtenerUsuario} = require("../controllers/TipoUsuariosController");

const router = Router();

router.get("/", obtenerUsuario);

module.exports = router;