import MaterialTable from 'material-table'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

function BusquedaAdmin() {

  const [admin,setAdmin]=useState([])
  const [idAdmin,setIdAdmin]=useState('')
  const [nombre,setNombre]=useState('')
  const [correo,setCorreo]=useState('')
  const [contrasena,setContrasena]=useState('')
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const obtenerAdmins = async()=>{
  
    const id = sessionStorage.getItem('idUsuario')
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/admin/listarPorAdministrador/'+id,{
      headers:{'autorizar':token}
    })
    console.log(respuesta)
    setAdmin(respuesta.data)
  }

  const obtenerAdmin = async(idParametro)=>{
    setShow(true)
    const id = idParametro
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/admin/listarId/'+id,{
      headers:{'autorizar':token}
    })

    console.log(respuesta.data)

    setIdAdmin(respuesta.data._id)
    setNombre(respuesta.data.nombre)
    setCorreo(respuesta.data.correo)
    setContrasena(respuesta.data.contrasena)
  }

  const actualizar = async (e)=>{
    e.preventDefault();
    const id = idAdmin
    const token = sessionStorage.getItem('token')
    const admin ={
      nombre,
      correo,
      contrasena
    }

    const respuesta = await Axios.put('/admin/actualizarDatoAdmin/'+ id,admin,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    obtenerAdmins()

    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:2000
    })
    setShow(false)
  }

  const eliminar = async (id)=>{
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.delete('/admin/eliminarAdmin/'+id,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })
  obtenerAdmins()
  }

  const data =
  admin.map((admin)=>({
    id:admin._id,
    nombre:admin.nombre,
    correo:admin.correo,
    contrasena:admin.contrasena
    
  }))

    return (
        <div className="container">
          <br />
      <MaterialTable
        title="LISTADO DE ADMINISTRADORES"
        columns={[
        //TITULO DE LAS COLUMNAS     
        { title: 'ID', field: 'id' },
        { title: 'Nombre Usuario', field: 'nombre' },
        { title: 'Correo Electrónico', field: 'correo' },
        { title: 'Contrasena', field: 'contrasena' },
        ]}
        data={data}       
        options={{
          search: true,
          actionsColumnIndex:-0,
          initialPage:1
        }}
        actions={[
          {
            icon:'delete',
            tooltip:'Eliminar',
            onClick:(event,rowData)=>eliminar(rowData.id)
          },
          {
            icon:'edit',
            tooltip:'Editar',
            onClick:(event,rowData)=>obtenerAdmin(rowData.id)
          }
        ]}
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Administrador</Modal.Title>
            </Modal.Header>
              <Modal.Body>

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-7  mx-auto">
              <div className="card">
                <div className="container text-center fa-5x">
                  <i className="fas fa-users"></i>
                </div>
                <div className="card-header bg-success text-center">
                  <h4>REGISTRO DE ADMINISTRADORES</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={'guardar'}>
                    <div className="row">

                      <div className="col-md-6">
                        <label>Nombre de Usuario</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombre(e.target.value)} value={nombre}/>
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreo(e.target.value)} value={correo}/>
                      </div>

                      <div className="col-md-6">
                        <label>Contrasena</label>
                        <input type="text" className="form-control required" onChange={(e)=>setContrasena(e.target.value)} value={contrasena}/>
                      </div>
                    </div>
                      <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={actualizar}>
                    Actualizar
                  </Button>
                </Modal.Footer>
              </Modal>          
      </div>
    )
}

export default BusquedaAdmin
