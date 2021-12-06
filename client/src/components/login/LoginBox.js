import React from 'react';
import {
    LoginDiv,
    H1,
    Form,
    Body,
    Input,
    Button,
  } from './LoginBoxStyle';

const LoginBox = () => {
  return(
    <Body>
    <LoginDiv>
    <Form autocomplete="off">
        <H1>Log In</H1>
        <Input placeholder="Username" type="text" id="username"></Input>
        <Input placeholder="Password" type="password" id="password"></Input>
        <Button id="submit">Login</Button>
    </Form>
    </LoginDiv>
    </Body>
  );
};

export default LoginBox;