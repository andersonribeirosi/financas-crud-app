import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'

import axios from 'axios'

class Login extends React.Component {

    baseUrl = 'http://localhost:8080'

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            this.props.history.push('/home')
        }).catch(erro => {
            console.log(erro.response);
            
        })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input
                                                        value={this.state.email}
                                                        type="email" id="exampleInputEmail1"
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        className="form-control"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite seu Email"></input>
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        type="password"
                                                        id="exampleInputPassword1"
                                                        className="form-control"
                                                        aria-describedby="passwordHelp"
                                                        placeholder="Digite sua Senha"></input>
                                                </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success mr-3" type="button">Entrar</button>
                                                <button onClick={this.cadastrar} className="btn btn-danger" type="button">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Login)