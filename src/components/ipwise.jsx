import { useState,useEffect } from 'react'
import { API_URL } from "../constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link,useLocation} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactModal from 'react-modal'
// import './ipwise.css'


export default function IP() {
    const [logs, setLogs] = useState([])
    let [no_200,setNo_200] = useState('')
    let [no_404,setNo_404] = useState('')
    let [no_500,setNo_500] = useState('')
    let [ipadr,setIP] = useState('')
    const navigate = new useNavigate();
    const location = new useLocation();
    const [blocked_ips,setBlockedIPs] = useState({})
    const server = location.state.server

    useEffect(()=>{
        axios.get(API_URL+server+'/show_ipwise/').then((response)=> {
            setLogs(response.data);
            // console.log(logs)
            // console.log(response.status)
        })
    },[]);

    useEffect(()=>{
        axios.get(API_URL+server+'/show_blocked/').then((response)=> {
            // console.log(response.status)
            // let block = response.data
            setBlockedIPs(response.data);

            // console.log(block)
            // console.log(blocked_ips)
            // console.log(response)
        })
    },[]);

    // let async data = await logs.data
    // console.log(data)
    let ipwise_hits = []
    // if (logs!==[]) {
    ipwise_hits = logs.data
    // }
    console.log(ipwise_hits)
    let text = []
    if (ipwise_hits !== undefined) {
        text = ipwise_hits[0].split('\n')

    }
    // let all_blocked = blocked_ips.data

    // if (all_blocked !== undefined){
    //    let blocked = all_blocked
    // }

    let checkIP = (ip) => {
        let regex = new RegExp('DROP.*'+ip)
        let data = blocked_ips.data;
        if (data !== undefined) {
        if(data.match(regex)){
            return true
        } else {return false}
    }
    }

    let unblockIP=(ip) => {
        axios.post(API_URL+server+'/unblockip/',{'ip':ip}).then((res) => {
            console.log(res)
        })
        window.location.reload(false)
    }

    let details = (str)=>{
        setNo_200('')
        setNo_404('')
        setNo_500('')
        let arr = str.split(" ")
        let ip = arr[arr.length-1]
        setIP(ip)
        let regex = new RegExp(".*"+ip+".*404.*\n");
        // let no_404 = ''
        // let no_200 = ''
        // let no_500 = ''
        if (ipwise_hits[1].match(regex)) {
            setNo_404(regex.exec(ipwise_hits[1])[0])
        }
        regex = new RegExp('.*'+ip+".*200.*\n");
        if (ipwise_hits[1].match(regex)) {
            setNo_200(regex.exec(ipwise_hits[1])[0])
            // console.log('hi')
        }
        regex = new RegExp(".*"+ip+".*500.*\n");
        if (ipwise_hits[1].match(regex)) {
            setNo_500(regex.exec(ipwise_hits[1])[0])
        }
        // console.log(no_200+no_404+no_500)
            }
    
    let hideDetails = () => {
        setNo_200('')
        setNo_404('')
        setNo_500('')
        setIP('')
    }

    let blockIP = (ip) => {
        axios.post(API_URL+server+'/blockip/',{'ip':ip}).then((res) => {
            console.log(res)
        })
        // axios.get(API_URL+'show_blocked').then((response)=> {
        //     setBlockedIPs(response.data);
        // })
        window.location.reload(false)



    }

    const bg = {
        Overlay: {
          background: "#000000"
        }
      };
    // let no_404=''
    // con
    // let detailed = data[1]
    return (
        <div className="fill_bottom">
        <div className='container-summary'>
            <h1>Have a look at IP wise hits today</h1>
            { ipwise_hits !== undefined?
                <table id='all_log'>
                    <tr>
                        <th>IP</th>
                        <th>Number of Hits</th>
                        <th></th>
                        <th>Block</th>
                    </tr>
                    {text.map(str=>str?<tr key={str.split(" ")[str.split(" ").length-1]}><td>{str.split(" ")[str.split(" ").length-1]}</td>
                    <td>
                    {str.split(" ")[str.split(" ").length-2]}
                    </td>
                    {/* <td>{
                        ipadr === str.split(" ")[str.split(" ").length-1]?  
                        <button style={{cursor:'pointer'}} onClick={()=>hideDetails()}>Hide Details</button>
                        : 
                        <button style={{cursor:'pointer'}} onClick={()=>details(str)}>Show Details</button>
                        }
                    </td> */}
                    <td>
                        
                    <button style={{cursor:'pointer'}} onClick={()=>details(str)}>Show Details</button>
                    <ReactModal isOpen={ipadr === str.split(" ")[str.split(" ").length-1]} onRequestClose={()=>hideDetails()} className='hello' styles={bg} style={{
                            overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)'
                            }}}>
                    { no_200 || no_404 || no_500 ? <div id='all_logs_for_status'>
            <center><h4>Detailed Log Entry</h4>
            <table>
                {/* {console.log(no_200.split(" "))} */}
                <tr>
                    <th>IP</th>
                    <th>Number of Hits</th>
                    <th>Status Code</th>
                </tr>
                {no_200 ? <tr>
                    <td>{no_200.split(" ")[no_200.split(" ").length-2]}</td>
                    <td align='center'>{no_200.split(" ")[no_200.split(" ").length-3]}</td>
                    <td>{no_200.split(" ")[no_200.split(" ").length-1]}</td>

                </tr> : null}
                {no_404 ? <tr>
                    <td>{no_404.split(" ")[no_404.split(" ").length-2]}</td>
                    <td align='center'>{no_404.split(" ")[no_404.split(" ").length-3]}</td>
                    <td>{no_404.split(" ")[no_404.split(" ").length-1]}</td>

                </tr> : null}
                {no_500 ? <tr>
                    <td>{no_500.split(" ")[no_500.split(" ").length-2]}</td>
                    <td align='center'>{no_500.split(" ")[no_500.split(" ").length-3]}</td>
                    <td>{no_500.split(" ")[no_500.split(" ").length-1]}</td>

                </tr> : null}
            </table></center>
            </div>:null}
                    </ReactModal>
                    </td>
                    {/* <td>
                        <Popup trigger={<button onClick={()=>details(str)}>Show Details</button>} modal nested>
                        </Popup>
                    </td> */}
                    <td>{ checkIP(str.split(" ")[str.split(" ").length-1]) ? <button style={{cursor:'pointer'}} onClick={()=>unblockIP(str.split(" ")[str.split(" ").length-1])}>Unblock</button> :
                        <button style={{cursor:'pointer'}} onClick={()=>blockIP(str.split(" ")[str.split(" ").length-1])}>Block</button>
                        }</td></tr>:null)}
                        
                </table>:null
            }
        {/* {no_404} */}
        
        <button onClick={()=> navigate(-1)}>Go Home</button>
        </div>
        {/* { no_200 || no_404 || no_500 ? <div id='all_logs_for_status'>
            <center><h4>Detailed Log Entry</h4>
            <table>
                
                <tr>
                    <th>IP</th>
                    <th>Number of Hits</th>
                    <th>Status Code</th>
                </tr>
                {no_200 ? <tr>
                    <td>{no_200.split(" ")[no_200.split(" ").length-2]}</td>
                    <td align='center'>{no_200.split(" ")[no_200.split(" ").length-3]}</td>
                    <td>{no_200.split(" ")[no_200.split(" ").length-1]}</td>

                </tr> : null}
                {no_404 ? <tr>
                    <td>{no_404.split(" ")[no_404.split(" ").length-2]}</td>
                    <td align='center'>{no_404.split(" ")[no_404.split(" ").length-3]}</td>
                    <td>{no_404.split(" ")[no_404.split(" ").length-1]}</td>

                </tr> : null}
                {no_500 ? <tr>
                    <td>{no_500.split(" ")[no_500.split(" ").length-2]}</td>
                    <td align='center'>{no_500.split(" ")[no_500.split(" ").length-3]}</td>
                    <td>{no_500.split(" ")[no_500.split(" ").length-1]}</td>

                </tr> : null}
            </table></center>
            
        </div>:null} */}
        </div>

    )
}