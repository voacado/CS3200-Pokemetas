import React, { useState } from 'react';
import LoginBox from '../components/login/LoginBox';

function MyTeams(props) {
    const [token, setToken] = useState();

    if(!token) {
        return <LoginBox setToken={setToken} />
    }

    return (
        <h1>Teams</h1>
    );
};

export default MyTeams;