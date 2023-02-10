import React, { Component,useState } from "react";
import {useLocation,Link, useNavigate} from 'react-router-dom'



export default function Summary () {
    let location = useLocation();
    let res = location.state.data
    // console.log(res.data)
    // console.log(res[200])
    const navigate = new useNavigate();
    const [show200,setShow200] = useState(false)
    const [show404,setShow404] = useState(false)
    const [show500,setShow500] = useState(false)


    const getLineCount = (text) => {
        console.log(text)
        if (!text) {
            return 0;
        }
        
        return text.split(/\n/).length;
    }
    let no_200 = getLineCount(res[200])
    if (no_200 !== 0) {no_200-=1}
    let no_404 = getLineCount(res[404])
    let no_500 = getLineCount(res[500])

    if (no_404 !== 0) {no_404-=1}
    if (no_500 !== 0) {no_500-=1}
    // console.log(no_200)
    // console.log(res)
    // let no_200 = 1
    // let no_404 = 1
    // let no_500 = 0

    const req_200 = () => {
        setShow200(!show200)
        setShow404(false)
        setShow500(false)
        // navigate('/detailed',{state:res[200]})
    }

    const req_404 = () => {
        setShow404(!show404)
        setShow200(false)
        setShow500(false)

    }

    const req_500 = () => {
        setShow500(!show500)
        setShow404(false)
        setShow200(false)
    }
    return(
        <div className="fill_bottom">
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
                </tr>
            </table>
            
            <Link to={'/'}><button>Go Home</button></Link>
        </div>
        {show200 || show404 || show500 ?  <div id='all_logs_for_status'>
        {show200 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 200</h4>{res[200]}</div>:<></>}
        {show404 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 404</h4>{res[404]}</div>:<></>}       
        {show500 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 500</h4>{res[500]}</div>:<></>} </div>: null}
        {/* <div id='all_logs_for_today'>
        {show200 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 200</h4>{res[200]}</div>:<></>}
        {show404 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 404</h4>{res[404]}</div>:<></>}       
        {show500 ? <div style={{whiteSpace:"pre-wrap"}}><h4>Requests with status code: 500</h4>{res[500]}</div>:<></>}       

    </div> */}
    </div>
    )
}