import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const name = "accessToken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return "undefined";
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}