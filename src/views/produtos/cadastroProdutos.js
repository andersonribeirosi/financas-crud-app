import React from 'react'
import SelectMenu from '../../components/selectMenu'
import FormGroup from '../../components/form-group'
import Card from '../../components/card'
import ProdutoService from '../../app/service/produtoService'
import {withRouter} from 'react-router-dom'
import * as mensagens from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroProdutos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        quantidade: '', //ano
        usuario: null,
        dataCadastro: '',
        atualizando: false
    }

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando: true})
            })
        }
        
    }

    cancelar = () => {
    this.props.history.push('/consulta-produtos')
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, valor, quantidade, dataCadastro } = this.state;
        const produto = { descricao, valor, quantidade, dataCadastro, usuario: usuarioLogado.id};
        try {
                this.service.validarCampos(produto)
        } catch (erro) {
                const erroMsg = erro.msgsError
                erroMsg.forEach(msg => mensagens.mensagemErro(msg));
                return false
        }       

        
        this.service.salvar(produto)
        .then(response => {
            this.props.history.push('/consulta-produtos');
            mensagens.mensagemSucesso('Produto cadastrado com sucesso!')
        }).catch(error => {
            mensagens.mensagemErro("Todos os Campos são de preenchimento obrigatório")
        })    
    }


    atualizar = () => {
        const { descricao, valor, quantidade, usuario, dataCadastro, id} = this.state;
        const produto = { descricao, valor, quantidade, usuario, dataCadastro, id};
            this.service.atualizar(produto)
        .then(response => {
            this.props.history.push('/consulta-produtos');
            mensagens.mensagemSucesso('Produto atualizado com sucesso!')
        }).catch(error => {
            mensagens.mensagemErro("Todos os Campos são de preenchimento obrigatório")
        })    
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render() {

         return (
            <div className="container">
                <Card title={this.state.atualizando ? 'Atualizando Produto' : 'Cadastro de Produtos'}>
                    <div className="row">
                        <div className="col md-2">
                            <FormGroup id="inputDescricao" label="Descrição: *">
                                <input id="inputDescricao"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} 
                                type="text" 
                                className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col md-2">
                            <FormGroup id="inputDataCadastro" label="Data de Cadastro: *">
                                <input id="inputDataCadastro"
                                name="dataCadastro"
                                value={this.state.dataCadastro}
                                onChange={this.handleChange} 
                                type="date" 
                                className="form-control" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col md-2">
                            <FormGroup id="inputQuantidade" label="Quantidade: *">
                                <input id="inputQuantidade"
                                name="quantidade"
                                value={this.state.quantidade}
                                onChange={this.handleChange} 
                                type="text" 
                                className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col md-2">
                            <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange} 
                            type="text" 
                            className="form-control"/>
                            </FormGroup>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-md-6">
                                {this.state.atualizando ? 
                                (
                                    <button type="button" onClick={this.atualizar} className="btn btn-primary mr-3 mt-2"><i className="pi pi-refresh"></i> Atualizar </button>
                                ) : (
                                    <button type="button" onClick={this.submit} className="btn btn-success mr-3 mt-2"><i className="pi pi-check mr-1"></i> Salvar </button>
                                )}
                                    <button type="button" onClick={this.cancelar} className="btn btn-danger mt-2"><i className="pi pi-times"></i> Cancelar </button>
                            </div>
                        </div>               
                </Card>
            </div>
        )
    }
}

export default withRouter (CadastroProdutos)