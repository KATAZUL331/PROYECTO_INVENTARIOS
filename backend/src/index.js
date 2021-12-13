//DEPENDENCIAS NECESARIAS Y CONSTANTES
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
require('./database')

//CONFIGURACION DEL PUERTO
//Trabaja con el puerto que encuentre pero si no encuentra ninguna se pegara del puerto 4000 o el que escojan
app.set('Port', process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors({ origen: '*' }))
app.use('/admin', require('./routes/Admin.routes'))
app.use('/usuario', require('./routes/Usuario.routes'))
app.use('/cliente', require('./routes/Cliente.routes'))
app.use('/producto', require('./routes/Producto.routes'))
app.use('/proveedor', require('./routes/Proveedor.routes'))

app.listen(app.get('Port'), () => {
    console.log('Hola, soy el servidor y estoy escuchando por el puerto', app.get('Port'))
})