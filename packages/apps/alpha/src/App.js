import React from 'react';
import Img from '@mono/dist-ui/dist-atoms/Img/Img';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Img src={logo} className="App-logo" alt="logo" />
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
        <Img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
