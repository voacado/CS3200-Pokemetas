import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavBtnLink } from '../components/navbar/NavbarStyle';
import Popup from '../components/popup/Popup';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/form/LoginBox';
import '../pages-css/Profile.css';

/**
 * Profile Page, shows name and allows you to change password and delete the account here.
 * 
 * @param props arguments passed by parent component
 */
export default function Profile(props) {
    const [name, setName] = useState();

    // gets the username of the logged in user and adds the name to the title
    const getName = async () => {
        const user = await fetchUsername();
        setName(`${capitalize(user.username)}'s Profile`);
    }

    // calls getName when component is rendered (otherwise would continously call)
    useEffect(() => {
      if (props.token) getName();
      });

    const navigate = useNavigate();
    
    // deletes the user and redirects to home if the delete Account button is pressed.
    const deleteAndRedirect = async () => { 
        await deleteUser();
        navigate('/home');
        props.setToken("")
      }
    
    if (!props.token) {
      return <LoginBox setToken={props.setToken} />
    }

    return (
        <div className='profile'>
        <h1 id='title'>{name}</h1>
        <ul className='sidewaysList'>
            <div className='profilePic'>
                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
            </div>
            <ul className='buttons'>
            <div className='button'>
                <NavBtnLink to='/change-password'>Change Password</NavBtnLink>
            </div>
            <div className='button'>
                <Popup 
                    title='Are You Sure You Want To Delete Your Account?' 
                    text='Delete Account'
                    text1='Yes'
                    text2='No'
                    onClickYes={deleteAndRedirect}></Popup>
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

// request to delete the current user
async function deleteUser() {
    let port = "";
    if (window.location.port) {
        port = `:${window.location.port}`
    } 

    return fetch(`http://${window.location.hostname}${port}/api/delete-user`, {
        method: 'DELETE'
    }).then(data => {
        if (data.ok) {
          return data.json();
        } else {
          console.log(data);
        }
      })
}

// request to fetch the username of the current user
async function fetchUsername() {
    let port = "";
    if (window.location.port) {
        port = `:${window.location.port}`
    } 

    return fetch(`http://${window.location.hostname}${port}/api/profile`, {
        method: 'GET'
    }).then(data => {
        if (data.ok) {
          return data.json();
        } else {
          console.log(data);
        }
      })
}
