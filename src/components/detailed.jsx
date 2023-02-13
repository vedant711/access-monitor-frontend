import React, { Component,useState } from "react";
import {useLocation,Link, useNavigate} from 'react-router-dom';

export default function Detailed() {
    let location = new useLocation();
    // let history = new useHistory();
    const navigate = useNavigate();
    let res = location.state
    // console.log(res)

    // let goBack = () => {
    //     history.goBack()
    // }
    return (
        <div id='all_logs_for_today' style={{whiteSpace:"pre-wrap"}}>{res}
        <center><button onClick={()=>navigate(-1)}>Go Back</button></center>
        </div>
        // {console.log(res)}
    )
}