import { useState,useEffect } from 'react'
import { API_URL } from "./constants";
import axios from 'axios';
import React, { Component } from "react";
import {Routes, Route, useNavigate,Link} from 'react-router-dom'

export default function Index() {
    const [toggle,setToggle] = useState(false)
    const [logs, setLogs] = useState([])
    // const [data, setData] = useState({})
    const change  = () => {
        setToggle(!toggle)
    }

    const navigate = useNavigate();
    const summary = (res) => {
        console.log(res)
        navigate('/summary',{state:{response:res}});
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

    useEffect(()=>{
        axios.get(API_URL).then((response)=> {
            setLogs(response.data);
            // console.log(response.status)
        })
    },[]);

    let filterApply = () => {
        console.log(filter)
        axios.post(API_URL+'show_custom',{'filter':filter}).then((res) => {
            console.log(res)
            // summary(res)
            // let result = res.data
            // console.log(typeof(result))
            // let hello = {name:'vedant'}
            // console.log(typeof(hello))
            navigate('/summary',{state:res.data});
        })

    }

    return(
        <div>
            <h1>Welcome to the Access Monitor</h1>
            <h2>Have a look at today's log</h2>
            {
                toggle?
                    <div>
                    <button id='toggle-btn' onClick={change}>Collapse all logs</button>
                        <div id='all_log' style={{whiteSpace:"pre-wrap"}}>{logs.data}</div>
                    
                    </div> :
                    <button id='toggle-btn' onClick={change}>View all logs</button>
            }
            {/* <button id='toggle-btn' onClick={change}>View all logs</button> */}
            {/* <div style="display:none" id='all_log'>{{access_log|linebreaks}}</div> */}
            {/* <form action="show_custom" method="post"> */}
                {/* {% csrf_token %} */}
                <h2>Filters</h2>
                <input type="radio" name="filter" id="" value="1" onChange={onFilterChange} checked={filter === "1"}/>1 hr <br />
                <input type="radio" name="filter" id="" value="4" onChange={onFilterChange} checked={filter === "4"}/>4 hr <br />
                <input type="radio" name="filter" id="" value="6" onChange={onFilterChange} checked={filter === "6"}/>6 hr<br />
                <input type="radio" name="filter" id="" value="8" onChange={onFilterChange} checked={filter === "8"}/>8 hr<br />
                <input type="radio" name="filter" id="" value="12" onChange={onFilterChange} checked={filter === "12"}/>12 hr<br />
                <input type="radio" name="filter" id="" value="24" onChange={onFilterChange} checked={filter === "24"}/>24 hr<br />
                <input type="submit" value="Get the Summary" onClick={filterApply}/>

            {/* </form> */}
            {/* Select topping <strong>{filter}</strong> */}
            <Link to='/ipwise'><button >View IP wise hits</button></Link>
            <Link to='/firewall'><button >See all blocked IPs</button></Link>

        </div>

    )
}