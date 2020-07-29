import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const UpdateUser = () => {
    const { userToUpdate, setUserToUpdate } = useContext(UserContext);
    const history = useHistory();

    const handleChange = e => {
        setUserToUpdate({...userToUpdate, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/auth/users/${userToUpdate.id}`, userToUpdate)
            .then(res => {
                history.push(`/userList`)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2> Update User Profile Information Below:</h2>
            <p>Please edit username:</p>
            <input 
                type="text"
                name="username"
                placeholder="Update username"
                onChange={handleChange}
                value={userToUpdate.username}
            />
            <p>Please edit password:</p>
            <input
                type="password"
                name="password"
                placeholder="Update password"
                onChange={handleChange}
                value={userToUpdate.password}
            />
            {/* <p>Please edit role if needed:</p>
            <select name='role' value={userToUpdate.role} onChange={handleChange}>
                <option disabled value=''>Edit Role</option>
                <option value='user'>User</option>
                <option value='creator'>Creator</option>
            </select> */}
            <div>
                <button style={{margin: '2%', padding: '1%', background: 'lightseagreen', color: 'white'}}>Update user profile</button>
            </div>
        </form>
        </div>
    )
};

export default UpdateUser;