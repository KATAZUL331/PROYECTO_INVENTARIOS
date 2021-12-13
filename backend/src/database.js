//CODIGO PARA BASE LOCAL
const mongoose = require('mongoose')
    //URI = ('mongodb://localhost/bdNivelacion')

URI = ('mongodb+srv://KATAZUL:821231@base.rgbch.mongodb.net/MASTERSYSTEM?retryWrites=true&w=majority')

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => console.log('Estoy conectado a la base de datos: ', db.connection.name))
    .catch(error => console.log(error))

module.exports = mongoose