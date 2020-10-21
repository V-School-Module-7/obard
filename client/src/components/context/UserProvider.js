import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    errMsg: ''
  };

  const [userState, setUserState] = useState(initState);

  const signup = credentails => {
    axios.post('http://localhost:3623/auth/signup', credentails)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUserState(prevUserState => ({
          ...prevUserState,
          user, 
          token
        }));
      })
      .catch(err => {
        if (err.response) {
          handleAuthErr(err.response.data.errMsg);
          console.error(err);
      }
    });
  };

  const login = credentails => {
    axios.post('http://localhost:3623/auth/login', credentails)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUserState(prevUserState => ({
          ...prevUserState,
          user, 
          token
        }));
      })
      .catch(err => {
        if (err.response) {
          handleAuthErr(err.response.data.errMsg);
          console.error(err);
      }
    });
  };

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUserState(prevUserState => ({
    ...prevUserState,
    user: '',
    token: ''
  }))
  alert("You've logged out successfully!")
};

  const handleAuthErr = errMsg => {
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg
    }))
  };

  const resetAuthErr = () => {
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg: ''
    }))
  };

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthErr
      }}
        >
        { children }
    </UserContext.Provider>
  );
};