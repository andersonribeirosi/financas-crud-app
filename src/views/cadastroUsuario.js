import React from 'react'
import FormGroup from '../components/form-group'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'
import {mensagemErro, mensagemSucesso} from '../../src/components/toastr'
import UsuarioService from '../app/service/usuarioService'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService;
    }


    cadastrar = () => {
            const {nome, email, senha, senhaRepeticao } = this.state 

            const usuario = { nome, email, senha, senhaRepeticao }
        try {
            this.service.validarCampos(usuario)
        } catch (error) {
            const msgs = error.msgsError
            msgs.forEach(msgs => mensagemErro(msgs));
            return false;
        }
        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input
                                        className="form-control"
                                        id="inputNome"
                                        type="text"
                                        name="nome"
                                        onChange={e => this.setState({ nome: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input
                                        className="form-control"
                                        id="inputEmail"
                                        type="email"
                                        name="email"
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input
                                        className="form-control"
                                        id="inputSenha"
                                        type="password"
                                        name="senha"
                                        onChange={e => this.setState({ senha: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                    <input
                                        className="form-control"
                                        id="inputRepitaSenha"
                                        type="password"
                                        name="senha"
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                                </FormGroup>
                                <button type="button" onClick={this.cadastrar} className="btn btn-success mr-3"><i className="pi pi-check mr-1"></i>Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times mr-1"></i>Cancelar</button>
                            </div>
                        </div>
                    </div>

                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)