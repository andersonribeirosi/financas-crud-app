import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from '../../views/lancamentos/lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
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

        const meses = [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }

        ]

        const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]

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
                                        value={this.state.ano}
                                        onChange={e => this.setState({ ano: e.target.value })}
                                        name="ano" />
                                </FormGroup>
                                <FormGroup
                                    label="Mes: *"
                                    htmlFor="inputMes">
                                    <SelectMenu
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value })}
                                        id="inputMes"
                                        lista={meses}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup
                                    label="Tipo de Lançamento: *"
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