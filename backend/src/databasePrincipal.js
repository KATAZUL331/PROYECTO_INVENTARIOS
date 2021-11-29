/*
//CODIGO PARA BASE LOCAL
const mongoose = require('mongoose')
URI = ('mongodb://localhost/bdNivelacion')

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Estoy conectado a la base de datos: ', db.connection.name))
    .catch(error => console.log(error)) *
    /

/*CODIGO BASE REMOTE
const mongoose = require('mongoose');

const remoteHost = 'base.rgbch.mongodb.net';
const remoteUsuario = 'KATAZUL';
const remoteContrasena = '821231';
const remoteBase = ''

exports.mongoConnect = () => {
    const mongoStringConnection = `mongodb + srv://${remoteUsuario}:${remoteContrasena}@${remoteHost}/${remoteBase}?retryWrites=true&w=majority`;
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on(
        'error',
        console.error.bind(console, 'ERROR EN LA CONEXION A LA BASE DE DATOS')
    );
};


mongodb + srv: //KATAZUL:<password>@base.rgbch.mongodb.net/myFirstDatabase?retryWrites=true&w=maj

*/

//module.exports = mongoose