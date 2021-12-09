import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout(props) { 
    document.cookie = 'accessToken=; Max-Age=-99999999;';  
    props.setToken(props.token);
    return (
        <Navigate to='/home'/>
    )
}