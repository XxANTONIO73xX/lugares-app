import axios from "axios";
import React, { Component } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Modal, Form } from 'react-bootstrap';
import DeleteUser from "./deleteUser";

export default class Usuario extends Component {
    state = {
        name: '',
        nickname: '',
        logout: ''
    }
    async componentDidMount() {
        const res = await axios.get(process.env.REACT_APP_HOSTNAME + "/users/" + localStorage.getItem("user_id"))
        this.setState({ name: res.data.name, nickname: res.data.nickname })
        const {logout} = this.props
        this.setState({logout: logout})
    }

    onUpdate = async (e) =>{
        const res = await axios.put(process.env.REACT_APP_HOSTNAME + "/users/" + localStorage.getItem("user_id"), 
        {name: this.state.name, nickname: this.state.nickname})
        if(res.data.message === "Usuario Modificado"){
            alert(res.data.message)
            localStorage.setItem("user_name", this.state.name)
        }else{
            alert("Hubo un error")
        }
        window.location.reload();
    }

    onChangeName = (e) =>{
        this.setState(
            {name: e.target.value}
        )
    }

    onChangeNickname = (e) =>{
        this.setState(
            {nickname:  e.target.value}
        )
    }

    HandleClose = () => this.setState({ show: false });
    HandleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <NavDropdown.Item className="colorBlack" onClick={this.HandleShow}>
                    Configuración
                </NavDropdown.Item>
                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configuración Usuario</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={this.onChangeName}
                                    value={this.state.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control type="text" onChange={this.onChangeNickname}
                                    value={this.state.nickname}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <DeleteUser logout={this.state.logout}/>
                            <Button variant="secondary" onClick={this.HandleClose}>
                                Cancelar
                            </Button>
                            <Button type="button" variant="success" onClick={this.onUpdate}>
                                Modificar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}