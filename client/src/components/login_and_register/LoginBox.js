import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Div,
    H1,
    P,
    Form,
    Input,
    Button,
  } from './LAndRBoxStyle';

/**
  * Async function call to backend API repsonsible for logging in.
  * @param {String} username 
  * @param {String} password 
  */
async function loginUser(username, password) {
  console.log(`${window.location.hostname}:${window.location.port}`)
  return fetch(`http://${window.location.hostname}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(data => data.json())
  }

  /**
   * Login box component
   * @param {*} { setToken }
   */
export default function LoginBox( { setToken } ) {
  // useState keeps track of changes to username and password and stores them in the vars
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // subfunction to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);
    if (data.auth) {
      setToken(data.token);
    } else {
      const element = document.getElementById("message");
      element.innerHTML =  "Username and/or password is incorrect.";
      setTimeout(() => { element.innerHTML =  ""; }, 2000);
    }
  }

  return(
    <Div>
    <Form onSubmit={handleSubmit}>
        <H1>Log In</H1>
        <P id="message"></P>
        <Input placeholder="Username" type="text" onChange={e => setUserName(e.target.value)} />
        <Input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <Button id="submit">Login</Button>
    </Form>
    </Div>
  );
}

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired
}