import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormBox from '../components/form/FormBox';

/**
 * Login page
 * @param props Properties passed from parent component
 */
function Register(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // subfunction to handle register submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const element = document.getElementById("message");
        if (username.length > 100 || password.length > 50) {
          element.innerHTML =  "Username must be 100 or less character and password must be 50 or less characters.";
          setTimeout(() => { element.innerHTML =  ""; }, 2000);
          return;
        }
        const data = await registerUser(username, password);
        if (data.registered) {
            element.innerHTML = data.message;
            setTimeout(() => { props.setToken(data.token) }, 2000);
        } else {
            element.innerHTML =  data.message;
            setTimeout(() => { element.innerHTML =  ""; }, 2000);
        }
    }

    // before registration we show registration box
    if (!props.token) {
        return <FormBox title='Register' 
        setToken={props.setToken} 
        handleSubmit={handleSubmit} 
        topName="Username"
        bottomName="Password"
        topType="text"
        bottomType="password"
        setTop={setUserName} 
        setBottom={setPassword}/>
    }

    // afterwards we redirect to homepage
    return <Navigate to='/home' />
    
}

/**
  * Async function call to backend API repsonsible for registering.
  * @param {String} username 
  * @param {String} password 
  */
 async function registerUser(username, password) {
    let link = "";
    if (window.location.port) {
      link = `http://${window.location.hostname}:${window.location.port}/api/register`
    } else {
      link =`https://${window.location.hostname}/api/register`
    }

    return fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          console.log(data);
        }
      })
    }

export default Register;