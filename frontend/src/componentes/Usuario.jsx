//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegistrarUsuario() {
  const[nombres,setNombres]=useState('')
  const[apellidos,setApellidos]=useState('')
  const[cedulaUsuario,setCedulaUsuario]=useState('')
  const[telefono,setTelefono]=useState('')
  const[correo,setCorreo]=useState('')
  const[jefeInmediato,setJefeInmediato]=useState('')

  const[cargo,setCargo]=useState([])
  const[cargoSelect,setCargoSelect]=useState([])
  
  const[tipoContrato,setTipoContrato]=useState([])
  const[tipoContratoSelect,setTipoContratoSelect]=useState([])


  useEffect(()=>{
    setCargo(['Seleccionar','Auxiliar','Jefe','Tecnico','Profesional','Vendedor', 'Comprador'])
    setCargoSelect('Seleccionar')

    setTipoContrato(['Seleccionar','Fijo','Prestacion de Servicios','Aprendizaje','Indefinido'])
    setTipoContratoSelect('Seleccionar')
  },[])


  const guardar = async(e)=>{
    e.preventDefault()
    const usuario= {
      nombres,
      apellidos,
      cedulaUsuario,
      correo,
      telefono,
      jefeInmediato,
      cargo:cargoSelect,
      tipoContrato: tipoContratoSelect,
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
    else if(cedulaUsuario===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NUMERO DE DOCUMENTO",
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
    else if(jefeInmediato===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR SU JEFE INMEDIATO",
        showConfirmButton:false,
        timer:2000
      })
    }
    else {
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/usuario/crear',usuario,{
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
      setCedulaUsuario("");
      setCorreo("");
      setTelefono("");
      setJefeInmediato("");
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
                  <h4>REGISTRO DE EMPLEADOS</h4>
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
                        <input type="text" className="form-control required" onChange={(e)=>setCedulaUsuario(e.target.value)} />
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
                        <label>Tipo de Contrato</label>
                        <select className='form-control' onChange={(e) => setTipoContratoSelect(e.target.value)}>
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
                        <input type="text" className="form-control required" onChange={(e)=>setJefeInmediato(e.target.value)} />
                      </div>
                    </div>
                      <br />
                    <button type="submit" class="btn btn-outline-info">
                      <span class="fa fa-save"></span> Guardar Empleado
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
