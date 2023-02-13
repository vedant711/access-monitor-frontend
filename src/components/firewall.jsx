import { useState,useEffect } from 'react'
import { API_URL } from "../constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link, useLocation} from 'react-router-dom';

export default function Firewall() {
    const [ips, setIps] = useState([])
    const location = new useLocation();
    const navigate = new useNavigate();
    const server = location.state.server
    useEffect(()=>{
        axios.get(API_URL+server+'/firewall/').then((response)=> {
            setIps(response.data);
        })
    },[]);

    let blocked_ips = ips.data
    // }
    // console.log(ipwise_hits)
    let text = []
    if (blocked_ips !== undefined) {
        text = blocked_ips.split('\n')
        // console.log()
    }

    let unblock = (ip) => {
        axios.post(API_URL+server+'/unblockip/',{'ip':ip}).then((res) => {
            console.log(res)
        })
        window.location.reload(false)
    }
    
    return(
        <div className='container'>
            {/* {console.log(JSON.stringify(text) !==JSON.stringify(['']))} */}
            {JSON.stringify(text) !==JSON.stringify(['']) && JSON.stringify(text) !==JSON.stringify([]) ? <table>
                <tr>
                    <th>Blocked IP</th>
                    <th>Unblock</th>
                </tr>
                {text.map(str => str?<tr key={str}>
                    <td>{str}</td>
                    <td><button onClick={() => unblock(str)}>Unblock</button></td>
                </tr>:null)}
                
            </table>: <h3>No IP in the Blacklist</h3>}
        <button onClick={()=>navigate(-1)}>Go Home</button>

        </div>
    )
}