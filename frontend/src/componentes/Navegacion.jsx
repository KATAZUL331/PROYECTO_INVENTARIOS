import React from 'react'
import { Navbar, Container, Offcanvas, Nav, NavDropdown,Form, FormControl, Button } from 'react-bootstrap';

export default function Navegacion() {
    return (
        <div>
        <Navbar bg="primary" variant="dark" expand={false}>
        <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand href="#"><i class="fas fa-paw"></i> INVENTARIO MASTER</Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"><i class="fas fa-user-check"></i>  Bienvenid@ Nombre</Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"><i class="fas fa-sign-out-alt"></i>  Cerrar Sesión</Navbar.Brand>

        <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="start">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Perfil" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/admin"><i class="fas fa-sign-in-alt"></i>  Login</NavDropdown.Item>
                    <NavDropdown.Item href="/usuario"><i class="far fa-user-circle"></i>  Usuario</NavDropdown.Item>
                    <NavDropdown.Item href="/cerrar"><i class="fas fa-sign-out-alt"></i>  Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Sistema" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/cliente">Clientes</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action5"></NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Listados" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/usuarioListado">Listado de Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/clienteListado">listado de Clientes</NavDropdown.Item>
                    <NavDropdown.Item href="#action5"></NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Busqueda" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action5"></NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Offcanvas.Body>
        </Navbar.Offcanvas>
    </Container>
    </Navbar>
        </div>
    )
}