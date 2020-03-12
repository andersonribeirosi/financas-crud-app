import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import ProdutosTable from '../../views/produtos/produtosTable'

import ProdutoService from '../../app/service/produtoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as mensagens from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaProdutos extends React.Component {

    state = {
        descricao: '',
        valor: '',
        quantidade: '', 
        dataCadastro: '',
        showConfirmDialog: false,
        produtosDeletar: {},
        produtos: []
    }

    constructor() {
        super();
        this.service = new ProdutoService();
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-produtos/${id}`)
    }

    
    abrirConfirmação = (produto) => {
        this.setState({showConfirmDialog: true, produtoDeletar: produto})
    }

    deletar = () => {
        this.service.deletar(this.state.produtoDeletar.id)
            .then(response => {
                const produtos = this.state.produtos;
                const index = produtos.indexOf(this.state.produtoDeletar);
                produtos.splice(index, 1);
                this.setState({produtos: produtos, showConfirmDialog: false});
                mensagens.mensagemSucesso('Produto deletado com sucesso!')
            }).catch(error => {
                mensagens.mensagemErro('Ocorreu um erro ao tentar deletar o Produto!')
            })

    }

    alterarStatus = (produto, status) => {
        this.service.alterarStatus(produto.id, status)
        .then(response => {
            const produtos = this.state.produtos;
            const index = produtos.indexOf(produto);
            if(index !== -1){
                produto['status'] = status;
                produtos[index] = produto;
                this.setState({produto});
            }
            mensagens.mensagemSucesso("Status alterado com sucesso!")
            console.log(response.data)
        })
    }


    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, produtoDeletar: {}})
    }

    buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const produtoFiltro = {
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(produtoFiltro)
            .then(response => {
                const lista =  response.data;
                if(lista.length < 1){
                    mensagens.mensagemAlert("Nenhum resultado encontrado!")
                }
                this.setState({ produtos: lista })
            }).catch(error => {
                console.log(error);
            })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-produtos')
    }

    render() {

        const confirmaDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        );

            return (
            <div className="container">
                <Card title="Consulta de Produtos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                                    <input
                                        className="form-control"
                                        id="inputDescrição"
                                        type="text"
                                        placeholder="Informe o Descrição"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        name="descricao" />
                                </FormGroup>
                                <button 
                                onClick={this.buscar} 
                                type="button" 
                                className="btn btn-success mr-3">
                                <i className="pi pi-search mr-1"></i> Buscar</button>
                                <button 
                                onClick={this.cadastrar} 
                                type="button" 
                                className="btn btn-danger">
                                <i className="pi pi-plus mr-1"></i>Cadastrar</button>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <ProdutosTable
                                    produtos={this.state.produtos}
                                    deleteAction={this.abrirConfirmação}
                                    editAction={this.editar} 
                                    alterarStatus={this.alterarStatus}/>
                                    

                            </div>
                        </div>
                    </div>

                    <div>
                        <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true} 
                        footer={confirmaDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                            Confirma a exclusão deste Produto?
                        </Dialog>
                    </div>
                </Card>

            </div>
        )
    }

}

export default withRouter(ConsultaProdutos)