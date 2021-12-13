import MaterialTable from 'material-table'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

function BusquedaProveedor() {

  const[proveedor,setProveedor]=useState([])
  const[idProveedor,setIdProveedor]=useState('')
  const[nitEmpresa,setNitEmpresa]=useState('')
  const[nombreEmpresa,setNombreEmpresa]=useState('')
  const[direccionEmpresa, setDireccionEmpresa]=useState('')
  const[cedulaRepresentante,setCedulaRepresentante]=useState('')
  const[nombreRepresentante,setNombreRepresentante]=useState('')
  const[telefonoRepresentante,setTelefonoRepresentante]=useState('')
  const[correoRepresentante,setCorreoRepresentante]=useState('')
  const[cedulaContacto,setCedulaContacto]=useState('')
  const[nombreContacto,setNombreContacto]=useState('')
  const[telefonoContacto,setTelefonoContacto]=useState('')
  const[correoContacto,setCorreoContacto]=useState('')

  const[tipoPersona,setTipoPersona]=useState([])
  const[tipoPersonaSelect,setTipoPersonaSelect]=useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    obtenerProveedors()
    setTipoPersona(['Seleccionar','Natural','Juridica'])
    },[])


  const obtenerProveedors = async()=>{
  
    const id = sessionStorage.getItem('idUsuario')
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/proveedor/listarPorAdministrador/'+id,{
      headers:{'autorizar':token}
    })
    console.log(respuesta)
    setProveedor(respuesta.data)
  }

  const obtenerProveedor = async(idParametro)=>{
    setShow(true)
    const id = idParametro
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/proveedor/listarId/'+id,{
      headers:{'autorizar':token}
    })

    console.log(respuesta.data)

    setIdProveedor(respuesta.data._id)
    setNitEmpresa(respuesta.data.nitEmpresa)
    setNombreEmpresa(respuesta.data.nombreEmpresa)
    setDireccionEmpresa(respuesta.data.direccionEmpresa)
    setCedulaRepresentante(respuesta.data.cedulaRepresentante)
    setNombreRepresentante(respuesta.data.nombreRepresentante)
    setTelefonoRepresentante(respuesta.data.telefonoRepresentante)
    setCorreoRepresentante(respuesta.data.correoRepresentante)
    setCedulaContacto(respuesta.data.cedulaContacto)
    setNombreContacto(respuesta.data.nombreContacto)
    setTelefonoContacto(respuesta.data.telefonoContacto)
    setCorreoContacto(respuesta.data.correoContacto)
    setTipoPersonaSelect(respuesta.data.tipoPersona)
  }

  const actualizar = async (e)=>{
    e.preventDefault();
    const id = idProveedor
    const token = sessionStorage.getItem('token')
    const Proveedor ={
      nitEmpresa,
      nombreEmpresa,
      direccionEmpresa,
      cedulaRepresentante,
      nombreRepresentante,
      telefonoRepresentante,
      correoRepresentante,
      cedulaContacto,
      nombreContacto,
      telefonoContacto,
      correoContacto,
      tipoPersona:tipoPersonaSelect,
    }

    const respuesta = await Axios.put('/proveedor/actualizarDatoProveedor/'+ id,Proveedor,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    obtenerProveedors()

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
    const respuesta = await Axios.delete('/proveedor/eliminarProveedor/'+id,{
      headers:{'autorizar':token}
    })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })
  obtenerProveedors()
  }

  const data =
  proveedor.map((proveedor)=>({
    id:proveedor._id,
    nitEmpresa:proveedor.nitEmpresa,
    nombreEmpresa:proveedor.nombreEmpresa,
    direccionEmpresa:proveedor.direccionEmpresa,
    tipoPersona: proveedor.tipoPersona,
    cedulaRepresentante:proveedor.cedulaRepresentante,
    nombreRepresentante: proveedor.nombreRepresentante,
    telefonoRepresentante: proveedor.telefonoRepresentante,
    correoRepresentante: proveedor.correoRepresentante,
    cedulaContacto: proveedor.cedulaContacto,
    nombreContacto: proveedor.nombreContacto,
    telefonoContacto: proveedor.telefonoContacto,
    correoContacto: proveedor.correoContacto,
  }))

    return (
        <div className="container">
          <br />
      <MaterialTable
        title="LISTADO DE PROVEEDORES"
        columns={[
        //TITULO DE LAS COLUMNAS     
        { title: 'ID', field: 'id' },
        { title: 'Nit de la empresa', field: 'nitEmpresa' },
        { title: 'Nombre de la empresa', field: 'nombreEmpresa' },
        { title: 'Direccion de la Empresa', field: 'direccionEmpresa' },
        { title: 'Tipo de Persona', field: 'tipoPersona' },
        { title: 'Documento Identidad del Representante', field: 'cedulaRepresentante' },
        { title: 'Nombre Completo del Representante', field: 'nombreRepresentante' },
        { title: 'Telefono/Celular del Representante', field: 'telefonoRepresentante' },
        { title: 'Correo Electronico del Representante', field: 'correoRepresentante' },
        { title: 'Documento Identidad del Contacto', field: 'cedulaContacto' },
        { title: 'Nombre Completo del Contacto', field: 'nombreContacto' },
        { title: 'Telefono/Celular del Contacto', field: 'telefonoContacto' },
        { title: 'Correo Electronico del Contacto', field: 'correoContacto' }
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
            onClick:(event,rowData)=>obtenerProveedor(rowData.id)
          }
        ]}
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proveedor</Modal.Title>
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
                  <h4>REGISTRO DE PROVEEDORES</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={'guardar'}>
                    <div className="row">

                      <div className="col-md-6">
                        <label>Nit de la empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNitEmpresa(e.target.value)} value={nitEmpresa}/>
                      </div>

                      <div className="col-md-6">
                        <label>Nombre de la empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreEmpresa(e.target.value)} value={nombreEmpresa}/>
                      </div>

                      <div className="col-md-6">
                        <label>Direccion de la Empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setDireccionEmpresa(e.target.value)}value={direccionEmpresa} />
                      </div>

                      <div className="col-md-6">
                        <label>Tipo de Persona</label>
                        <select className='form-control' onChange={(e) => setTipoPersonaSelect(e.target.value)}value={tipoPersonaSelect}>
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
                        <label>Documento Identidad del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaRepresentante(e.target.value)} value={cedulaRepresentante}/>
                      </div>

                      <div className="col-md-6">
                        <label>Nombre Completo del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreRepresentante(e.target.value)}value={nombreRepresentante} />
                      </div>

                      <div className="col-md-6">
                        <label>Telefono/Celular del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefonoRepresentante(e.target.value)}value={telefonoRepresentante} />
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreoRepresentante(e.target.value)} value={correoRepresentante}/>
                      </div>

                      <div className="col-md-6">
                        <label>Documento Identidad del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaContacto(e.target.value)}value={cedulaContacto} />
                      </div>

                      <div className="col-md-6">
                        <label>Nombre Completo del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreContacto(e.target.value)} value={nombreContacto}/>
                      </div>

                      <div className="col-md-6">
                        <label>Telefono/Celular del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefonoContacto(e.target.value)} value={telefonoContacto}/>
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreoContacto(e.target.value)} value={correoContacto}/>
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

export default BusquedaProveedor
