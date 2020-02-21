import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'

import { render } from '@testing-library/react';
import '../custom.css'

import Rotas from '../main/rotas'
import Navbar from '../components/navbar'

class App extends React.Component {

  render() {

    return (
      <>
        <Navbar />
      <div>
        <Rotas />
      </div>
      </>
    )
  }
}
export default App;
