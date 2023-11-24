import React, { Component } from "react";
import { Form, Container, Button, Accordion } from "react-bootstrap";
import axios from "axios";
import './Lugares.css';
import CreateLugar from "./createLugar";

export default class Lugares extends Component {
  state = {
    placeholder: 'Buscar por algún filtro',
    selectedOption: '',
    input: '',
    lugares: [],
  }

  deleteLugar = async (id) =>{
    console.log(id)
    await axios.delete(process.env.REACT_APP_HOSTNAME + "/lugares/"+id)
    window.location.reload();
  }

  handleRadioChange = (option) => {
    this.setState({ selectedOption: option });
  };

  onChangeName = (e) => {
    this.setState({ input: e.target.value });
  }

  handleButtonClick = async () => {
    try {
      let option = this.state.selectedOption;

      if (option === 'Pais') {
        const res = await axios.get(process.env.REACT_APP_HOSTNAME + "/lugares/pais/" + this.state.input);
        this.setState({ lugares: res.data });
      } else if (option === 'Nombre') {
        const res = await axios.get(process.env.REACT_APP_HOSTNAME + "/lugares/" + this.state.input);
        this.setState({ lugares: res.data });
      } else if (option === 'Categoria') {
        const res = await axios.get(process.env.REACT_APP_HOSTNAME + "/lugares/categoria/" + this.state.input);
        this.setState({ lugares: res.data });
      } else {
        alert("Debes elegir una opción de búsqueda");
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="bienvenida">Bienvenido a la aplicación del Turista</h1>
        <p className="bienvenida p">¡Bienvenido a nuestra aplicación de búsqueda de lugares! Descubre nuevos destinos de una manera sencilla y rápida utilizando nuestros tres filtros intuitivos.</p>
        <p className="bienvenida p">Solo tienes que elegir el filtro que se adapte a tu búsqueda, escribir tu consulta y hacer clic en buscar. ¡Prepárate para una emocionante aventura llena de descubrimientos!</p>
        <Container>
          <Form className="text-center">
            <Form.Control type="text" id="inputText1" placeholder={this.state.placeholder} onChange={this.onChangeName} className="text-center mb-3" />

            <div className="d-flex justify-content-between mb-3">
              <Form.Check
                type="radio"
                label="Buscar por País"
                name="radioGroup"
                id="opcion1"
                className="mr-3 text-white"
                onChange={() => this.handleRadioChange('Pais')}
              />
              <Form.Check
                type="radio"
                label="Buscar por Nombre"
                name="radioGroup"
                id="opcion2"
                className="mr-3 text-white"
                onChange={() => this.handleRadioChange('Nombre')}
              />
              <Form.Check
                type="radio"
                label="Buscar por Categoría"
                name="radioGroup"
                id="opcion3"
                className="mr-3 text-white"
                onChange={() => this.handleRadioChange('Categoria')}
              />
            </div>

            <Button className="w-100 mb-4" onClick={this.handleButtonClick}>Buscar</Button>
            <CreateLugar/>
          </Form>
          <Accordion>
            {this.state.lugares.map(lugar => (
              <Accordion.Item key={lugar._id} eventKey={lugar._id}>
                <Accordion.Header>{lugar.nombre}</Accordion.Header>
                <Accordion.Body>
                  <strong>Categoría:</strong> {lugar.categoria} <br />
                  <strong>Dirección:</strong> {lugar.direccion} <br />
                  <strong>Horario:</strong> {lugar.horario} <br />
                  <strong>País:</strong> {lugar.pais} <br />
                  <strong>Teléfono:</strong> {lugar.telefono} <br />
                  <strong>Latitud:</strong> {lugar.latitud} <br />
                  <strong>Longitud:</strong> {lugar.longitud} <br />
                  <CreateLugar lugar={lugar}/>
                  <Button variant="danger" className="w-100 mb-4" onClick={()=> this.deleteLugar(lugar.nombre)}>Eliminar</Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
    );
  }
}
