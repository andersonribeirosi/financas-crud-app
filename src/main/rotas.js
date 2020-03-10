import React from 'react'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthService from '../app/service/authService'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import consultaLancamentos from '../views/lancamentos/consultaLancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastroLancamentos'

function RotaAutenticada({ component: Component, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (AuthService.isUsuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', exact: true, state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}    

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                <Redirect to="/login" component={Login} />
                </Route>
                <Route path="/login" component={Login} />
                
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/consulta-lancamentos" component={consultaLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
                <Route path="/**" component={Login} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas