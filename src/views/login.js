import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import { mensagemErro, mensagemSucesso } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            // LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
            mensagemSucesso('Usuário logado com sucesso!')
        }).catch(erro => {
           return mensagemErro(erro.response.data)
        })
    }

    cadastrar = () => {
        this.props.history.push('/consulta-produtos')
    }

    render() {
        return (
            <form>
            <div className="container-fluid">
                <div className="form-group row">
                    <div className="col-md-6" style={{ position: 'relative', margin: 'auto' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="form-group row">
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
                                                <button onClick={this.entrar} className="btn btn-success mr-3" type="button"><i className="pi pi-sign-in mr-1"></i>Entrar</button>
                                                <button onClick={this.cadastrar} className="btn btn-danger" type="button"><i className="pi pi-plus mr-1"></i>Cadastrar</button>
                                            </fieldset>
                                            
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            

                        </div>
                    </div>
                </div>

            </div>
            </form>
        )
    }
}

Login.contextType = AuthContext

export default withRouter(Login)