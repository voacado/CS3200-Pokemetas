import React, { useState } from 'react';
import LoginBox from '../components/login_and_register/LoginBox';
import useToken from '../hooks/useToken';
import TeamsList from '../components/teams_list/TeamsList';

function MyTeams(props) {
    const {token, setToken} = useToken();

    // If user is not signed in, prompt the user to sign-in
    if(!token) {
        return <LoginBox setToken={setToken} />
    }

    return (
        <div>
            <h1>My Teams</h1>
            <TeamsList />
        </div>
    );
}

export default MyTeams;