import React from 'react'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import currencyFormatter from 'currency-formatter'
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component {

    state = {
        saldo: 0,
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        
        // const usuarioLogado = localStorageService.obterItem('_usuario_logado') 
        const usuarioLogado = this.context.usuarioAutenticado
        

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
                                role="button"> <i className="pi pi-plus mr-1"></i> Cadastrar Lançamentos
                            </a>
                            <a
                                className="btn btn-danger btn-lg mt-4"
                                href="#/consulta-lancamentos"
                                role="button"> <i className="pi pi-search mr-1"></i> Consultar Lançamentos
                            </a>
                        </p>
                    </p>

                </div>

            </div>
        )
    }
}

Home.contextType = AuthContext

export default withRouter(Home)