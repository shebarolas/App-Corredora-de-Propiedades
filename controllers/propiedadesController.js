const {Op} = require('sequelize');
const Propiedades = require('../models/Propiedades');
const TipoPropiedad = require('../models/TipoPropiedad');
const Imagen = require('../models/imagen');
const Usuarios = require('../models/Usuarios');

exports.crearPropiedad = async(req, res) => {
    
    const propiedades = new Propiedades(JSON.parse(JSON.stringify({
            nombreProp: req.body.nombreProp,
            description: req.body.description,
            estado: req.body.estado,
            valor: req.body.valor,
            habitaciones: req.body.habitaciones,
            baño: req.body.bano,
            estacionamiento: req.body.estacionamiento,
            amoblado: req.body.amoblado,
            direcciones: req.body.direcciones,
            idTipoProp: req.body.idTipoProp,
            usuarioId: req.body.usuarioId
    })));
    try{  
        console.log(req.body.nombreProp);

        const propiedadSaved = await propiedades.save();
        console.log(propiedadSaved);
        // save images
        console.log(req);
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
    const propiedadesWithImage = await Promise.all(
        propiedades.map(async (propiedad) => {
            const imagen = await Imagen.findOne({ where: { idPropiedades: propiedad.idPropiedades } });
            const usuarioFound = await Usuarios.findOne({ where: {id : propiedad.usuarioId } });
            const usuario = { 
                nombre : usuarioFound.nombre,
                apellido : usuarioFound.apellido,
                email : usuarioFound.email
            }
            return { ...propiedad.dataValues, imagen: imagen.path, usuario }
        })
    );

    return res.status(200).send(propiedadesWithImage);
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

        const imagen = await Imagen.findOne({ where: { idPropiedades: propiedad.idPropiedades } });
        const usuarioFound = await Usuarios.findOne({ where: { id: propiedad.usuarioId } });
        const usuario = { 
            nombre : usuarioFound.nombre,
            apellido : usuarioFound.apellido,
            email : usuarioFound.email
        }
        const propImagen = { ...propiedad.dataValues, imagen: imagen.path, usuario };

    if(!propiedad){
        return res.status(404).send({ message: 'Not Found' });
    }

    return res.status(200).send({ message: `Propiedad con el id: ${propiedad.idPropiedades} encontrada`, propImagen});
}

exports.eliminarPropiedad = async(req, res) => {

    const {idProp} = req.params;

    const propiedades = await Propiedades.findOne({
        where: {
            idPropiedades : idProp
        }
    });

    if(!propiedades){
        return res.status(404).send({message: 'Error al eliminar la propiedad'})
    }

    await propiedades.destroy();
    return res.status(200).send({message: 'Se a eliminado correctamente la propiedad'});

}

exports.obtenerPropiedadesUsuario = async(req, res) => {
    const {usuarioId} = req.params;

    const propiedadesUsuario = await Propiedades.findAll({
        where: {
            usuarioId
        }
    });

    if(!propiedadesUsuario){
        return res.status(404).send({message: 'Error en el servidor'});
    }

    const propiedadesWithImage = await Promise.all(
        propiedadesUsuario.map(async (propiedad) => {
            const imagen = await Imagen.findOne({ where: { idPropiedades: propiedad.idPropiedades } });
            const usuarioFound = await Usuarios.findOne({ where: {id : propiedad.usuarioId } });

            return { ...propiedad.dataValues, imagen: imagen.path }
        })
    );

    return res.status(200).send(propiedadesWithImage);
}


exports.obtenerDatosPropiedades = async(req, res) => {
    const {usuarioId} = req.params;

    const propiedades = await Propiedades.findAll({
        where: {
            usuarioId

        }
    });

    if(!propiedades){
        return res.status(404).send({message: 'Propiedades not found'});
    }

    let arrendado = 0;
    let sinArriendo = 0;

    propiedades.map((propiedades) =>{
            if(propiedades.estado === 0){
                arrendado++;
            }else if(propiedades.estado === 1){
                sinArriendo++;
            }
    });
    console.log(arrendado, sinArriendo);

    return res.status(200).send({message: 'Propiedades encontradas'})
}