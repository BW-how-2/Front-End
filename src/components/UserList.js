import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


//This component will return a list of all users. 
// .get ..... /api/auth/users

//Client will have the ability to edit their user info 
// .put ..... /api/auth/users/:id

//Client will have the ability to delete their user info
// .delete ..... 	/api/auth/users/:id

//NOTES: 
// -- need to add .put
// -- need to add .delete


const UserList = () => {
    const [users, setUsers] = useState([]);

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
                            <button>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default UserList;

