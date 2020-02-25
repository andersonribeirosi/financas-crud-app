import React from 'react'

import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id} className="text-center">
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" 
                    className="btn btn-primary mr-3"
                    onClick={e => props.editAction(lancamento.id)}> Editar</button>
                    <button type="button" 
                    className="btn btn-danger" 
                    onClick={e => props.deleteAction(lancamento)}> Excluir</button>

                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr className="text-center">
                    <th scope="col"> Descrição </th>
                    <th scope="col"> Valor </th>
                    <th scope="col"> Tipo de Lançamento </th>
                    <th scope="col"> Mês </th>
                    <th scope="col"> Situação</th>
                    <th scope="col"> Ações </th>
                </tr>

            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}