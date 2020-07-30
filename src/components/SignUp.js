import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios' 
import {UserContext} from '../contexts/UserContext'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'

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
            if(user.role === 2) {
                history.push('/dashboard/creator')
            }
            else{
                history.push('/dashboard')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Please Register</h1>
                <p> Please type a username:</p>
                <p className='error'>{errors.username}</p>
                <input id='username' name='username' value={signUp.username} onChange={handleChange}></input> 

                <p>Please type a password:</p>
                <p className='error'>{errors.password}</p>
                <input type='password' id='password' name='password' value={signUp.password} onChange={handleChange}></input>

                <p>Please select a role:</p>
                <select value={signUp.role} onChange={handleChange} name='role'>
                    <option disabled value=''>Select Role</option>
                    <option value='user'>User</option>
                    <option value='creator'>Creator</option>
                </select>

                <br></br>

                <button onClick={handleSubmit}>Submit</button>
        </form>
    )
} 