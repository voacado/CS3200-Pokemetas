import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavBtn, NavBtnLink } from '../components/navbar/NavbarStyle';
import '../pages-css/Profile.css';

export default function Profile(props) {
    return (
        <div className='profile'>
        <h1>Profile</h1>
        <ul className='sidewaysList'>
            <ProfilePic />
            <ul className='buttons'>
                <Button className='button' link='/home' text='Change Password'></Button>
                <Button className='button' link='/home' text='Delete Account'></Button>
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
        <NavBtn>
            <NavBtnLink to={props.link}>{props.text}</NavBtnLink>
        </NavBtn>
    )
}
