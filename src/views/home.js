import React from 'react'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import localStorageService from '../app/service/localstorageService'

import currencyFormatter from 'currency-formatter'

class Home extends React.Component {

    state = {
        saldo: 0,
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        
        const usuarioLogado = localStorageService.obterItem('_usuario_logado') 

        this.usuarioService.obterSaldoUsuario(usuarioLogado.id)
        .then(response => {
            this.setState({saldo: response.data})
        }).catch(erro => {
            console.error(erro.response)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
        <h1 className="display-3">Bem Vindo</h1>
                    <p className="lead">Sistema de Finanças - Receitas e Despesas</p>
                    <p className="lead">Saldo atual é de R$ {currencyFormatter.format(this.state.saldo, { locale: 'pt-BR' })}</p>
                    <hr className="my-4" />
                    <p> Área administrativa, se não possui cadastro, utilize a barra de navegação ou clique no botão abaixo
                   <p className="lead">
                            <a
                                className="btn btn-primary btn-lg mt-4 mr-3"
                                href="#/cadastro-lancamentos"
                                role="button"> <i className="fa fa-users"> Cadastrar Lançamentos </i>
                            </a>
                            <a
                                className="btn btn-danger btn-lg mt-4"
                                href="#/consulta-lancamentos"
                                role="button"> <i className="fa fa-users"> Consultar Lançamentos </i>
                            </a>
                        </p>
                    </p>

                </div>

            </div>
        )
    }
}

export default withRouter(Home)