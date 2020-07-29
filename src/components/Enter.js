import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from "axios";
import * as yup from "yup";
import formSchemaLogin from "../validation/formSchemaLogin";
import styled from 'styled-components'

const StyledLogin = styled.form`
border: 2px solid black;
border-radius: 2%;
padding-bottom: 45px;
margin: 0 35%;
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
font-family: Arial, Helvetica, sans-serif;

h1 {
  font-size: 3 rem;
  text-align: center;
}

#loginBtn {
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
}
`

const initialFormValues = {
  username: "", // input text field
  password: "", // input text field
};

const initialFormErrors = {
  username: "", // input text field
  password: "", // input text field
};

const initialDisabled = true;

const Enter = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const { push } = useHistory();
  const { setUser } = useContext(UserContext);

  const onSubmit = (evt) => {
    evt.preventDefault();
    const loginUser = {
      username: formValues.username.trim(),
      password: formValues.password,
    }
    console.log(loginUser)

    axios
        .post('https://how-to-backend.herokuapp.com/api/auth/login',loginUser)
        .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            push('/dashboard');
        })
        .catch(err => {
            console.log(err.response);
        })
  }

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    yup
      .reach(formSchemaLogin, name)

      .validate(value)

      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <StyledLogin className="formContainer" onSubmit={onSubmit}>
      
      <h1>Login</h1>
      <div id="EnterInputs" className="input-boxes">

​
        <div id="usernameInput" className="input-box">
          <label>
            Username:&nbsp;
            <input
                        value={formValues.username}
                        onChange={onInputChange}
                        name='username'
                        type='text'
                        id='username'
                    />
          </label>
          <p id="usererror-username">{formErrors.username}</p>
        </div>
​
        <div id="passwordInput" className="input-box">
          <label>
            Password:&nbsp;
            <input
                        value={formValues.password}
                        onChange={onInputChange}
                        name='password'
                        type='password'
                        id='password'
                    />
          </label>
          <p id="usererror-password">{formErrors.password}</p>
        </div>
        <button id="loginBtn">
          Login
        </button>
      </div>
    </StyledLogin>
  );
};
export default Enter