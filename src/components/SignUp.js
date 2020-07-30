import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios' 
import {UserContext} from '../contexts/UserContext'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import styled from 'styled-components'

const Instructions = styled.p`
   border: solid black 2px;
   width: 12%;
   margin-left: 44%;
   border-radius: 15px;
   background-color: #FCA311;
`

const Input = styled.input`
    background-color: lightgrey;
`

const Dropdown = styled.select`
    border: solid black 2px;
    width: 12%;
    margin-left: 15px;
    border-radius: 15px;
    background-color: lightgrey;
`

const Button = styled.button`
    margin-top: 2%;
    padding: 1% 2% 1% 2%;
    background-color: lightgrey;
    border-radius: 15px;
`

const initialForm={
    username: '',
    password: '',
    role: 'user'
}

const formSchema = Yup.object().shape({
    name: Yup
    .string()
    .min(2, 'Please use more characters')
    .required('Please use more characters'),
    password: Yup
    .string()
    .min(3, 'Please add your password')
    .required('Password is required'),
})


export default function SignUp(){

    const [signUp, setSignUp] = useState(initialForm)
    const [disable, setDisable] = useState([])
    const [errors, setErrors] = useState(initialForm)

    const {user, setUser} = useContext(UserContext)

    const history = useHistory()

    useEffect(() => {
        formSchema.isValid(signUp).then((valid) => {
            setDisable(!valid)
        })
    }, [signUp])

    const validForm = (e) => {
        Yup
        .reach(formSchema, 'name')
        .validate(e.target.value)
        .then(valid => {
            setErrors({...errors, [e.target.name]: ''})
        })
        .catch(err => setErrors({...errors, [e.target.name]: err.errors}))
    }

    const handleChange = (e) => {
        e.persist()
        setSignUp({...signUp, [e.target.name]: e.target.value})
        validForm(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            ...signUp, 
            role: signUp.role === 'creator' ? 2 : 1
        }
        Axios
        .post('https://how-to-backend.herokuapp.com/api/auth/register', newUser)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.data)
            localStorage.setItem('user', JSON.stringify(res.data.data))
            history.push('dashboard');
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
      <div className='form-container'>  
        <form onSubmit={handleSubmit}>
                <Instructions> Please type a username:</Instructions>
                <p className='error'>{errors.username}</p>
                <Input id='username' name='username' value={signUp.username} onChange={handleChange}></Input> 

                <Instructions> Please type a password</Instructions>
                <p className='error'>{errors.password}</p>
                <Input type='password' id='password' name='password' value={signUp.password} onChange={handleChange}></Input>

                    <Instructions>Please select a role:</Instructions>
                    <Dropdown value={signUp.role} onChange={handleChange} name='role'>
                        <option disabled value=''>Select Role</option>
                        <option value='user'>User</option>
                        <option value='creator'>Creator</option>
                    </Dropdown>

                    <br></br>

                    <Button onClick={handleSubmit}>Submit</Button>
            </form>
            <p>Already have an account? <span onClick={() => history.push('/login')} className='link'>Log in</span>!</p>
        </div>
    )
} 