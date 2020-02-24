import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from '../../views/lancamentos/lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as mensagens from '../../components/toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            mensagens.mensagemErro('O preenchimento do campo Ano é obrigatório');
            return false;
        }

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
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {

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
                                <button onClick={this.buscar} type="button" className="btn btn-success mr-3">Buscar</button>
                                <button type="button" className="btn btn-danger">Cadastrar</button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable lancamentos={this.state.lancamentos} />

                            </div>
                        </div>
                    </div>

                </Card>

            </div>
        )
    }

}

export default withRouter(ConsultaLancamentos)