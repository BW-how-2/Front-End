import React, { useState } from "react";
// import axios from "axios";
import * as yup from "yup";
import formSchemaLogin from "../validation/formSchemaLogin";

const initialFormValues = {
  username: "", // input text field
  password: "", // input text field
};

const initialFormErrors = {
  username: "", // input text field
  password: "", // input text field
};

const initialDisabled = true;

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const onSubmit = (evt) => {
    evt.preventDefault();
    const loginUser = {
      username: formValues.username.trim(),
      password: formValues.password,
    }
    console.log(loginUser)
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
    <form className="form container" onSubmit={onSubmit}>
      <h1>Login</h1>
      <div id="loginInputs" className="input-boxes">
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
                        name='name'
                        type='password'
                        id='password'
                    />
          </label>
          <p id="usererror-password">{formErrors.password}</p>
        </div>
        <button id="loginBtn" disabled={disabled}>
          Login
        </button>
      </div>
    </form>
  );
};
export default Login