import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavBtn, NavBtnLink } from '../components/navbar/NavbarStyle';
import '../pages-css/Profile.css';

export default function Profile() {

    const getName = async e => {
        e.preventDefault();
        return fetchUsername();
    }

    return (
        <div className='profile'>
        <h1>{getName}'s Profile</h1>
        <ul className='sidewaysList'>
            <ProfilePic />
            <ul className='buttons'>
                <Button link='/change-password' text='Change Password'></Button>
                <Button link='/home' text='Delete Account'></Button>
            </ul>
        </ul>
        </div>
    )
}

function ProfilePic() {
    return (
        <div className='profilePic'>
        <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
        </div>
    )
}

function Button(props) {
    return (
        <div className='button'>
        <NavBtn>
            <NavBtnLink to={props.link}>{props.text}</NavBtnLink>
        </NavBtn>
        </div>
    )
}

async function fetchUsername() {
    let port = "";
    if (window.location.port) {
        port = `:${window.location.port}`
    } 

    return fetch(`http://${window.location.hostname}${port}/api/profile`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}
