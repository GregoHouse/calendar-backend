const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) =>{

    const { name, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email })

    if ( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ese correo ya se encuentra registrado por otro usuario'
        })
    }

      usuario = new Usuario( req.body );

      // Encriptar constraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync( password, salt );
      
  
      await usuario.save();

      // Generar JWT
      const token = await generarJWT( usuario.id, usuario.name );
  
      res.json({
          ok: true,
          uid: usuario.id,
          name: usuario.name,
          token
      })
  
  } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
  }

}

const loginUsuario = async( req, res = response ) =>{

    const { email, password } = req.body

    try {

        // Confirmar el email si existe
        let usuario = await Usuario.findOne({ email })

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // Confirma los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //  Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
    }

}

const revalidarToken = async( req, res = response ) =>{

    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en la petición

    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        uid,
        name,
        token

    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}