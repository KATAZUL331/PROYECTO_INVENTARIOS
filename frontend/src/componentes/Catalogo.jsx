import React, { useState,Component } from "react";
import { Row, Container } from "reactstrap";
import Swal from 'sweetalert2'
import axios from 'axios';
import Producto from './Producto'

export default function Catalogo () {

    const[producto,setProducto]=useState([])
    const[idProduto,setIdProducto]=useState('')
    const[titulo,setTitulo]=useState('')
    const[imagen,setImagen]=useState('')
    const[descripcion,setDescripcion]=useState('')
    const[precio,setPrecio]=useState('')
    const[stock,setStock]=useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const  ProductoCat = async(e)=>{

        e.preventDefault()
        const Produc= {
            titulo,
            imagen,
            descripcion,
            precio,
            stock,
        produc: sessionStorage.getItem('idProducto'),
        producNombre :sessionStorage.getItem('producNombre')
        }
        const token = sessionStorage.getItem('token')
        const res = await axios.post('/producto/crearProducto',Produc,{
        headers:{'autorizar':token}
        })
        const mensaje= res.data.mensaje
        console.log(mensaje)

        Swal.fire({
            icon:'success',
            title:mensaje,
            showConfirmButton:false,
            timer:2000
          })

          e.target.reset();
          setTitulo("");
          setImagen("");
          setDescripcion("");
          setPrecio("");
          setStock("");

          const obtenerProducto = async()=>{
  
            const id = sessionStorage.getItem('idProducto')
            const token = sessionStorage.getItem('token')
            const respuesta = await axios.get('/producto/listarProducto/',{
              headers:{'autorizar':token}
            })
            console.log(respuesta)
            setProducto(respuesta.data)
            const data =
            producto.map((producto)=>({
            id:producto._id,
            titulo:producto.nombres,
            imagen:producto.apellidos,
            descripcion:producto.cedulaUsuario,
            stock:producto.correo,
            
          }))
          console.log(data)
          }
        
          const obtenerProductos = async(idParametro)=>{
            setShow(true)
            const id = idParametro
            const token = sessionStorage.getItem('token')
            const respuesta = await axios.get('/producto/listarProductoId/'+id,{
              headers:{'autorizar':token}
            })
        
            console.log(respuesta.data)
        
            setIdProducto(respuesta.data._id)
            setTitulo(respuesta.data.titulo)
            setImagen(respuesta.data.imagen)
            setDescripcion(respuesta.data.descripcion)
            setStock(respuesta.data.stock)
            
          }
        obtenerProducto()
        
        
    }
    //console.log(Producto.obtenerProducto.data)
    var arrayComponente= producto.map( (listaProductos, i) =>{
        return(
          <data
            Key={i}
            titulo={listaProductos.titulo}
            imagen ={listaProductos.imagen}
            descripcion ={listaProductos.descripcion}
            precio = {listaProductos.precio}
            stock ={listaProductos.stock}
            
          />
        )
      }
    )
    return (
        <Container>
            <Row>
                {arrayComponente}
             </Row>
            </Container>
    )
     
    
    
}