
const express = require('express');
const { dbConenection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log( process.env );

// Crear el servidor express
const app = express();

// Base de datos
dbConenection();

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lextura y parseo del body req
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

// Ruta generica comodin 
app.use('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html' );
});

// Levantar servidor para escuchar peticiones
app.listen( process.env.PORT, () => {

    console.log(`Servidor corriendo en el puerto${ process.env.PORT }`);
});