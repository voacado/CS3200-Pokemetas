import React, { useState } from 'react';
import LoginBox from '../components/login_and_register/LoginBox';
import useToken from '../hooks/useToken';

function MyTeams(props) {
    const {token, setToken} = useToken();

    // If user is not signed in, prompt the user to sign-in
    if(!token) {
        return <LoginBox setToken={setToken} />
    }

    return (
        <h1>My Teams</h1>
    );
}

export default MyTeams;