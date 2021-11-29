import React from 'react'

export default function Clientes() {
    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-md-7  mx-auto">
                <div className="card">
                <div className="container text-center fa-5x">
                    <i className="fas fa-user-plus"></i>
                </div>
                <div className="card-header bg-info text-center">
                    <h4>Clientes</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={"guardar"}>
                    <div className="row">
                        
                        <div className="col-md-6">
                        <label>Nombres Completos</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Apellidos Completos</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Razon Social</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Correo Electrónico</label>
                        <input type="text" className="form-control required" />
                        </div>

                        <div className="col-md-6">
                        <label>Telefono</label>
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
