import axios from "axios";
import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';

export default class DeleteUser extends Component {
    state = {
    }

    onDelete = async (e) =>{
        const {logout} = this.props
        const res = await axios.delete(process.env.REACT_APP_HOSTNAME + "/users/" + localStorage.getItem("user_id"))
        if(res.data.message === "Usuario Eliminado"){
            alert(res.data.message)
            logout()
        }else{
            alert("Hubo un error")
        }
    }

    HandleClose = () => this.setState({ show: false });
    HandleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <Button variant="danger" onClick={this.HandleShow}>
                    Borrar tu Cuenta
                </Button>
                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alerta!</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <h4>¿Estas seguro?</h4>
                            <p>Estas apunto de eliminar tu cuenta permanentemente</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.HandleClose}>
                                Cancelar
                            </Button>
                            <Button type="button" variant="danger" onClick={this.onDelete}>
                                Borrar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}