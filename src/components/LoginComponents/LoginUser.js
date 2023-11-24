import React, { Component } from "react";
import axios from "axios";
import './LoginUser.css'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
export default class LoginUser extends Component {
    state = {
        nickname: '',
        password: '',
        loading: false,
        cargando: 'Iniciar Sesión',
    }
    componentDidMount() {
        // Verificar si ya está logueado
        const isLogged = localStorage.getItem('isLogged');
        if (isLogged) {
            this.props.navigate('/lugares');
        }
    }
    getLogin = async e => {
        this.setState({loading: true, cargando:"Cargando..."})
        e.preventDefault();
        const { setLogged, navigate } = this.props;
        const res = await axios.post(process.env.REACT_APP_HOSTNAME + '/users/login', {
            nickname: this.state.nickname,
            password: this.state.password
        });

        if (res.data.goIn === 1) {
            alert("inicio exitoso")
            setLogged(true); // Cambia isLogged a true en App
            localStorage.setItem("isLogged", true)
            localStorage.setItem("user_name", res.data.user.name)
            localStorage.setItem("user_id", res.data.user._id)
            this.setState({loading: false, cargando:"Iniciar Sesión"})
            navigate('/lugares'); // Navega a /contactos
        } else {
            alert("Usuario o contraseña incorrectos")
            this.setState({loading: false, cargando:"Iniciar Sesión"})
        }
    }

    onChangeNickname = (e) => {
        this.setState({
            nickname: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="title-login">
                    <h1>El Turista</h1>
                </div>
                <form className="container-login" onSubmit={this.getLogin}>
                    <div >
                        <h3 className="log">Iniciar Sesión</h3>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={this.onChangeNickname} value={this.state.nickname} placeholder="e.g. Juna99" type="text" className="form-control" />
                        <label className="form-label">Nickname</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={this.onChangePassword} value={this.state.password} placeholder="******" type="password" className="form-control" />
                        <label className="form-label">Password</label>
                    </div>
                    <Button type="submit" variant="primary" className="mb-4" disabled={this.state.loading}>
                    {this.state.loading && (
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        )}
                        <span className="visually">{this.state.cargando}</span>
                    </Button>
                    <div className="text-center">
                        <p>No tienes cuenta? <Link to="/resgistro">Registrate Aqui</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}