import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'

import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {

  render() {

    return (
      <div>
        <button type="button" className="btn btn-primary">Salvar</button>
      </div>
    )
  }
}
export default App;
