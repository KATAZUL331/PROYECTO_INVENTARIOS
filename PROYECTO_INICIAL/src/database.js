const mongoose = require('mongoose');

const remoteHost = 'base.rgbch.mongodb.net';
const remoteUser = 'KATAZUL';
const remotePass = '821231';
const remoteDb = 'hr';

exports.mongoConnect = () => {
    const mongoStringConnection = `mongodb + srv://${remoteUser}:${remotePass}@${remoteHost}/${remoteDb}?retryWrites=true&w=majority`;
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on(
        'error',
        console.error.bind(console, 'ERROR EN LA CONEXION A LA BASE DE DATOS')
    );
};

module.exports = mongoose