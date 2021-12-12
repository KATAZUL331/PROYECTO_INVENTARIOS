import React, {useState, useEffect} from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown,Form, FormControl, Button } from 'react-bootstrap';

export default function Navegacion() {
const [show, setShow] = useState(true)
//const [menu, setMenu]= useState(false)

useEffect(() => {
    if(sessionStorage.getItem('token')){
        //setMenu(true)
        setShow(false)
    }
},[]);

const salida=()=>{
    sessionStorage.clear()
    window.location.href='/'
}

    return (
        <div>
        <Navbar bg="primary" variant="dark" expand={show}>
        <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand hidden={show} href="#"><i class="fas fa-paw"></i> G7 SYSTEM </Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand hidden={show} href="#"><i class="fas fa-user-check"></i>  Bienvenid@: {sessionStorage.getItem('nombre')} </Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand hidden ={show} href="#" onClick={()=>salida()} to="/"><i class="fas fa-sign-out-alt"></i>  Cerrar Sesión</Navbar.Brand>
        

        <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="start">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Registro" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/admin"><i class="fas fa-sign-in-alt"></i>  Registro Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/usuario"><i class="far fa-user-circle"></i>  Registro Empleados</NavDropdown.Item>
                    <NavDropdown.Item href="/cerrar"><i class="fas fa-sign-out-alt"></i>  Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Sistema" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/cliente">  Clientes</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">  Proveedores</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">  Productos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Listados" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/adminListado"><i class="fas fa-address-book"></i>  Listado de Administradores</NavDropdown.Item>
                    <NavDropdown.Item href="/usuarioListado">  Listado de empleados</NavDropdown.Item>
                    <NavDropdown.Item href="/clienteListado">  listado de Clientes</NavDropdown.Item>
                    
                </NavDropdown>

                <NavDropdown title="Busqueda" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/registrarPersona">Registro Persona</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action5"></NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Busqueda"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Busqueda</Button>
            </Form>
        </Offcanvas.Body>
        </Navbar.Offcanvas>
    </Container>
    </Navbar>
        </div>
    )
}
