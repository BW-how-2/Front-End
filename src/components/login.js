import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import loginFormSchema from '../validation/loginFormSchema'

const initialFormValues = {
  username: '', // input text field
  password:'', // input text field
}
  
const initialFormErrors = {
  username: '', // input text field
  password:'', // input text field
}
  
const initialForm = []
const initialDisabled = true

const Login = () => {
  
  const [user, setUser] = useState(initialForm)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled) 

  const postUser = (user) => {
    const existingUser = {
      username: formValues.username,
      password:formValues.password,
    }

    axios.post('https://how-to-backend.herokuapp.com/api/auth/login', existingUser)
    .then(res => {
      console.log(res.data);
      setUser([res.data])
      setFormValues(initialFormValues)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const inputChange = (name, value) => {
    yup
      .reach(loginFormSchema, name)

      .validate(value)

      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
        [name]: isChecked
      })
  }

  const submit = () => {
    const newUser = {
      username: formValues.username.trim(), 
      password:formValues.password.trim(),
    }
    postUser(newUser)
  }

  useEffect(() => {
    loginFormSchema.isValid(formValues).then(valid =>{
      setDisabled(!valid)
    })
  }, [formValues])

  

    return (
        <form className='form container' onSubmit={onSubmit}>
          <h1>Login</h1>
          <div id='loginInputs' className='input-boxes'>
            <p>logo icon goes here</p>

            <div id='usernameInput'className='input-box'>
                <label>Username:&nbsp;
                    <input
                        value={values.username}
                        onChange={onInputChange}
                        name='username'
                        type='text'
                        id='username'
                    />
                </label>
                <p id='usererror-username'>{errors.username}</p>
                </div>

                <div id='passwordInput'className='input-box'>
                <label>Password:&nbsp;
                    <input
                        value={values.password}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                        id='password'
                    />
                </label>
                <p id='usererror-password'>{errors.password}</p>
                </div>
            <button id="loginBtn" disabled={disabled}>Login</button>
          </div>
        </form>
    )
}
export default Login