import React from 'react'
import SelectMenu from '../../components/selectMenu'
import FormGroup from '../../components/form-group'
import Card from '../../components/card'
import LancamentoService from '../../app/service/lancamentoService'
import {withRouter} from 'react-router-dom'

class CadstroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    cancelar = () => {
    this.props.history.push('/home')
    }

    submit = () => {
        console.log(this.state);
        
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render() {

        const tipos = this.service.obterTipos();
        const meses = this.service.obterListaMeses();

        return (
            <div className="container">
                <Card title="Cadastro de Lançamentos">
                    <div className="row">
                        <div className="col md-12">
                            <FormGroup id="inputDescricao" label="Descrição: *">
                                <input id="inputDescricao"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} 
                                type="text" 
                                className="form-control" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col md-6">
                            <FormGroup id="inputAno" label="Ano: *">
                                <input id="inputAno"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} 
                                type="text" 
                                className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col md-6">
                            <FormGroup id="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} 
                                lista={meses} 
                                className="form-control"/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col md-4">
                            <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange} 
                            type="text" 
                            className="form-control"/>
                            </FormGroup>
                        </div>
                        <div className="col md-4">
                            <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                            name="tipo"
                            value={this.state.tipo}
                            onChange={this.handleChange} 
                            lista={tipos} 
                            className="form-control"/>
                            </FormGroup>
                        </div>
                        <div className="col md-4">
                            <FormGroup id="inputStatus" label="Status: ">
                            <input id="inputStatus"
                            name="status"
                            value={this.state.status}
                            className="form-control" disabled />
                            </FormGroup>
                        </div>
                        
                    </div>

                    <button type="button" onClick={this.submit} className="btn btn-primary mr-3 mt-2"> Salvar </button>
                    <button type="button" onClick={this.cancelar} className="btn btn-danger mt-2"> Cancelar </button>
                </Card>
            </div>
        )
    }
}

export default withRouter (CadstroLancamentos)