import { useState,useEffect } from 'react'
import { API_URL } from "../constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link} from 'react-router-dom'
import './all.css'

export default function CompleteLogs() {
    const [logs, setLogs] = useState([])
    useEffect(()=>{
        axios.get(API_URL).then((response)=> {
            setLogs(response.data);
            // console.log(response.status)
        })
    },[]);
    return(
        // <div></div>
        <div id='all_logs_for_today' style={{whiteSpace:"pre-wrap"}}>{logs.data}
        <center><Link to='/'><button>Go Home</button></Link></center>
        </div>
    )
}