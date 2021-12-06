import MaterialTable from 'material-table';
import React, {useState, useEffect} from 'react'
import Axios from 'axios';

function BusquedaUsuario() {

    const [usuarios, setUsuarios]=useState([])//arreglo
    const [nombres, setNombres]=useState('')
    const [apellidos, setApellidos]=useState('')
    const [cedulaUsuario, setCedulaUsuario]=useState('')
    const [correoElectronico, setCorreoElectronico]=useState('')
    const [telefono, setTelefono]=useState('')
    const [cargo, setCargo]=useState([])//arreglo
    const [cargoSelect, setCargoSelect]=useState([])//arreglo
    const [tipoContrato, setTipoContrato]=useState([])//arreglo
    const [tipoContratoSelect, setTipoContratoSelect]=useState([])//arreglo
    const [jefeInmediato, setJefeInmediato]=useState('')

    useEffect(()=>{
        usuarioListado()
    },[])

    const usuarioListado = async()=>{

        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')
        const respuesta =await Axios.get('/usuario/listarUsuario/'+id,{
            headers: {'autorizar':token}
        })
        console.log(respuesta)
        setUsuarios(respuesta.data)
    }
    //RECORRA LA BASE
    const data =
    usuarios.map((usuario)=>({
        id:usuario._id,
        nombres:usuario.nombres,
        apellidos:usuario.apellidos,
        cedulaUsuario:usuario.cedulaUsuario,
        correoElectronico:usuario.correoElectronico,
        cargo:usuario.cargo,
        telefono:usuario.telefono,
        tipoContrato:usuario.telefono,
        jefeInmediato:usuario.jefeInmediato
    }))

//TABLAS
    return (
        
        <div className="container">
            <br/>
            <br/>
        <MaterialTable
            title=" USUARIOS"
            columns={[
            //TITULO DE LAS COLUMNAS     
            { title: 'ID', field: 'id' },
            { title: 'Nombre Completo', field: 'nombres' },
            { title: 'Apellido Completo', field: 'apellidos' },
            { title: 'Documento de Identidad', field: 'cedulaUsuario' },
            { title: 'Correo Electrónico', field: 'correoElectronico' },
            { title: 'Cargo', field: 'cargo' },
            { title: 'Telefono/Celular', field: 'telefono' },
            { title: 'Tipo de Contrato', field: 'tipoContrato' },
            { title: 'Jefe Inmediato', field: 'jefeInmediato' }
            ]}
            data={data}
            
            options={{
            search: true
            }}

            actions={[
                {
                    icon:'delete',
                    tooltip:'Eliminar'
                    //onclick:(event, rowData)=>eliminarUsuario(rowData.id)
                }
            ]}
        />
        </div>
    )
}

export default BusquedaUsuario
