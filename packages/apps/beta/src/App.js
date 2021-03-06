import React from 'react';
import logo from './logo.svg';
import { Img } from '@shrey-oth-acc/dist-ui-mono-poc';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Img src={logo} className="App-logo" alt="logo" />
        <Img src={'https://via.placeholder.com/150'} className="App-logo" alt="logo" />
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
      <Img src={'https://via.placeholder.com/150'} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
