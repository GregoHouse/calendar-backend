const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

    const getEventos = await Evento.find().populate('user', 'name');

    res.json({
        ok: true,
        getEventos
    })
}

const crearEvento = async( req, res = response ) => {

    // console.log( req.body );

    const evento = new Evento( req.body );
  

    try {

        evento.user = req.uid;

       const eventoGuardado = await evento.save();
        
        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    // console.log(req);
    // console.log(req.body);
    // console.log(req.body.user.uid);
    // console.log(req.uid);

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok:true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            // console.log(evento);
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

       await Evento.findByIdAndDelete( eventId );
        
        res.json({
            ok: true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    res.json({
        ok: true,
        msg: 'Eliminar un evento'
    })
}

module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEventos,
}