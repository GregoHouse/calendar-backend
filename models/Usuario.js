const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});

// Modificar el objecto retornado
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject(); // Se saca las 2 primeras propiedades y se hace un spread del resto
    object.uid = _id;
    return object;

})

module.exports = model('Usuario', UsuarioSchema );