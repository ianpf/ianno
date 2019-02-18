import * as React from 'react';
import './App.css';

import { ValidationErrors } from '@ianno/react-extensions';
import { NotBlankRule } from '@ianno/validation';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ValidationErrors value={''} validation={[new NotBlankRule()]}/>
      </div>
    );
  }
}

export default App;