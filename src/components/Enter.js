import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from "axios";
import * as yup from "yup";
import formSchemaEnter from "../validation/formSchemaEnter";

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
    const EnterUser = {
      username: formValues.username.trim(),
      password: formValues.password,
    }
    console.log(EnterUser)
    axios
        .post('https://how-to-backend.herokuapp.com/api/auth/Enter', EnterUser)
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
      .reach(formSchemaEnter, name)

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
    <form className="form container" onSubmit={onSubmit}>
      <h1>Enter</h1>
      <div id="EnterInputs" className="input-boxes">
        <p>logo icon goes here</p>

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
        <button id="EnterBtn">
          Enter
        </button>
      </div>
    </form>
  );
};
export default Enter; 