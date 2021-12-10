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
async function registerUser(username, password) {
  return fetch(`https://${window.location.hostname}:${window.location.port}/api/register`, {
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
export default function RegisterBox( { setToken } ) {
  // useState keeps track of changes to username and password and stores them in the vars
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // subfunction to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(username, password);
    if (data.registered) {
      setToken(data.token);
    } else {
      const element = document.getElementById("message");
      element.innerHTML =  data.message;
      setTimeout(() => { element.innerHTML =  ""; }, 2000);
    }
  }

  return(
    <Div>
    <Form onSubmit={handleSubmit}>
        <H1>Register</H1>
        <P id="message"></P>
        <Input placeholder="Username" type="text" onChange={e => setUserName(e.target.value)} />
        <Input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <Button id="submit">Register</Button>
    </Form>
    </Div>
  );
}

RegisterBox.propTypes = {
  setToken: PropTypes.func.isRequired
}
