import React, { useState } from 'react';
import LoginBox from '../components/login/LoginBox';
import useToken from '../components/hooks/useToken';

function MyTeams(props) {
    const {token, setToken} = useToken();

    if(!token) {
        return <LoginBox setToken={setToken} />
      }

    return (
        <h1>Teams</h1>
    );
}

export default MyTeams;