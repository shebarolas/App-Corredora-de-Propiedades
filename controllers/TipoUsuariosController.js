const TipoUsuario = require('../models/TipoUsuario');


exports.obtenerUsuario = async (req, res) => {

    const data = await TipoUsuario.findAll();

    if(!data){
        return res.send({
            message: 'Error, No se encuentran datos en la base de datos'
        });
    }

    return res.send(data).status(200);

}