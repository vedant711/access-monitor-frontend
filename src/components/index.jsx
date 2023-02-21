import { useState,useEffect } from 'react'
import { API_URL } from "../constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link,useLocation} from 'react-router-dom'
import './style.css'

export default function Index() {
    const [toggle,setToggle] = useState(false)
    const [logs, setLogs] = useState([])
    const location = new useLocation();
    let server = location.state.server
    console.log(location.state)
    // const [data, setData] = useState({})
    const change  = () => {
        setToggle(!toggle)
    }

    const navigate = useNavigate();
    const summary = (res) => {
        console.log(res)
        navigate('/'+ server +'/summary',{state:{response:res,server:server}});
    }

    const [filter, setFilter] = useState('')

    const onFilterChange = e => {
        setFilter(e.target.value)
        // setData({'filter':filter})
        // console.log(e.target.value)
        // console.log(filter)
      }

    // useEffect(() => {

    //     // Fetch the Payroll Data related to the logged in User
    //     fetch(`http://127.0.0.1:8000/`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //              Authorization: `Token ${localStorage.getItem('token')}`
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       setLogs(data)
    //       });
    // }, []);

    // useEffect(()=>{
    //     axios.get(API_URL+server+ '/').then((response)=> {
    //         setLogs(response.data);
    //         // console.log(response.status)
    //     })
    // },[]);

    let filterApply = () => {
        console.log(filter)
        // axios.post(API_URL+server+'/show_custom/',{'filter':filter}).then((res) => {
        //     console.log(res)
        //     // summary(res)
        //     // let result = res.data
        //     // console.log(typeof(result))
        //     // let hello = {name:'vedant'}
        //     // console.log(typeof(hello))
        //     navigate('/'+ server +'/summary',{state:{response:res.data,server:server}});
        // })
        navigate('/'+server+'/summary',{state:{filter:filter,server:server}})

    }

    return(
        <div style={{width:"100%"}} className="main-content">
            <div className="header">
            {/* <Link to={'/'+ server +'/ipwise'}>View IP wise hits</Link>
            <Link to={'/'+ server +'/firewall'}>See all blocked IPs</Link>
            <Link to={'/'+ server +'/all-logs'}>View Complete Log</Link> */}
            <p onClick={()=>navigate('/'+ server +'/ipwise',{state:{server:server}})}>View IP wise hits</p>
            <p onClick={()=>navigate('/'+ server +'/firewall',{state:{server:server}})}>See all blocked IPs</p>
            <p onClick={()=>navigate('/'+ server +'/all-logs',{state:{server:server}})}>View Complete Log</p>

            </div>
        <div className='container'>
            <h1>Welcome to the Access Monitor for {server} Server</h1>
            <h2>Have a look at today's log</h2>
            {/* {
                toggle?
                    <div>
                    <button id='toggle-btn' onClick={change}>Collapse all logs</button>
                        <div id='all_log' style={{whiteSpace:"pre-wrap"}}>{logs.data}</div>
                    
                    </div> :
                    <button id='toggle-btn' onClick={change}>View all logs</button>
            } */}
            {/* <button id='toggle-btn' onClick={change}>View all logs</button> */}
            {/* <div style="display:none" id='all_log'>{{access_log|linebreaks}}</div> */}
            {/* <form action="show_custom" method="post"> */}
                {/* {% csrf_token %} */}
                <h2>Filters</h2>
                <div style={{}}><input type="radio" name="filter" id="1" value="1" onChange={onFilterChange} checked={filter === "1"}/><label htmlFor='1'>1 hr</label></div>
                <div style={{}}><input type="radio" name="filter" id="4" value="4" onChange={onFilterChange} checked={filter === "4"}/><label htmlFor='4'>4 hrs</label> </div>
                <div style={{}}><input type="radio" name="filter" id="6" value="6" onChange={onFilterChange} checked={filter === "6"}/><label htmlFor='6'>6 hrs</label></div>
                <div style={{}}><input type="radio" name="filter" id="8" value="8" onChange={onFilterChange} checked={filter === "8"}/><label htmlFor='8'>8 hrs</label></div>
                <div style={{}}><input type="radio" name="filter" id="12" value="12" onChange={onFilterChange} checked={filter === "12"}/><label htmlFor='12'>12 hrs</label></div>
                <div style={{}}><input type="radio" name="filter" id="24" value="24" onChange={onFilterChange} checked={filter === "24"}/><label htmlFor='24'>24 hrs</label></div>
                <input type="submit" value="Get the Summary" onClick={filterApply}/>

            {/* </form> */}
            {/* Select topping <strong>{filter}</strong> */}
            {/* <Link to='/ipwise'><button >View IP wise hits</button></Link>
            <Link to='/firewall'><button >See all blocked IPs</button></Link> */}
            <Link to='/'><button >Go back to Server Selection</button></Link>
        </div>
        </div>

    )
}