import React from 'react';
import logo from './logo.svg';
import { Img, Heading } from '@mono/dist-ui/dist-atoms';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Img src={logo} className="App-logo" alt="logo" />
        <Heading level={1} content={'Hello! Alpha App'} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

export default App;
