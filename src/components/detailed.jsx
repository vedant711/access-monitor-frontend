import axios from "axios";
import React, { Component,useEffect,useState } from "react";
import {useLocation,Link, useNavigate} from 'react-router-dom';
import { API_URL } from "../constants";
import Loader from "./loader";

export default function Detailed() {
    let location = new useLocation();
    // let history = new useHistory();
    const navigate = useNavigate();
    const [res,setRes] = useState([])
    const [isLoading,setLoading] = useState(true)
    // let res = location.state.response
    let server = location.state.server
    let filter = location.state.filter
    let code = location.state.code

    useEffect(()=>{
        axios.post(API_URL+server+'/show-detailed/', {'filter':filter,'code':code}).then((response)=>{
            setRes(response.data.data[0])
            console.log(response.data.data)
            if(res!==undefined && res!==[]){setLoading(false)}
        })
    },[]);
    // console.log(res)

    // let goBack = () => {
    //     history.goBack()
    // }
    return (
        <div id='all_logs_for_today'>
        {isLoading? <Loader/>:
        <div id='all_logs_for_today' style={{whiteSpace:"pre-wrap"}}>{res}
        <center><button onClick={()=>navigate(-1)}>Go Back</button></center>
        </div>}
        </div>
        // {console.log(res)}
    )
}