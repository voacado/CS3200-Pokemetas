import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavBtn, NavBtnLink } from '../components/navbar/NavbarStyle';
import '../pages-css/Profile.css';

/**
 * Profile Page
 */
export default function Profile() {
    const [name, setName] = useState();

    // gets the username of the logged in user and adds the name to the title
    const getName = async () => {
        const user = await fetchUsername();
        setName(`${capitalize(user.username)}'s Profile`);
    }

    // calls getName when component is rendered
    useEffect(() => {
        getName();
      });

    return (
        <div className='profile'>
        <h1 id='title'>{name}</h1>
        <ul className='sidewaysList'>
            <div className='profilePic'>
                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
            </div>
            <ul className='buttons'>
            <div className='button'>
            <NavBtn>
                <NavBtnLink to='/change-password'>Change Password</NavBtnLink>
            </NavBtn>
            </div>
            <div className='button'>
            <NavBtn>
                <NavBtnLink to='/home'>Delete Account</NavBtnLink>
            </NavBtn>
            </div>
            </ul>
        </ul>
        </div>
    )
}

// capitalizes every word in a string
function capitalize(string) {
    var reg = /\b([a-zÁ-ú]{3,})/g;
    return string.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1));
  }

async function fetchUsername() {
    let port = "";
    if (window.location.port) {
        port = `:${window.location.port}`
    } 

    return fetch(`http://${window.location.hostname}${port}/api/profile`, {
        method: 'GET'
    }).then(data => data.json());
}
