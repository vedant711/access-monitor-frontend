import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from "react";
import Index from './index.jsx'
import Summary from './summary.jsx'
import IP from './ipwise.jsx';
import Firewall from './firewall.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
            
          {/* </Route> */}

          <Route path="/summary" element={<Summary />}/>
          <Route path="/ipwise" element={<IP />}/>
          <Route path="/firewall" element={<Firewall />}/>


            
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
