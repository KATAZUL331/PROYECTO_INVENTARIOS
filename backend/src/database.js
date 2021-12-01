//CODIGO PARA BASE LOCAL
const mongoose = require('mongoose')
URI = ('mongodb://localhost/bdNivelacion')

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Estoy conectado a la base de datos: ', db.connection.name))
    .catch(error => console.log(error))

module.exports = mongoose