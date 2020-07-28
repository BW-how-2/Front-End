import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useParams, useHistory } from 'react-router-dom';


//This component will return a list of all users. 
// .get ..... /api/auth/users

//Client will have the ability to edit their user info 
// .put ..... /api/auth/users/:id

//Client will have the ability to delete their user info
// .delete ..... 	/api/auth/users/:id

//NOTES: 
// -- need to add .put
// -- need to make sure .delete is working once back end problem is resolved
// add PrivateCreatorRoute to app.js route

const UserList = () => {
    const [users, setUsers] = useState([]);
    const params = useParams();
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

    const deleteUser = e => {
        e.preventDefault()
        axiosWithAuth()
        .delete(`/api/auth/users/${params.id}`)
        .then(res => {
            console.log(res)
            history.push(`/userList`)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div>
            <h2>List of All Users</h2>
            <div>
                {users.map(user => {
                    return (
                        <div className="user-profile" key={user.id}>
                            <h3>{user.username}</h3>
                            <p>{user.password}</p>
                            <p>{user.role}</p>
                            <button>Edit</button>
                            <button onClick={deleteUser}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserList;

