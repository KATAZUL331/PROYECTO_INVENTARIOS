import React, {useState, useEffect} from 'react'

export default function Usuario() {
    const [nombres, setNombre]=useState('')
    const [apellidos, setApellidos]=useState('')
    const [cedulaUsuario, setCedulaUsuario]=useState('')
    const [cargo, setCargo]=useState([])
    const [tipoContrato, setTipoContrato]=useState([])
    const [cedulaJefe, setCedulaJefe]=useState('')
    const [jefeInmediato, setJefeInmediato]=useState('')

    useEffect(()=>{
        setCargo(['Tecnico','Administrador','Auxiliar'])
        setTipoContrato  
    })



    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-md-7  mx-auto">
                <div className="card">
                <div className="container text-center fa-5x">
                    <i className="fas fa-user-plus"></i>
                </div>
                <div className="card-header bg-info text-center">
                    <h4>Usuarios</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={"guardar"}>
                    <div className="row">
                        <div className="col-md-6">
                        <label>Usuario</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Correo Electrónico</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Contraseña</label>
                        <input type="text" className="form-control required" />
                        </div>

                    </div>
                    <br/>
                    <button type="submit" class="btn btn-outline-info">
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
