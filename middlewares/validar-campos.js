const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

     // Manejo de errores
     const errors = validationResult( req );
     // console.log(errors);
     if( !errors.isEmpty() ) {
         return res.status(400).json({ // no puede haber dos "res" en el mismo scope sin un return. Se debe cortar con un return todos los "res" anteriores al ultimo.
             ok: false,
             errors: errors.mapped()
         });
     }

    next();
}

module.exports = {
    validarCampos
}