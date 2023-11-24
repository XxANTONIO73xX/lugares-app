import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default class CreateLugar extends Component {
    state = {
        show: false,
        title: 'Agrega Un Lugar',
        btnLabel: 'Agregar Lugar',
        btnColor: 'success',
        lugar: {
            nombre: '',
            direccion: '', 
            horario: '',
            telefono: '',
            categoria: '',
            pais: '',
            latitud: '',
            longitud:''
        },
        user_id: localStorage.getItem("user_id"),
    }
    async componentDidMount(){
        const {lugar} = this.props
        if(lugar){
            this.setState({
                title: 'Modificar Lugar ' + lugar.nombre,
                btnLabel: "Editar",
                btnColor: 'secondary',
                lugar: {
                    nombre: lugar.nombre,
                    direccion: lugar.direccion, 
                    horario: lugar.horario,
                    telefono: lugar.telefono,
                    categoria: lugar.categoria,
                    pais: lugar.pais,
                    latitud: lugar.latitud,
                    longitud: lugar.longitud
                },
            })
        }
    }

    onInputChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState)=>({
            lugar:{
                ...prevState.lugar,
                [name]: value
            }
        }))
    }
    onSubmit = async (e)=>{
        e.preventDefault();
        const {lugar} = this.props
        const newLugar ={
            nombre: this.state.lugar.nombre,
            direccion: this.state.lugar.direccion,
            horario: this.state.lugar.horario,
            telefono: this.state.lugar.telefono,
            categoria: this.state.lugar.categoria,
            pais: this.state.lugar.pais,
            latitud: this.state.lugar.latitud,
            longitud: this.state.lugar.longitud,
        }
        if(lugar){
            // esta editando
            await axios.put(process.env.REACT_APP_HOSTNAME+"/lugares/"+lugar._id, newLugar)
        }else{
            newLugar.idUsuario = localStorage.getItem("user_id")
            await axios.post(process.env.REACT_APP_HOSTNAME+"/lugares",newLugar)
        }
        window.location.reload();
    }
    HandleClose = () => this.setState({ show: false });
    HandleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <Button className="w-100 mb-4" variant={this.state.btnColor} onClick={this.HandleShow}>
                    {this.state.btnLabel}
                </Button>
                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                        <div className="form-group mb-2">
                            <label className="mb-2">Nombre</label>
                            <input type="text" className="form-control" placeholder="Cubana Escuela Ballet" required name="nombre"
                                onChange={this.onInputChange} value={this.state.lugar.nombre}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Dirección</label>
                            <input type="text" className="form-control" placeholder="C. Once 887, Camilo Flores, 22830 Ensenada, B.C." required name="direccion"
                                onChange={this.onInputChange} value={this.state.lugar.direccion}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Horario</label>
                            <input type="text" className="form-control" placeholder="10:00 a.m - 3:00 p.m." required name="horario"
                                onChange={this.onInputChange} value={this.state.lugar.horario}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Telefono</label>
                            <input type="email" className="form-control" placeholder="646 178 3100" required name="telefono"
                                onChange={this.onInputChange} value={this.state.lugar.telefono}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Categoría</label>
                            <input type="text" className="form-control" placeholder="Escuela" required name="categoria"
                                onChange={this.onInputChange} value={this.state.lugar.categoria}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">País</label>
                            <input type="text" className="form-control" placeholder="Cuba" required name="pais"
                                onChange={this.onInputChange} value={this.state.lugar.pais}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Latitud</label>
                            <input type="text" className="form-control" placeholder="31.87240597594142" required name="latitud"
                                onChange={this.onInputChange} value={this.state.lugar.latitud}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Longitud</label>
                            <input type="text" className="form-control" placeholder="-116.61785391678477" required name="longitud"
                                onChange={this.onInputChange} value={this.state.lugar.longitud}
                            />
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.HandleClose}>
                                Cancelar
                            </Button>
                            <Button variant="success" onClick={this.onSubmit}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}