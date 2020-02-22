import React from 'react';
import Rotas from '../main/rotas'
import Navbar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import '../custom.css'

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
