//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegistrarPersona() {
  const[nombres,setNombres]=useState('')
  const[apellidos,setApellidos]=useState('')
  const[cargo,setCargo]=useState([])
  const[cargoSelect,setCargoSelect]=useState([])
  const[tipoContrato,setTipoContrato]=useState([])
  const[tipoContratoSelect,setTipoContratoSelect]=useState([])


  useEffect(()=>{
    setCargo(['No vacunado','Vacunado','Primera dosis'])
    setCargoSelect('No vacunado')

    setTipoContrato(['Ninguna','Primera dosis','Segunda dosis','Esquema completo'])
    setTipoContratoSelect('Ninguna')
  },[])


  const guardar = async(e)=>{
    e.preventDefault()
    const usuario= {
      nombres,
      apellidos,
      cargo:cargoSelect,
      tipoContrato: tipoContratoSelect,
      admin: sessionStorage.getItem('idAdmin'),
      adminNombre :sessionStorage.getItem('nombre')
    }
    if(nombres===""){
      Swal.fire({
        icon:'error',
        title:"Debe escribir un nombre",
        showConfirmButton:false,
        timer:1500
      })
    }
    else if(apellidos===""){
      Swal.fire({
        icon:'error',
        title:"Debe escribir un apellido",
        showConfirmButton:false,
        timer:1500
      })
    }
    else {
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/usuario/crear',usuario,{
      headers:{'autorizacion':token}
      })
      const mensaje= respuesta.data.mensaje
      console.log(mensaje)

      Swal.fire({
        icon:'success',
        title:mensaje,
        showConfirmButton:false,
        timer:1500
      })

      e.target.reset();
      setNombres("");
      setApellidos("");
    }
  }

  return (
  <div className="container mt-4">
          <div className="row">
            <div className="col-md-7  mx-auto">
              <div className="card">
                <div className="container text-center fa-5x">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="card-header bg-info text-center">
                  <h4>Registrar paciente</h4>
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


                      {/* <div className="col-md-6">
                        <label>Cedula</label>
                        <input type="text" className="form-control required" />
                      </div> */}


                      {/* <div className="col-md-6">
                        <label>Telefono</label>
                        <input type="text" className="form-control required" />
                      </div> */}

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
