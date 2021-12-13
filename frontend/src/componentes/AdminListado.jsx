import MaterialTable from 'material-table'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

function BusquedaAdmin() {

  const [usuario,setUsuario]=useState([])
  const [idUsuario,setIdUsuario]=useState('')
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
    setUsuario(respuesta.data)
  }

  const obtenerUsuario = async(idParametro)=>{
    setShow(true)
    const id = idParametro
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/admin/listarId/'+id,{
      headers:{'autorizar':token}
    })

    console.log(respuesta.data)

    setIdUsuario(respuesta.data._id)
    setNombres(respuesta.data.nombres)
    setApellidos(respuesta.data.apellidos)
    setCedulaUsuario(respuesta.data.cedulaUsuario)
    setTelefono(respuesta.data.telefono)
    setCorreo(respuesta.data.correo)
    setJefeInmediato(respuesta.data.jefeInmediato)
    setCargoSelect(respuesta.data.cargo)
    setTipoContratoSelect(respuesta.data.tipoContrato)
  }

  const actualizar = async (e)=>{
    e.preventDefault();
    const id = idUsuario
    const token = sessionStorage.getItem('token')
    const usuario ={
      nombres,
      apellidos,
      cedulaUsuario,
      correo,
      jefeInmediato,
      telefono,
      cargo:cargoSelect,
      tipoContrato: tipoContratoSelect
    }

    const respuesta = await Axios.put('/usuario/actualizarDatoUsuario/'+ id,usuario,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    obtenerUsuarios()

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
    const respuesta = await Axios.delete('/usuario/eliminarUsuario/'+id,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })
  obtenerUsuarios()
  }

  const data =
  usuario.map((usuario)=>({
    id:usuario._id,
    nombres:usuario.nombres,
    apellidos:usuario.apellidos,
    cedulaUsuario:usuario.cedulaUsuario,
    correo:usuario.correo,
    cargo:usuario.cargo,
    telefono:usuario.telefono,
    tipoContrato:usuario.telefono,
    jefeInmediato:usuario.jefeInmediato
  }))

    return (
        <div className="container">
          <br />
      <MaterialTable
        title="LISTADO DE EMPLEADOS"
        columns={[
        //TITULO DE LAS COLUMNAS     
        { title: 'ID', field: 'id' },
        { title: 'Nombre Completo', field: 'nombres' },
        { title: 'Apellido Completo', field: 'apellidos' },
        { title: 'Documento de Identidad', field: 'cedulaUsuario' },
        { title: 'Correo Electrónico', field: 'correo' },
        { title: 'Cargo', field: 'cargo' },
        { title: 'Telefono/Celular', field: 'telefono' },
        { title: 'Tipo de Contrato', field: 'tipoContrato' },
        { title: 'Jefe Inmediato', field: 'jefeInmediato' }
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
            onClick:(event,rowData)=>obtenerUsuario(rowData.id)
          }
        ]}
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
            </Modal.Header>
              <Modal.Body>

          <div className="container mt-4">
            <div className="row">
              <div className="col-md-7  mx-auto">
                <div className="card">
                  <div className="container text-center fa-5x">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="card-header bg-success text-center">
                    <h4>REGISTRO DE EMPLEADOS</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={'guardar'}>
                      <div className="row">

                        <div className="col-md-6">
                          <label>Nombres</label>
                          <input type="text" className="form-control required" onChange={(e)=>setNombres(e.target.value)} value={nombres}/>
                        </div>

                        <div className="col-md-6">
                          <label>Apellidos</label>
                          <input type="text" className="form-control required" onChange={(e)=>setApellidos(e.target.value)} value={apellidos}/>
                        </div>

                        <div className="col-md-6">
                          <label>Documento de Identidad</label>
                          <input type="text" className="form-control required" onChange={(e)=>setCedulaUsuario(e.target.value)} value={cedulaUsuario} />
                        </div>

                        <div className="col-md-6">
                          <label>Correo Electronico</label>
                          <input type="text" className="form-control required" onChange={(e)=>setCorreo(e.target.value)} value={correo}/>
                        </div>

                        <div className="col-md-6">
                          <label>Telefono</label>
                          <input type="text" className="form-control required" onChange={(e)=>setTelefono(e.target.value)} value={telefono}/>
                        </div>

                        <div className="col-md-6">
                          <label>Cargo</label>
                          <select className='form-control' onChange={(e) => setCargoSelect(e.target.value)} value={cargoSelect}>
                            {cargo.map(cargo => (
                                    <option key={cargo}>
                                      {cargo}
                                    </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label>Tipo de Contrato</label>
                          <select className='form-control' onChange={(e) => setTipoContratoSelect(e.target.value)} value={tipoContratoSelect} >
                              {
                                  tipoContrato.map(tipoContrato => (
                                      <option key={tipoContrato}>
                                          {tipoContrato}
                                    </option>
                                  ))
                              }
                              </select>
                        </div>

                        <div className="col-md-6">
                          <label>Jefe Inmediato</label>
                          <input type="text" className="form-control required" onChange={(e)=>setJefeInmediato(e.target.value)} value={jefeInmediato}/>
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

export default BusquedaUsuario
