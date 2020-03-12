import React from 'react';
import Rotas from '../main/rotas'
import Navbar from '../components/navbar'

import ProvedorAutenticacao from './provedorAutenticacao'
import 'jquery'
import 'popper.js'
import 'bootstrap'

import 'toastr/build/toastr.min.js'

import '../custom.css'
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class App extends React.Component {

  render() {

    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div>
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}
export default App;
