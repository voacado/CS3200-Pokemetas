import { useState } from 'react';

/**
 * Custom hook to get and set the JWT token and rerender any related components on setting.
 */
export default function useToken() {
  const getToken = () => {
    const name = "accessToken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return "";
  };

  const [token, setToken] = useState(getToken());

  const saveToken = () => {
    setToken(getToken());
  };

  return {
    setToken: saveToken,
    token
  }
}