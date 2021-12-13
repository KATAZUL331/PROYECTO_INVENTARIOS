//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegistrarProveedor() {
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


  useEffect(()=>{
    setTipoPersona(['Seleccionar','Natural','Juridica'])
    setTipoPersonaSelect('Seleccionar')
  },[])


  const guardar = async(e)=>{
    e.preventDefault()
    const proveedor= {
      nitEmpresa,
      nombreEmpresa,
      direccionEmpresa,
      tipoPersona:tipoPersonaSelect,
      cedulaRepresentante,
      nombreRepresentante,
      telefonoRepresentante,
      correoRepresentante,
      cedulaContacto,
      nombreContacto,
      telefonoContacto,
      correoContacto,
      admin: sessionStorage.getItem('idAdmin'),
      adminNombre :sessionStorage.getItem('nombre')
    }
    if(nitEmpresa===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NIT DE LA EMPRESA",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(nombreEmpresa===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NOMBRE DE LA EMPRESA",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(direccionEmpresa===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR DIRECCION DE LA EMPRESA",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(cedulaRepresentante===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CEDULA DEL REPRESENTANTE",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(nombreRepresentante===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NOMBRE COMPLETO DEL REPRESENTANTE LEGAL",
        showConfirmButton:false,
        timer:2000
      })
    }else if(telefonoRepresentante===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR TELEFONO/CELULAR DEL REPRESENTANTE",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(correoRepresentante===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CORREO ELECTRONICO DEL REPRESENTANTE",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(cedulaContacto===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CEDULA DEL CONTACTO" ,
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(nombreContacto===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NOMBRE DEL CONTACTO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(telefonoContacto===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR TELEFONO/CELULAR DEL CONTACTO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(correoContacto===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CORREO ELECTRONICO DEL CONTACTO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else {
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/proveedor/crear',proveedor,{
      headers:{'autorizar':token}
      })
      const mensaje= respuesta.data.mensaje
      console.log(mensaje)

      Swal.fire({
        icon:'success',
        title:mensaje,
        showConfirmButton:false,
        timer:2000
      })

      e.target.reset();
      setNitEmpresa("");
      setNombreEmpresa("");
      setDireccionEmpresa("");
      setCedulaRepresentante("");
      setNombreRepresentante("");
      setTelefonoRepresentante("");
      setCorreoRepresentante("");
      setCedulaContacto("");
      setNombreContacto("");
      setTelefonoContacto("");
      setCorreoContacto("");
    }
  }

  return (
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
                  <form onSubmit={guardar}>
                    <div className="row">

                      <div className="col-md-6">
                        <label>Nit de la empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNitEmpresa(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Nombre de la empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreEmpresa(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Direccion de la Empresa</label>
                        <input type="text" className="form-control required" onChange={(e)=>setDireccionEmpresa(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Tipo de Persona</label>
                        <select className='form-control' onChange={(e) => setTipoPersonaSelect(e.target.value)}>
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
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaRepresentante(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Nombre Completo del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreRepresentante(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Telefono/Celular del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefonoRepresentante(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico del Representante</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreoRepresentante(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Documento Identidad del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaContacto(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Nombre Completo del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombreContacto(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Telefono/Celular del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefonoContacto(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico del Contacto</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreoContacto(e.target.value)} />
                      </div>
                    </div>
                      <br />
                    <button type="submit" class="btn btn-outline-info">
                      <span class="fa fa-save"></span> Guardar Proveedor
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
