import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function Usuario() {
    const [nombres, setNombres]=useState('')
    const [apellidos, setApellidos]=useState('')
    const [cedulaUsuario, setCedulaUsuario]=useState('')
    const [correoElectronico, setCorreoElectronico]=useState('')
    const [telefono, setTelefono]=useState('')
    const [cargo, setCargo]=useState([])
    const [cargoSelect, setCargoSelect]=useState([])
    const [tipoContrato, setTipoContrato]=useState([])
    const [tipoContratoSelect, setTipoContratoSelect]=useState([])
    const [jefeInmediato, setJefeInmediato]=useState('')

    useEffect(()=>{
        setCargo(['Tecnico','Administrador','Auxiliar', 'Jefe'])
        setCargoSelect('Seleccionar Dato')

        setTipoContrato  (['Término Fijo','Término indefinido','Obra o labor','Prestacion de Servicios','Aprendizaje'])
        setTipoContratoSelect('Seleccionar Dato')
    },[])

    const GuardarUsuario=async(e)=>{
        e.preventDefault()
        const Usuario={
            nombres,
            apellidos,
            cedulaUsuario,
            correoElectronico: sessionStorage.getItem('correo'),
            cargo:cargoSelect,
            telefono,
            tipoContrato:tipoContratoSelect,
            jefeInmediato
        }

        if(nombres===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar nombres completos',
                showConfirmButton: false,
                timer: 4000
            })
        } 
        else if(apellidos===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar apellidos completos',
                showConfirmButton: false,
                timer: 4000
            })
        } 
        else if(cedulaUsuario===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar numero seguido',
                showConfirmButton: false,
                timer: 4000
            })
        }
        else if(correoElectronico===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar correo electronico',
                showConfirmButton: false,
                timer: 4000
            })
        } 
        else if(telefono===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar numero fijo o celular',
                showConfirmButton: false,
                timer: 4000
            })
        } 

        else if(jefeInmediato===""){

            Swal.fire({
                icon: 'error',
                title: 'Digitar nombre completo de su jefe',
                showConfirmButton: false,
                timer: 4000
            })
        } 
        else{
            const token = sessionStorage.getItem('token')
            const respuesta = await Axios.post('/usuario/crear',Usuario,
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
            setNombres("");
            setApellidos("");
            setCedulaUsuario("");
            setTelefono("");
            setCorreoElectronico("");
            setJefeInmediato("");
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
                    <h4>REGISTRO DE USUARIOS</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={GuardarUsuario}>
                    <div className="row">

                        <div className="col-md-6">
                        <label>Documento de Identidad</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setCedulaUsuario(e.target.value)} />
                        </div>

                        <div className="form-group">
                        <label>Nombres Completos</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setNombres(e.target.value)} />
                        </div>

                        <div className="form-group">
                        <label>Apellidos Completos</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setApellidos(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                        <label>Correo Electrónico</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setCorreoElectronico(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                        <label>telefono/celular</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setTelefono(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                        <label>Cargo</label>
                        <select className='form-control' OnChange={(e)=> setCargoSelect(e.target.value)}>
                            {cargo.map(cargo=>
                                (<option key={cargo}>
                                    {cargo}
                                </option>
                                ))
                            }
                        </select>
                        </div>

                        <div className="col-md-6">
                        <label>Tipo Contrato</label>
                        <select className='form-control' OnChange={(e)=> setTipoContratoSelect(e.target.value)}>
                            {tipoContrato.map(tipoContrato=>
                                (<option key={tipoContrato}>
                                    {tipoContrato}
                                </option>
                                ))
                            }
                        </select>
                        </div>

                        <div className="form-group">
                        <label>Jefe Inmediato</label>
                        <input type="text" className="form-control required" OnChange={(e)=> setJefeInmediato(e.target.value)} />
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