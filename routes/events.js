/**
 Rutas de Eventos / Events
 host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas tienen que pasar por la validación del JWT // Aplica como middleware para todas las rutas.
router.use( validarJWT );

// Obtener eventos
router.get( '/', getEventos );

// Crear un nuevo evento
router.post( '/', 
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'Fecha de finalización es obligatorio').custom( isDate ),
    validarCampos
], crearEvento );

// Actualizar Evento
router.put( '/:id', actualizarEvento );

// Eliminar Evento
router.delete( '/:id', eliminarEvento );

module.exports = router;