import React, { useState,useEffect } from "react";
import MaterialTable from 'material-table'
import { IconName } from "react-icons/fi";
import { Col, Container } from "reactstrap";
import Swal from 'sweetalert2'
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';

export default function NuevoProducto () {

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
    
    const  crearProducto = async(e)=>{

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
    
    //render()
        return (
        <Container>
            <Col sm="6">
            <h4>Nuevo Producto</h4>
            <form onSubmit={crearProducto}>
                <div className="mb-3">
                <input
                    name="titulo"
                    className="form-control"
                    type="text"
                    placeholder="Ingrese título"
                    onChange={(e)=>setTitulo(e.target.value)} 
                />
                </div>
                <div className="mb-3">
                <input
                    name="imagen"
                    className="form-control"
                    type="text"
                    placeholder="Ingrese link de imagen"
                    onChange={(e)=>setImagen(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <input
                    name="descripcion"
                    className="form-control"
                    type="text"
                    placeholder="Ingrese descripcion"
                    onChange={(e)=>setDescripcion(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <input
                    name="precio"
                    className="form-control"
                    type="text"
                    placeholder="Ingrese el precio"
                    onChange={(e)=>setPrecio(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <input
                    name="stock"
                    className="form-control"
                    type="number"
                    onChange={(e)=>setStock(e.target.value)}
                />
                </div>
                <button type="submit" className="btn btn-primary">
                Guardar
                </button>
            </form>
            </Col>
            <Col sm="10">
            <h4>Lista de productos</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Imagen</th>
                    <th>Desripcion</th>
                    <th>Precio</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {producto.map((data) => {
                    return (
                    <tr key={data._id}>
                        <td>{data.titulo}</td>
                        <td>{data.imagen}</td>
                        <td>{data.descripcion}</td>
                        <td>{data.precio}</td>
                        <td>{data.stock}</td>
                        <td>
                        <button
                            onClick={() => this.editProducto(producto._id)}
                            type="button"
                            className="btn btn-info"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => this.deleteProducto(producto._id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            Borrar
                        </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </Col>
        </Container>
        );
    
    
}