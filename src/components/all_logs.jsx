import { useState,useEffect } from 'react'
import { API_URL } from "../constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link,useLocation} from 'react-router-dom'
import './all.css'
import Loader from './loader.jsx'

export default function CompleteLogs() {
    const [logs, setLogs] = useState([])
    const navigate = new useNavigate();
    const location = new useLocation();
    const [isLoading, setLoading] = useState(true)
    let server = location.state.server;

    useEffect(()=>{
        axios.get(API_URL + server + '/').then((response)=> {
            setLogs(response.data);
            // console.log(response.status)
            setLoading(false)
        })
    },[]);
    return(
        <div id='all_logs_for_today'>
        {isLoading ? 
        <Loader /> :
        <div id='all_logs_for_today' style={{whiteSpace:"pre-wrap"}}>{logs.data}
        <center><button onClick={()=>navigate(-1)}>Go Home</button></center>
        </div>}
        </div>
    )
}