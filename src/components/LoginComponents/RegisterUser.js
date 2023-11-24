import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import './LoginUser.css'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default class RegisterUser extends Component {
    state = {
        name: '',
        nickname: '',
        password: '',
        loading: false,
        cargando: 'Registrarse'
    }
    createAccount = async e => {
        this.setState({loading: true, cargando:"Cargando..."})
        e.preventDefault();
        const res = await axios.post(process.env.REACT_APP_HOSTNAME+'/users', {
            name: this.state.name,
            nickname: this.state.nickname,
            password: this.state.password
        });
        alert(res.data.message)
        this.setState({loading: false, cargando:"Registrarse"})
        window.location.href = "/"
    }

    onChangeNickname = (e) =>{
        this.setState({
            nickname: e.target.value
        })
    }
    onChangePassword = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeName = (e) =>{
        this.setState({
            name: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="title-login">
                    <h1>El turista</h1>
                </div>
                <form className="container-login" onSubmit={this.createAccount}>
                    <div >
                        <h3 className="log">Registro</h3>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={this.onChangeName} value={this.state.name} placeholder="e.g. Juna" type="text" className="form-control" />
                        <label className="form-label">Nombre</label>
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
                        <p>Ya tienes cuenta? <Link to="/">Iniciar Sesión</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}