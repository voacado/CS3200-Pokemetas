import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginBox from '../components/login_and_register/LoginBox';

/**
 * Login page
 * @param props Properties passed from parent component
 */
function Login(props) {
    if (!props.token) {
        return <LoginBox setToken={props.setToken} />
    }

    return <Navigate to='/home' />
    
}

export default Login;