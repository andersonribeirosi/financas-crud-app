import React from 'react'

import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import consultaLancamentos from '../views/lancamentos/consultaLancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastroLancamentos'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <Route path="/consulta-lancamentos" component={consultaLancamentos}></Route>
                <Route path="/cadastro-lancamentos/:id" component={cadastroLancamentos}></Route>


            </Switch>
        </HashRouter>
    )
}

export default Rotas