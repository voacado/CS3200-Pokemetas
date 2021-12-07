import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    LoginDiv,
    H1,
    P,
    Form,
    Input,
    Button,
  } from './LoginBoxStyle';

  async function loginUser(username, password) {
    return fetch('http://localhost:3001/loginAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(data => data.json())
   }

export default function LoginBox( { setToken } ) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);

    if (data.auth) {
      setToken(data.token);
    } else {
      const element = document.getElementById("message");
      element.innerHTML =  "Username and/or password is incorrect.";
      setTimeout(() => { window.location.reload(false) }, 2000);
    }
  }

  return(
    <LoginDiv>
    <Form onSubmit={handleSubmit}>
        <H1>Log In</H1>
        <P id="message"></P>
        <Input placeholder="Username" type="text" onChange={e => setUserName(e.target.value)} />
        <Input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <Button id="submit">Login</Button>
    </Form>
    </LoginDiv>
  );
}

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired
}