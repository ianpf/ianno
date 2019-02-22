import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import {ValidationErrors} from '@ianno/react-extensions';
import {NotBlankRule} from '@ianno/validation';

class App extends Component {
  render() {
    const rule = [new NotBlankRule()];
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>

          <ValidationErrors value={''} validation={[new NotBlankRule()]} />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
