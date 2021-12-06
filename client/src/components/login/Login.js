import React from 'react';
import {
    LoginDiv,
    Form,
  } from './LoginStyle';

const Login = () => {
  return(
    <LoginDiv>
    <Form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
    </LoginDiv>
  );
};

export default Login;