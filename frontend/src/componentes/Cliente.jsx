//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegistrarCliente() {
  const[nombres,setNombres]=useState('')
  const[apellidos,setApellidos]=useState('')
  const[cedulaCliente,setCedulaCliente]=useState('')
  const[correo,setCorreo]=useState('')
  const[telefono,setTelefono]=useState('')
  const[empresa,setEmpresa]=useState('')
  const[direccion,setDireccion]=useState('')
  const[fechaNacimiento,setFechaNacimiento]=useState('')
  
  const[genero,setGenero]=useState([])
  const[generoSelect,setGeneroSelect]=useState([])

  const[cargo,setCargo]=useState([])
  const[cargoSelect,setCargoSelect]=useState([])
  
  const[tipoPersona,setTipoPersona]=useState([])
  const[tipoPersonaSelect,setTipoPersonaSelect]=useState([])


  useEffect(()=>{
    setCargo(['Seleccionar','Representante Legal', 'Auxiliar','Jefe','Tecnico','Profesional','Vendedor', 'Comprador'])
    setCargoSelect('Seleccionar')

    setTipoPersona(['Seleccionar','Natural','Juridica'])
    setTipoPersonaSelect('Seleccionar')

    setGenero(['Seleccionar','Femenino','Masculino'])
    setGeneroSelect('Seleccionar')

  },[])


  const guardar = async(e)=>{
    e.preventDefault()
    const Cliente= {
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
    admin: sessionStorage.getItem('idAdmin'),
    adminNombre :sessionStorage.getItem('nombre')
    }
    if(nombres===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NOMBRES",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(apellidos===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR APELLIDOS",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(cedulaCliente===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NUMERO DE DOCUMENTO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(fechaNacimiento===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR FECHA DE NACIMIENTO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(correo===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CORREO ELECTRONICO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(telefono===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NUMERO DE TELEFONO FIJO/CELULAR",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(empresa===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR EMPRESA DE TRABAJO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else if(direccion===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR DIRECCION DE LA EMPRESA",
        showConfirmButton:false,
        timer:2000
      })
    }
    else {
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/Cliente/crear',Cliente,{
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
      setNombres("");
      setApellidos("");
      setCedulaCliente("");
      setCorreo("");
      setTelefono("");
      setEmpresa("");
      setDireccion("");
      setFechaNacimiento("");
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
                  <h4>REGISTRO DE CLIENTES</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={guardar}>
                    <div className="row">

                      <div className="col-md-6">
                        <label>Nombres</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombres(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Apellidos</label>
                        <input type="text" className="form-control required" onChange={(e)=>setApellidos(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Documento de Identidad</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaCliente(e.target.value)} />
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
                        <label>Genero</label>
                        <select className='form-control' onChange={(e) => setGeneroSelect(e.target.value)}>
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
                        <input type="text" className="form-control required" onChange={(e)=>setFechaNacimiento(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreo(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Telefono</label>
                        <input type="text" className="form-control required" onChange={(e)=>setTelefono(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Cargo</label>
                        <select className='form-control' onChange={(e) => setCargoSelect(e.target.value)}>
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
                        <input type="text" className="form-control required" onChange={(e)=>setEmpresa(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Direccion</label>
                        <input type="text" className="form-control required" onChange={(e)=>setDireccion(e.target.value)} />
                      </div>
                    </div>
                      <br />
                    <button type="submit" class="btn btn-outline-info">
                      <span class="fa fa-save"></span> Guardar Cliente
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
