import React from 'react'

import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.produtos.map(produto => {
        return (
            <tr key={produto.id} className="text-center">
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>{currencyFormatter.format(produto.valor, { locale: 'pt-BR' })}</td>
                <td>{produto.dataCadastro}</td>
                <td>

                    {/* <button className="btn btn-success mr-3" title="Efetivar"
                    disabled={ produto.status !== 'PENDENTE'}
                    onClick={e => props.alterarStatus(produto, 'EFETIVADO')}
                    type="button"><i className="pi pi-check"></i></button>

                    <button className="btn btn-danger mr-3" title="Cancelar"
                    disabled={ produto.status !== 'PENDENTE'}
                    onClick={e => props.alterarStatus(produto, 'CANCELADO')}
                    type="button"><i className="pi pi-times"></i></button> */}

                    <button type="button" 
                    className="btn btn-primary mr-3" title="Editar"
                    onClick={e => props.editAction(produto.id)}> <i className="pi pi-pencil"></i></button>
                    
                    <button type="button" title="Excluir"
                    className="btn btn-danger" 
                    onClick={e => props.deleteAction(produto)}> <i className="pi pi-trash"></i></button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr className="text-center">
                    <th scope="col"> Descrição </th>
                    <th scope="col"> Quantidade </th>
                    <th scope="col"> Valor R$ </th>
                    <th scope="col"> Data de Cadastro </th>
                    <th scope="col"> Ações </th>
                </tr>

            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}