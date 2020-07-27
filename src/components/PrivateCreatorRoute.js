import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateCreatorRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    return (
        <Route 
            {...rest}
            render={() => {
                if (user?.role === 2) {
                    return <Component />
                } else {
                    return <Redirect to='/login' />
                }
            }}
        />
    )
}

export default PrivateCreatorRoute;