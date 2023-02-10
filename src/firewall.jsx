import { useState,useEffect } from 'react'
import { API_URL } from "./constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link} from 'react-router-dom';

export default function Firewall() {
    const [ips, setIps] = useState([])
    useEffect(()=>{
        axios.get(API_URL+'firewall').then((response)=> {
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
        axios.post(API_URL+'unblockip',{'ip':ip}).then((res) => {
            console.log(res)
        })
        window.location.reload(false)
    }
    
    return(
        <div>
            <table>
                <tr>
                    <th>Blocked IP</th>
                    <th>Unblock</th>
                </tr>
                {text.map(str => str?<tr key={str}>
                    <td>{str}</td>
                    <td><button onClick={() => unblock(str)}>Unblock</button></td>
                </tr>:null)}
                
            </table>
        <Link to={'/'}><button>Go Home</button></Link>

        </div>
    )
}