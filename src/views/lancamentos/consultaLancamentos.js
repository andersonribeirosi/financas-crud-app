import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from '../../views/lancamentos/lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as mensagens from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    
    abrirConfirmação = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});
                mensagens.mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch(error => {
                mensagens.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento!')
            })

    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            if(index !== -1){
                lancamento['status'] = status;
                lancamentos[index] = lancamento;
                this.setState({lancamento});
            }
            mensagens.mensagemSucesso("Status alterado com sucesso!")
            console.log(response.data)
        })
    }


    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                const lista =  response.data;
                if(lista.length < 1){
                    mensagens.mensagemAlert("Nenhum resultado encontrado!")
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                console.log(error);
            })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    render() {

        const confirmaDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        );

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterTipos();

        return (
            <div className="container">
                <Card title="Consulta de Lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup label="Ano: *" htmlFor="inputAno">
                                    <input
                                        className="form-control"
                                        id="inputAno"
                                        type="text"
                                        placeholder="Informe o Ano"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ ano: e.target.value })}
                                        name="ano" />
                                </FormGroup>
                                <FormGroup
                                    label="Mes: "
                                    htmlFor="inputMes">
                                    <SelectMenu
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value })}
                                        id="inputMes"
                                        lista={meses}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup label="Descricao: " htmlFor="inputDescricao">
                                    <input
                                        className="form-control"
                                        id="inputDescricao"
                                        type="text"
                                        placeholder="Informe a Descrição"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        name="descricao" />
                                </FormGroup>
                                <FormGroup
                                    label="Tipo de Lançamento: "
                                    htmlFor="inputTipo">
                                    <SelectMenu
                                        value={this.state.tipo}
                                        onChange={e => this.setState({ tipo: e.target.value })}
                                        id="inputTipo"
                                        lista={tipos}
                                        className="form-control" />
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
                                <LancamentosTable
                                    lancamentos={this.state.lancamentos}
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
                            Confirma a exclusão deste Lançamento?
                        </Dialog>
                    </div>
                </Card>

            </div>
        )
    }

}

export default withRouter(ConsultaLancamentos)