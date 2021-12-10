import React from 'react';
import LoginBox from '../components/form/LoginBox';
import TeamsList from '../components/teams_list/TeamsList';

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