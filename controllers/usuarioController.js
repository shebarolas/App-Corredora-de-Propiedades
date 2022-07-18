const jwt = require("jsonwebtoken");
const Usuario = require('../models/Usuarios');

exports.crearUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        return res.status(200).send({ message: 'Usuario creado' });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
}

exports.iniciarSesion = async(req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ 
        where:{
            email: email,
        }
    });

    console.log(usuario);

    if(!usuario){
        return res.status(404).send({ message: 'User Not Found' });
    }

    if(password !== usuario.password){
        return res.status(404).send({ message: 'Correo o password Incorrecta'});
    }

    const newUser = {
        id: usuario.id,
        name: usuario.nombre,
        email: usuario.email,
        isAdmin: usuario.idTipoUsuario === 3 ? true : false
    }

    const token = jwt.sign(newUser, "secret", {
        expiresIn: "24h"
    });

    return res.status(200).send({
        token,
        user: newUser
    });
}