const {Op} = require('sequelize');
const Propiedades = require('../models/Propiedades');
const TipoPropiedad = require('../models/TipoPropiedad');
const Imagen = require('../models/imagen');

exports.crearPropiedad = async(req, res) => {
    const propiedades = new Propiedades({
        nombreProp : 'Condominio Casa',
        description: 'Edificio que cuenta con una placa comercial y de oficinas, con entradas diferentes a los departamentos con el fin de crear un micro barrio donde tengas todo lo que necesitas.',
        estado : 1,
        valor: '50000',
        habitaciones: 4,
        baño: 2,
        estacionamiento: 0,
        amoblado: 1,
        direcciones: 'Las Quilas 1761, Temuco',
        idTipoProp: 1,
        usuarioId: 3
    });
    try{  
        console.log(req.body);

        const propiedadSaved = await propiedades.save();
        console.log(propiedadSaved);
        // save images
        console.log(req.file);
        if(!req.file) {
            return res.status(400).send({ message: "Error al guardar imagen" })
        }
        const newImage = new Imagen({
            path: req.file.filename,
            idPropiedades: propiedadSaved.idPropiedades
        });
        await newImage.save();
        return res.status(200).send({ message: 'Propiedad e Imagen Creada'});
    }catch(err){
        return res.status(400).send({ message: err});

    }

};


exports.obtenerTipoPropiedades = async(req, res) => {
    // const propiedades = await Propiedades.findAll();

     const data = await TipoPropiedad.findAll();

    return res.send(data).status(200);
}

exports.obtenerPropiedades = async(req, res) => {
    const propiedades = await Propiedades.findAll();

    return res.status(200).send(propiedades);
}

exports.buscarPropiedadesTitulo = async(req, res) => {

        const {nombreProp} = req.params;

        const propiedades = await Propiedades.findAll({
            where: {
               nombreProp: {
                [Op.substring]: nombreProp
                
               }
            }
        });

        if (!propiedades){
            return res.status(404).send({
                message: 'Propiedad no encontrada'
            });
        }

        console.log(propiedades);
        return res.status(200).send({message: 'Propiedad Encontrada'});


}

exports.obtenerPropiedadesId = async(req, res) => {

    const {idProp} = req.params;
    const propiedad = await Propiedades.findOne({
        where:{
            idPropiedades: idProp
        }
    });

    if(!propiedad){
        return res.status(404).send({ message: 'Not Found' });
    }

    return res.status(200).send({ message: `Propiedad con el id: ${propiedad.idPropiedades} encontrada`});
}