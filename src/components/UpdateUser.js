import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useParams, useHistory } from 'react-router-dom';

const initialValues = {
    username: "",
    password: "",
    role: ""
};

const UpdateUser = () => {
    const { user, setUser } = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        axiosWithAuth()
        .put(`/api/auth/users/${params.id}`, user)
        .then(res => {
            console.log(res)
            setUser(res.data.data)
            history.push(`/users/${params.id}`)
        })
        .catch(err => {
            console.log(err.response)
        })
    })

    return (
        <div>

        </div>
    )
};

export default UpdateUser;