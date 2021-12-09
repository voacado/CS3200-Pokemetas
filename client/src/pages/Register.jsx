import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterBox from '../components/login_and_register/RegisterBox';

/**
 * Login page
 * @param props Properties passed from parent component
 */
function Register(props) {

    if (!props.token) {
        return <RegisterBox setToken={props.setToken} />
    }

    return <Navigate to='/home' />
    
}

export default Register;