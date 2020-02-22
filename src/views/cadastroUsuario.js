import React from 'react'
import FormGroup from '../components/form-group'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'

import { mensagemSucesso, mensagemErro } from '../components/toastr'
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

    validar = () => {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório')
        }

        if (!this.state.email) {
            msgs.push('O campo Email é obrigatório')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido')
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Informe a senha duas vezes')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não conferem')
        }
        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();
        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }
        
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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
        this.props.history.push('/login')
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
                                <button type="button" onClick={this.cadastrar} className="btn btn-success mr-3">Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>

                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)