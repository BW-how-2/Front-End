import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link, useHistory } from 'react-router-dom';

const initialFormValues = {
    username: "",
    password: "",
    role: 1
}

const User = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    //const [newUser, setNewUser] = useState(initialFormValues)
    const { push } = useHistory();

    const postNewUser = newUser => {
        axios
            .post("/api/auth/register", newUser)
            .then(res => {
                console.log(res.data);
                push('/');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = e => {
        e.preventDefault();
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()

        const newUser = {
            username: formValues['username'],
            password: formValues['password'],
            role: 1
        }
        postNewUser(newUser)
    }

    return (
        <div>
            <h2>User Page</h2>
            <form onSubmit={onSubmit}>
                <h4>Log in as user:</h4>
                <input
                    type="text" 
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Type a username..."
                />
                <input 
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Type a password..."
                />
                <button>Submit</button>
            </form>
            <div>
                <h4>Already have an account?</h4>
                <Link to="/">
                    <button>Login</button>
                </Link>
            </div>
            
        </div>
    )
};

export default User;