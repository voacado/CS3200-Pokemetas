import React from 'react';
import LoginBox from '../components/login_and_register/LoginBox';
<<<<<<< HEAD
=======
import useToken from '../hooks/useToken';
import TeamsList from '../components/teams_list/TeamsList';
>>>>>>> 2c5d66984a6723839adb042e9221ff6a682688e7

function MyTeams(props) {
    // If user is not signed in, prompt the user to sign-in
    if(!props.token) {
        return <LoginBox setToken={props.setToken} />
    }

    return (
        <div>
            <h1>My Teams</h1>
            <TeamsList />
        </div>
    );
}

export default MyTeams;