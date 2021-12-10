import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Going to this page will log you out and redirect to homepage.
 * 
 * @param props arguments passed by parent component
 */
export default function Logout(props) {
    // deletes cookie and forces component rerender 
    document.cookie = 'accessToken=; Max-Age=-99999999;';  
    props.setToken(props.token);
    return (
        <Navigate to='/home'/>
    )
}