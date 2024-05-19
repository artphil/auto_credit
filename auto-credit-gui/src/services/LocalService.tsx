import { useState } from "react";

function LocalService() {

  const [token, setToken] = useState('');

  function getToken() {
    if (token) {
      return token;
    } else {
      const savedToken = window.localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        return savedToken;
      }
    }
    return '';
  }

  function saveToken(value: string) {
    window.localStorage.setItem('token', value);
    setToken(value);
  }

  function removeToken() {
    window.localStorage.removeItem('token')
    setToken('');
  }

  return {
    getToken,
    saveToken,
    removeToken
  };
}

export default LocalService;