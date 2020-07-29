import React, { useEffect, useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

//This component will return a list of all users. 
// .get ..... /api/auth/users

//Client will have the ability to edit their user info 
// .put ..... /api/auth/users/:id

//Client will have the ability to delete their user info
// .delete ..... 	/api/auth/users/:id


const initialValues = {
    username: "",
    password: "",
    role: ""
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { user, setUserToUpdate } = useContext(UserContext);
    const [addUser, setAddUser] = useState(initialValues);
    const history = useHistory();

    useEffect(() => {
        axiosWithAuth()
        .get('/api/auth/users')
        .then(res => {
            console.log(res.data);
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleChange = e => {
        setAddUser({...addUser,  [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            ...addUser,
            role: addUser.role === 'creator' ? 2 : 1
        }
        axiosWithAuth()
        .post("/api/auth/register", newUser)
        .then(res => {
            setUsers([...users, res.data.data])
            history.push('/userList')
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleEdit = (user) => () => {
        setUserToUpdate(user);
        history.push('/updateUserProfile');
    }


    const deleteUser = (id) => {
        axiosWithAuth()
        .delete(`/api/auth/users/${id}`)
        .then(() => {
            setUsers(users.filter(user => {
            if (user.id === id) {
                return false
            } else {
                return true
            }
            }))
            history.push(`/userList`)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div>
            <h1>Welcome back, {user.username}!</h1>
            <h2>Add New User </h2>
            <form onSubmit={handleSubmit}>
                <p>Please enter a username</p>
                <input
                type="text"
                name="username"
                placeholder="Username..."
                value={addUser.username}
                onChange={handleChange}
                />
                <p>Please enter a password</p>
                <input
                type="password"
                name="password"
                placeholder="Password..."
                value={addUser.password}
                onChange={handleChange}
                />
                <p>Please select a role:</p>
                <select name='role' value={addUser.role} onChange={handleChange}>
                    <option disabled value=''>Select Role</option>
                    <option value='user'>User</option>
                    <option value='creator'>Creator</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <h2>List of All Users</h2>
            <div>
                {users.map(user => {
                    return (
                        <div className="user-profile" key={user.id}>
                            <h3>Userame: {user.username}</h3>
                            <p>Role:{user.role}</p>
                            <button onClick={handleEdit(user)}>Edit</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserList;

