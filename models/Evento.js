const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
});

// Modificar el objecto retornado
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject(); // Se saca las 2 primeras propiedades y se hace un spread del resto
    object.id = _id;
    return object;

})

module.exports = model('Evento', EventoSchema );