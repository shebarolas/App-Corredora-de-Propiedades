const cors = require('cors');
const express = require('express');
const multer = require('multer');
const PropiedadesRoutes = require('./routes/propiedades.routes');
const TipoUsuarios = require('./routes/tipoUsuario.routes');
const Usuario = require('./routes/usuario.routes');
const db = require('./config/database');
const uploads = require('./routes/upload.routes');


require('./models/TipoPropiedad');
require('./models/TipoUsuario');
require('./models/Usuarios');
require('./models/Propiedades');


db.sync().then(()=> console.log("Conectado a la base de datos :)"))
    .catch(err => console.log(err));


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*"
}));

// images
app.use(express.static(__dirname + '/public'));
app.use("/uploads", express.static('images'));

app.get("/",  (req, res) => res.send('Hola Mundo').status(200));
app.use("/api/propiedades", PropiedadesRoutes);
app.use("/api/tipousuario",  TipoUsuarios);
app.use("/api/usuario", Usuario);
app.use("/api/uploads", uploads);

app.listen(7000, () => console.log("Server running in http://localhost:7000"));