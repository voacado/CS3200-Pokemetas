import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginBox from '../components/form/LoginBox';

/**
 * Login page that redirects to homepage after login.
 * 
 * @param props Properties passed from parent component
 */
function Login(props) {
    if (!props.token) {
        return <LoginBox setToken={props.setToken} />
    }

    return <Navigate to='/home' />
    
}

export default Login;