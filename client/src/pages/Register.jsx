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
        const data = await registerUser(username, password);
        const element = document.getElementById("message");
        if (data.registered) {
            element.innerHTML = data.message;
            setTimeout(() => { props.setToken(data.token) }, 2000);
        } else {
            element.innerHTML =  data.message;
            setTimeout(() => { element.innerHTML =  ""; }, 2000);
        }
    }

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

    return <Navigate to='/home' />
    
}

/**
  * Async function call to backend API repsonsible for registering.
  * @param {String} username 
  * @param {String} password 
  */
 async function registerUser(username, password) {
    let port = "";
    if (window.location.port) {
      port = `:${window.location.port}`
    } 
  
    return fetch(`http://${window.location.hostname}${port}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(data => data.json())
    }

export default Register;