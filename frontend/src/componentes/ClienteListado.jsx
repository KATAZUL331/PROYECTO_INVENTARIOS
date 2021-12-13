import MaterialTable from 'material-table'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

function BusquedaCliente() {

  const [cliente,setCliente]=useState([])
  const [idCliente,setIdCliente]=useState('')
  const [nombres,setNombres]=useState('')
  const [apellidos,setApellidos]=useState('')
  const [cedulaCliente,setCedulaCliente]=useState('')
  const [correo,setCorreo]=useState('')
  const [telefono,setTelefono]=useState('')
  const [empresa,setEmpresa]=useState('')
  const [direccion,setDireccion]=useState('')
  const [fechaNacimiento,setFechaNacimiento]=useState('')
  
  const [genero,setGenero]=useState([])
  const [generoSelect,setGeneroSelect]=useState([])

  const [cargo,setCargo]=useState([])
  const [cargoSelect,setCargoSelect]=useState([])
  
  const [tipoPersona,setTipoPersona]=useState([])
  const [tipoPersonaSelect,setTipoPersonaSelect]=useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    
    obtenerClientes()
    setCargo(['Seleccionar','Representante Legal', 'Auxiliar','Jefe','Tecnico','Profesional','Vendedor', 'Comprador'])
    setTipoPersona(['Seleccionar','Natural','Juridica'])
    setGenero(['Seleccionar','Femenino','Masculino'])
  },[])


  const obtenerClientes = async()=>{
  
    const id = sessionStorage.getItem('idUsuario')
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/cliente/listarPorAdministrador/'+id,{
      headers:{'autorizar':token}
    })
    console.log(respuesta)
    setCliente(respuesta.data)
  }

  const obtenerCliente = async(idParametro)=>{
    setShow(true)
    const id = idParametro
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/cliente/listarId/'+id,{
      headers:{'autorizar':token}
    })

    console.log(respuesta.data)

    setIdCliente(respuesta.data._id)
    setNombres(respuesta.data.nombres)
    setApellidos(respuesta.data.apellidos)
    setCedulaCliente(respuesta.data.cedulaCliente)
    setTelefono(respuesta.data.telefono)
    setCorreo(respuesta.data.correo)
    setEmpresa(respuesta.data.empresa)
    setDireccion(respuesta.data.direccion)
    setFechaNacimiento(respuesta.data.fechaNacimiento)
    setCargoSelect(respuesta.data.cargo)
    setGeneroSelect(respuesta.data.genero)
    setTipoPersonaSelect(respuesta.data.tipoPersona)

  }

  const actualizar = async (e)=>{
    e.preventDefault();
    const id = idCliente
    const token = sessionStorage.getItem('token')
    const cliente ={
    nombres,
    apellidos,
    cedulaCliente,
    tipoPersona:tipoPersonaSelect,
    genero:generoSelect,
    correo,
    telefono,
    cargo:cargoSelect,
    empresa,
    direccion,
    fechaNacimiento,
    }

    const respuesta = await Axios.put('/cliente/actualizarDatoCliente/'+ id,cliente,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    obtenerClientes()

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
    const respuesta = await Axios.delete('/cliente/eliminarCliente/'+id,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })
  obtenerClientes()
  }

  const data =
  cliente.map((cliente)=>({
    id:cliente._id,
    nombres:cliente.nombres,
    apellidos:cliente.apellidos,
    cedulaCliente:cliente.cedulaCliente,
    tipoPersona:cliente.tipoPersona,
    genero:cliente.genero,
    correo:cliente.correo,
    telefono:cliente.telefono,
    cargo:cliente.cargo,
    empresa:cliente.empresa,
    direccion:cliente.direccion,
    fechaNacimiento:cliente.fechaNacimiento,
  }))

    return (
        <div className="container">
          <br />
      <MaterialTable
        title="LISTADO DE CLIENTES"
        columns={[
        //TITULO DE LAS COLUMNAS     
        { title: 'ID', field: 'id' },
        { title: 'Nombre Completo', field: 'nombres' },
        { title: 'Apellido Completo', field: 'apellidos' },
        { title: 'Documento de Identidad', field: 'cedulaCliente' },
        { title: 'Tipo de Persona', field: 'tipoPersona' },
        { title: 'Genero', field: 'genero' },
        { title: 'Fecha de Nacimiento', field: 'fechaNacimiento' },
        { title: 'Correo Electrónico', field: 'correo' },
        { title: 'Telefono/Celular', field: 'telefono' },
        { title: 'Cargo', field: 'cargo' },
        { title: 'Empresa', field: 'empresa' },
        { title: 'Direccion', field: 'direccion' }
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
            onClick:(event,rowData)=>obtenerCliente(rowData.id)
          }
        ]}
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
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
                  <h4>REGISTRO DE CLIENTES</h4>
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
                        <input type="text" className="form-control required" onChange={(e)=>setApellidos(e.target.value)} value={apellidos} />
                      </div>

                      <div className="col-md-6">
                        <label>Documento de Identidad</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaCliente(e.target.value)} value={cedulaCliente} />
                      </div>

                      <div className="col-md-6">
                        <label>Tipo de Persona</label>
                        <select className='form-control' onChange={(e) => setTipoPersonaSelect(e.target.value)} value={tipoPersonaSelect}>
                            {
                                tipoPersona.map(tipoPersona => (
                                    <option key={tipoPersona}>
                                        {tipoPersona}
                                  </option>
                                ))
                            }
                            </select>
                      </div>

                      <div className="col-md-6">
                        <label>Genero</label>
                        <select className='form-control' onChange={(e) => setGeneroSelect(e.target.value)} value={generoSelect}>
                            {
                                genero.map(genero => (
                                    <option key={genero}>
                                        {genero}
                                  </option>
                                ))
                            }
                            </select>
                      </div>

                      <div className="col-md-6">
                        <label>Fecha de Nacimiento</label>
                        <input type="text" className="form-control required" onChange={(e)=>setFechaNacimiento(e.target.value)} value={fechaNacimiento}/>
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreo(e.target.value)} value={correo} />
                      </div>

                      <div className="col-md-6">
                        <label>Telefono</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefono(e.target.value)} value={telefono} />
                      </div>

                      <div className="col-md-6">
                        <label>Cargo</label>
                        <select className='form-control' onChange={(e) => setCargoSelect(e.target.value)} value={cargoSelect}>
                          {cargo.map(cargo => (
                                  <option key={cargo}>
                                      {cargo}
                                  </option>
                          ))
                          }
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label>Empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setEmpresa(e.target.value)} value={empresa} />
                      </div>

                      <div className="col-md-6">
                        <label>Direccion</label>
                        <input type="text" className="form-control required" onChange={(e)=>setDireccion(e.target.value)} value={direccion}/>
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

export default BusquedaCliente
