import React from 'react';
import {
    LoginDiv,
    Form,
    Body,
    Input,
    Button,
  } from './LoginStyle';

const Login = () => {
  return(
    <Body>
    <LoginDiv>
    <h1>Log In</h1>
    <Form autocomplete="off">
        <Input placeholder="Username" type="text" id="username"></Input>
        <Input placeholder="Password" type="password" id="password"></Input>
        <Button id="submit">Login</Button>
    </Form>
    </LoginDiv>
    </Body>
  );
};

export default Login;