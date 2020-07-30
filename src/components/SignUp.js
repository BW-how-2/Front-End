import React, { useState, useContext } from 'react'
import Axios from 'axios' 
import {UserContext} from '../contexts/UserContext'
import {useHistory} from 'react-router-dom'

const initialForm={
    username: '',
    password: '',
    role: ''
}



export default function SignUp(){

    const [signUp, setSignUp] = useState(initialForm)

    const {user, setUser} = useContext(UserContext)

    const history = useHistory()

    const handleChange = (e) => {
        setSignUp({...signUp, [e.target.name]: e.target.value})
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
        <div className='signup-container'>
            <form onSubmit={handleSubmit}>
                <h1>Please Register</h1>
                    <p> Please type a username:</p>
                    <input id='username' name='username' value={signUp.username} onChange={handleChange}></input> 

                    <p>Please type a password:</p>
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
            <p>Already have an account? <span onClick={() => history.push('/login')} className='link'>Log in</span>!</p>
        </div>
    )
} 