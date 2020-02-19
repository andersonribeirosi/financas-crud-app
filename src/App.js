import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from './views/login'

import './App.css';
import { render } from '@testing-library/react';
import './custom.css'

class App extends React.Component {

  render() {

    return (
      <div>
        <Login />
      </div>
    )
  }
}
export default App;
