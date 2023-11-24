import React, { Component } from "react";
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigator.css'
import Usuario from "./Usuarios/Usuario";
export default class Navigator extends Component {
    state = {
        name: localStorage.getItem("user_name")
    }
    logout = () => {
        const { setLogged, navigate } = this.props;
        localStorage.removeItem("isLogged")
        localStorage.removeItem("user_name")
        localStorage.removeItem("user_id")
        setLogged(false)
        navigate("/")
    }
    render() {
        return (
            <div>
                <Navbar expand="lg" className="custom-navbar">
                    <Container>
                        <Navbar.Brand href="/lugares">El Turista</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/lugares">Lugares</Nav.Link>
                                <NavDropdown title={"User: " + localStorage.getItem("user_name")} id="basic-nav-dropdown" className="custom-dropdown">
                                    <Usuario logout={this.logout} />
                                    <NavDropdown.Item className="colorBlack" href="" onClick={this.logout}>
                                        Cerrar sesión
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* Agrega estilos adicionales según tus necesidades */}
                <div style={{ padding: '10px', marginTop: '10px',}}>
                    <Outlet />
                </div>
            </div>
        );
    }
}