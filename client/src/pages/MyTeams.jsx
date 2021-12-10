import React from 'react';
import LoginBox from '../components/login_and_register/LoginBox';

function MyTeams(props) {
    // If user is not signed in, prompt the user to sign-in
    if(!props.token) {
        return <LoginBox setToken={props.setToken} />
    }

    return (
        <h1>My Teams</h1>
    );
}

export default MyTeams;