import React, {useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function Admin() {

    const [nombre, setNombre]=useState('')
    const [correo, setCorreo]=useState('')
    const [contrasena, setContrasena]=useState('')

    const GuardarAdmin=async(e)=>{
        e.preventDefault()
            const Admin={
            nombre,
            correo,
            contrasena,
        }

        if(nombre===' '){
            Swal.fire({
                icon: 'error',
                title: 'Digitar nombre de usuario',
                showConfirmButton: false,
                timer: 4000
            })
        }else{
            const token = sessionStorage.getItem('token')
            const respuesta = await Axios.post('/admin/crear',Admin,
            {
                headers: {'autorizar':token}
            })
            const mensaje=respuesta.data.mensaje
            console.log(mensaje)

            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 4000
            })
            e.target.reset();
            setNombre('');
            setCorreo('');
            setContrasena('')
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
                        <form onSubmit={GuardarAdmin}>
                        <div className="row">
                            <div className="form-group">
                            <label>Nombre Usuario</label>
                            <input type="text" className="form-control required" OnChange={(e)=> setNombre(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                            <label>Correo Electrónico</label>
                            <input type="text" className="form-control required" OnChange={(e)=> setCorreo(e.target.value)}/>
                            </div>

                            <div className="col-md-6" >
                            <label>Contraseña</label>
                            <input type="text" className="form-control required" OnChange={(e)=> setContrasena(e.target.value)}/>
                            </div>

                        </div>
                        <br/>
                        <button type="submit" class="btn btn-outline-success" >
                            <span class="fa fa-save"></span> Guardar
                        </button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
}
