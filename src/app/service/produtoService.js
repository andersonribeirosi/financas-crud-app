import React from 'react'
import ApiService from '../apiservice';

import ErroValicadao from '../../app/exception/erroValidacao'

export default class ProdutoService extends ApiService {

    constructor() {
        super('api/produtos')
    }

    // alterarStatus = (id, status) => {
    //     return this.put(`/${id}/atualiza-status`, {status})
    // }

    obterPorId = (id) => {
        return this.get(`/${id}`)
    }

    salvar = (produto) => {
        return this.post('/', produto)
    }

    atualizar = (produto) => {
        return this.put(`/${produto.id}`, produto)
    }

    consultar(produtoFiltro) {
        let params = `?ano=${produtoFiltro.ano}`

        if (produtoFiltro.descricao) {
            params = `${params}&descricao=${produtoFiltro.descricao}`
        }

        if (produtoFiltro.valor) {
            params = `${params}&valor=${produtoFiltro.valor}`
        }

        if (produtoFiltro.quantidade) {
            params = `${params}&quantidade=${produtoFiltro.quantidade}`
        }

        if (produtoFiltro.usuario) {
            params = `${params}&usuario=${produtoFiltro.usuario}`
        }

       
        return this.get(params)
    }

    validarCampos = (produto) => {
        const erros = [];

        if(!produto.descricao){
            erros.push('Informe a Descrição!')
        }

      
        if(!produto.valor){
            erros.push('Informe o valor!')
        }

        if(!produto.quantidade){
            erros.push('Informe a quantidade do Produto!')
        }

        if(!produto.dataCadastro){
            erros.push('Informe a Data!')
        }

        if(erros && erros.length > 0) {
            throw new ErroValicadao(erros)
        }
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}
