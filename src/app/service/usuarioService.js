import React from 'react'

import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoUsuario(id) {
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

    validarCampos(usuario){
        const erros = []

        if (!usuario.nome) {
            erros.push('O campo Nome é obrigatório')
        }

        if (!usuario.email) {
            erros.push('O campo Email é obrigatório')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um Email válido')
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Informe a Senha duas vezes')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As Senhas não conferem')
        }
        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

}

export default UsuarioService