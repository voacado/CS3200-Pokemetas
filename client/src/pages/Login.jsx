import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginBox from '../components/login/LoginBox';
import useToken from '../hooks/useToken';

/**
 * Login page
 * @param {HTML attributes} props properties passed from parent components
 */
function Login(props) {
    const {token, setToken} = useToken();

    if (!token) {
        return <LoginBox setToken={setToken} />
    }

    return <Navigate to='/home' />
    
}

export default Login;