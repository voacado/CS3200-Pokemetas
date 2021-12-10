import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Div,
    H1,
    P,
    Form,
    Input,
    Button,
  } from './FormBoxStyle';

/**
  * Async function call to backend API repsonsible for logging in.
  * @param {String} username 
  * @param {String} password 
  */
 async function loginUser(username, password) {
  let link = "";
  if (window.location.port) {
    link = `http://${window.location.hostname}:${window.location.port}/api/login`
  } else {
    link =`https://${window.location.hostname}/api/login`
  }

  return fetch(link, {
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
export default function LoginBox(props) {
  // useState keeps track of changes to username and password and stores them in the vars
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // subfunction to handle login submission
  const handleSubmit = async (e) => {
      e.preventDefault();
      const element = document.getElementById("message");
      if (username.length > 100 || password.length > 50) {
        element.innerHTML =  "Username must be 100 or less character and password must be 50 or less characters.";
        setTimeout(() => { element.innerHTML =  ""; }, 2000);
      }
      const data = await loginUser(username, password);
      if (data.auth) {
        element.innerHTML = "Logged in.";
        setTimeout(() => { props.setToken(data.token) }, 2000);
      } else {
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
        <Button id="submit">Log In</Button>
    </Form>
    </Div>
  );
}

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired
}
