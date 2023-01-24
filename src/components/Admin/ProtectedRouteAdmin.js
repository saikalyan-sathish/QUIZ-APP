import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

const ProtectedRouteAdmin = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('login');
        if(!login){
            navigate('/AdminAuth');
        }
        else{
            navigate('/AdminDash');
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default ProtectedRouteAdmin

