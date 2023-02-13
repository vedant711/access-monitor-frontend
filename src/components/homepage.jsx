import React, { Component,useState } from "react";
import {Routes, Route, useNavigate,Link} from 'react-router-dom'

export default function Home() {
    const [server, setServer] = useState('')

    const navigate = new useNavigate();


    return(
        <div className="container">
            <h1>Welcome to the Access Monitor</h1>
            <h3>Choose the server for your Website</h3>
            <button onClick={()=>{
                // setServer('apache2')
                navigate('/apache2', {state:{server:'apache2'}})
                }}>Apache Server</button>
            <button onClick={()=>{
                // setServer('nginx')
                
                navigate('/nginx', {state:{server:'nginx'}})
                }}>Nginx Server</button>

        </div>
    )
}