import React, { useState, useContext } from 'react';
import AuthForm from "./AuthForm";
import UserContext from '../context/UserProvider';

export default function Auth() {
  const initInputs = {
      username: '',
      password: '',
  };
  const [inputs, setInputs] = useState(initInputs);
  const [toggleAuth, setToggleAuth] = useState(false);

  const {
      signup,
      login,
      errMsg,
      resetAuthErr
  } = useContext(UserContext);

  const handleChange = e => {
      const { name, value } = e.target;
      setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
      }))
  };

  const handleSignup = e => {
      e.preventDefault();
      signup(inputs);
  };

  const handleLogin = e => {
      e.preventDefault();
      login(inputs);
  };

  const toggleForm = () => {
      setToggleAuth(prevToggleAuth => !prevToggleAuth)
      resetAuthErr();
  };

  return (
      <div className='auth-form'>
          <div className='form-container'>
          { 
          !toggleAuth ? 
          <>
              <AuthForm 
                  handleChange={handleChange}
                  handleSubmit={handleSignup}
                  inputs={inputs}
                  btnText='Signup'
                  errMsg={errMsg}
              />
              <span>Already have an account?</span>
              <button className='auth-toggle-button' onClick={toggleForm}>
                  Login
              </button>
          </>
         : 
          <>
              <AuthForm
                  handleChange={handleChange}
                  handleSubmit={handleLogin}
                  inputs={inputs}
                  btnText='Login'
                  errMsg={errMsg}
              />
              <span>New user?</span>
              <button className='auth-toggle-button' onClick={toggleForm}>
                  Signup
              </button>
          </>
          }
          </div>
      </div>
  );
};