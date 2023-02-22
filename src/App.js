import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from "react";
import Index from './components/index.jsx'
import Summary from './components/summary.jsx'
import IP from './components/ipwise.jsx';
import Firewall from './components/firewall.jsx';
import CompleteLogs from './components/all_logs';
import Detailed from './components/detailed';
import Home from './components/homepage';
import Login from './components/login';
// import Nginx from './components/nginx';
import { useState,useEffect,useContext } from 'react'
import AuthContext from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Header from './components/header';

// const PrivateRoute = ({ children, ...rest }) => {
//   let { user } = useContext(AuthContext);
//   return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>;
// };


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
    <Header/>
    <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />}/>
        {/* <PrivateRoute path="/" element={<Home />}/> */}
        <Route path='/' element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='/apache2' element={<PrivateRoute/>}>
          <Route path="/apache2" element={<Index />}/>
        </Route>
        <Route path='/apache2/summary' element={<PrivateRoute/>}>
          <Route path="/apache2/summary" element={<Summary />}/>
        </Route>
        <Route path='/apache2/ipwise' element={<PrivateRoute/>}>
          <Route path="/apache2/ipwise" element={<IP />}/>
        </Route>
        <Route path='/apache2/firewall' element={<PrivateRoute/>}>
          <Route path="/apache2/firewall" element={<Firewall />}/>
        </Route>
        <Route path='/apache2/all-logs' element={<PrivateRoute/>}>
          <Route path="/apache2/all-logs" element={<CompleteLogs />}/>
        </Route>
        <Route path='/apache2/detailed' element={<PrivateRoute/>}>
          <Route path="/apache2/detailed" element={<Detailed />}/>
        </Route>

        <Route path='/nginx' element={<PrivateRoute/>}>
          <Route path="/nginx" element={<Index />}/>
        </Route>
        <Route path='/nginx/summary' element={<PrivateRoute/>}>
          <Route path="/nginx/summary" element={<Summary />}/>
        </Route>
        <Route path='/nginx/ipwise' element={<PrivateRoute/>}>
          <Route path="/nginx/ipwise" element={<IP />}/>
        </Route>
        <Route path='/nginx/firewall' element={<PrivateRoute/>}>
          <Route path="/nginx/firewall" element={<Firewall />}/>
        </Route>
        <Route path='/nginx/all-logs' element={<PrivateRoute/>}>
          <Route path="/nginx/all-logs" element={<CompleteLogs />}/>
        </Route>
        <Route path='/nginx/detailed' element={<PrivateRoute/>}>
          <Route path="/nginx/detailed" element={<Detailed />}/>
        </Route>


          {/* <PrivateRoute path="/apache2/summary" element={<Summary />}/>
          <PrivateRoute path="/apache2/ipwise" element={<IP />}/>
          <PrivateRoute path="/apache2/firewall" element={<Firewall />}/>
          <PrivateRoute path="/apache2/all-logs" element={<CompleteLogs />}/>
          <PrivateRoute path="/apache2/detailed" element={<Detailed />}/>

          <PrivateRoute path="/nginx" element={<Index />}/>
          <PrivateRoute path="/nginx/summary" element={<Summary />}/>
          <PrivateRoute path="/nginx/ipwise" element={<IP />}/>
          <PrivateRoute path="/nginx/firewall" element={<Firewall />}/>
          <PrivateRoute path="/nginx/all-logs" element={<CompleteLogs />}/>
          <PrivateRoute path="/nginx/detailed" element={<Detailed />}/> */}




            
          {/* </Route> */}
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
