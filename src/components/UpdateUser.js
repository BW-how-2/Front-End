import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    border: 1px solid black;
    background-color: white;
    margin: 3%;
    padding: 1%;
    border-radius: 5px;

    &:hover{
        background-color: #FCA311;
        color: white;
    }
`;

const StyledDiv = styled.div`
    height: 60vh;
    padding-top: 100px;
`;

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
        <StyledDiv>
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
                <Button>Update user profile</Button>
            </div>
        </form>
        </StyledDiv>
    )
};

export default UpdateUser;