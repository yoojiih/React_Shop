import React from 'react';
import logo from './logo.svg';
import './App.css';

import LandingPage from "./views/LandingPage/LandingPage.js";
import Footer from "./views/Footer/Footer"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        <LandingPage />
        <button class="bg-red-500 hover:bg-red-700 ...">
  Hover me
</button>
      </header>
      <Footer />
    </div>
  );
}

export default App;