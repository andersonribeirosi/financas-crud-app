import React from 'react'
import FormGroup from '../components/form-group'
import Card from '../components/card'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        console.log(this.state);
        
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
                            onChange={e => this.setState({nome: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label="Email: *" htmlFor="inputEmail">
                            <input
                            className="form-control"
                            id="inputEmail" 
                            type="email"
                            name="email" 
                            onChange={e => this.setState({email: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input
                            className="form-control"
                            id="inputSenha" 
                            type="password"
                            name="senha" 
                            onChange={e => this.setState({senha: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                            <input
                            className="form-control"
                            id="inputRepitaSenha" 
                            type="password"
                            name="senha" 
                            onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                        </FormGroup>
                        <button type="button" onClick={this.cadastrar} className="btn btn-success mr-3">Salvar</button>
                        <button type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
            
            </Card>
            </div>
        )
    }
}

export default CadastroUsuario