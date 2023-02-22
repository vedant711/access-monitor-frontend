import React, { Component,useState,useEffect } from "react";
import {useLocation,Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../constants";
import Loader from "./loader";




export default function Summary () {
    let location = useLocation();
    // let res = location.state.response.data
    // console.log(res)
    // console.log(res.data)
    // let res = {}
    // console.log(location.state)
    let server = location.state.server
    let filter = location.state.filter
    const [res,setRes] = useState({})
    const navigate = new useNavigate();
    const [show200,setShow200] = useState(false)
    const [show404,setShow404] = useState(false)
    const [show500,setShow500] = useState(false)
    const [show301,setShow301] = useState(false)
    const [show302,setShow302] = useState(false)
    const [isLoading, setLoading] = useState(true)


    useEffect(()=>{
        axios.post(API_URL+server+'/show_custom/',{'filter':filter}).then((response) => {
        console.log(response.data)
        setRes(response.data.data)
        // console.log(res)
        if (res !== undefined||res!=={}){setLoading(false)}
        
    })
},[]);

    // filterApply()

    let no_200=0
    let no_404 = 0
    let no_500 = 0
    let no_301 = 0
    let no_302 = 0

    const getLineCount = (text) => {
        // console.log(text)
        if (!text) {
            return 0;
        }
        
        return text.split(/\n/).length;
    }
    if (res!=={} && res!==undefined ){
        // console.log(res)
    no_200 = res[200]
    // if (no_200 !== 0) {no_200-=1}
    no_404 = res[404]
    no_500 = res[500]
    no_301 = res[301]
    no_302 = res[302]


    // if (no_404 !== 0) {no_404-=1}
    // if (no_500 !== 0) {no_500-=1}
    // if (no_301 !== 0) {no_301-=1}
    // if (no_302 !== 0) {no_302-=1}
    }

    // console.log(no_200)
    // console.log(res)
    // let no_200 = 1
    // let no_404 = 1
    // let no_500 = 0

    const req_200 = () => {
        setShow200(!show200)
        setShow404(false)
        setShow500(false)
        setShow301(false)
        setShow302(false)

        navigate('/'+server+'/detailed',{state:{filter:filter,server:server,code:'200'}})
    }

    const req_404 = () => {
        setShow404(!show404)
        setShow200(false)
        setShow500(false)
        setShow301(false)
        setShow302(false)
        navigate('/'+server+'/detailed',{state:{filter:filter,server:server,code:'404'}})


    }

    const req_500 = () => {
        setShow500(!show500)
        setShow404(false)
        setShow200(false)
        setShow301(false)
        setShow302(false)
        navigate('/'+server+'/detailed',{state:{filter:filter,server:server,code:'500'}})

    }

    const req_301 = () => {
        setShow500(false)
        setShow404(false)
        setShow200(false)
        setShow301(!show301)
        setShow302(false)
        navigate('/'+server+'/detailed',{state:{filter:filter,server:server,code:'301'}})

    }

    const req_302 = () => {
        setShow500(false)
        setShow404(false)
        setShow200(false)
        setShow301(false)
        setShow302(!show302)
        navigate('/'+server+'/detailed',{state:{filter:filter,server:server,code:'302'}})

    }
    return(
        <div className="fill_bottom">
            {isLoading? <Loader/>:
        <div style={{whiteSpace:"pre-wrap"}} className='container-summary'>
            <h1>Total number of requests are: </h1>
            <table>
                <tr>
                <th>Status Code</th>
                <th>Number of Requests</th>
                <th>Details</th>
                </tr>
                <tr>
                    <td>200</td>
                    <td>{no_200}</td>
                    {
                        show200 ? 
                        <td><button onClick={req_200}>Hide Details</button></td>
                        :
                        <td><button onClick={req_200}>Show Details</button></td>
                    }
                    
                </tr>
                <tr>
                    <td>404</td>
                    <td>{no_404}</td>
                    {
                        show404 ? 
                        <td><button onClick={req_404}>Hide Details</button></td>
                        :
                        <td><button onClick={req_404}>Show Details</button></td>
                    }
                </tr><tr>
                    <td>500</td>
                    <td>{no_500}</td>
                    {
                        show500 ? 
                        <td><button onClick={req_500}>Hide Details</button></td>
                        :
                        <td><button onClick={req_500}>Show Details</button></td>
                    }
                </tr><tr>
                    <td>301</td>
                    <td>{no_301}</td>
                    {
                        show500 ? 
                        <td><button onClick={req_301}>Hide Details</button></td>
                        :
                        <td><button onClick={req_301}>Show Details</button></td>
                    }
                </tr><tr>
                    <td>302</td>
                    <td>{no_302}</td>
                    {
                        show500 ? 
                        <td><button onClick={req_302}>Hide Details</button></td>
                        :
                        <td><button onClick={req_302}>Show Details</button></td>
                    }
                </tr>
            </table>
            
            <button onClick={() => navigate(-1)}>Go Home</button>
        </div>}
        {/* {show200 || show404 || show500 ?  <div id='all_logs_for_status_today'>
        {show200 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 200</h4>{res[200]}</div>:<></>}
        {show404 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 404</h4>{res[404]}</div>:<></>}       
        {show500 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 500</h4>{res[500]}</div>:<></>} </div>: null} */}
        {/* <div id='all_logs_for_today'>
        {show200 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 200</h4>{res[200]}</div>:<></>}
        {show404 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 404</h4>{res[404]}</div>:<></>}       
        {show500 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 500</h4>{res[500]}</div>:<></>}       

    </div> */}
    </div>
    )
}