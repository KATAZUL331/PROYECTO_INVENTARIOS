//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegistrarAdmin() {
  const[nombre,setNombre]=useState('')
  const[correo,setCorreo]=useState('')
  const[contrasena,setContrasena]=useState('')
  
  const guardar = async(e)=>{
    e.preventDefault()
    const Admin= {
      nombre,
      correo,
      contrasena,
      admin: sessionStorage.getItem('idAdmin'),
      adminNombre :sessionStorage.getItem('nombre')
    }
    if(nombre===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR NOMBRE DE USUARIO",
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
    else if(contrasena===""){
      Swal.fire({
        icon:'error',
        title:"REGISTRAR CONTRASENA",
        showConfirmButton:false,
        timer:2000
      })
    }
        else {
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/admin/crear',Admin,{
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
      setNombre("");
      setCorreo("");
      setContrasena("");
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
                  <h4>REGISTRO DE ADMINISTRADORES</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={guardar}>
                    <div className="row">

                      <div className="col-md-6">
                        <label>Nombre de Usuario</label>
                        <input type="text" className="form-control required" onChange={(e)=>setNombre(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Correo Electronico</label>
                        <input type="text" className="form-control required" onChange={(e)=>setCorreo(e.target.value)} />
                      </div>

                      <div className="col-md-6">
                        <label>Contrasena</label>
                        <input type="text" className="form-control required" onChange={(e)=>setContrasena(e.target.value)} />
                      </div>

                    </div>
                      <br />
                    <button type="submit" class="btn btn-outline-info">
                      <span class="fa fa-save"></span> Guardar Administrador
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
