import React, { useState } from 'react';
import LoginBox from '../components/login/LoginBox';
import useToken from '../components/hooks/useToken';

function Login(props) {
    const {token, setToken} = useToken();

    if (!token) {
        return <LoginBox setToken={setToken} />
    }

    return (
        <p>Logged In</p>
    );
}

export default Login;