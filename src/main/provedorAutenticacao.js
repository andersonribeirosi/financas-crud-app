import React from 'react'
import AuthService from '../../src/app/service/authService'


export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.usuarioLogado(usuario)
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado()
        this.setState({ isAutenticado: false, usuarioAutenticado: null })
    }

    render() {

        contexto = {
            isAutenticado: this.state.isAutenticado,
            usuarioAutenticado: this.state.usuarioAutenticado,
            iniciarSessao: this.state.iniciarSessao,
            encerrarSessao: this.state.encerrarSessao
        }
        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao