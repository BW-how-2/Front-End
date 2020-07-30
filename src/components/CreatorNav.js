import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledCreatorNav = styled.div`
    display: flex;
    justify-content: space-evenly;
<<<<<<< HEAD
    padding: 1% 0;
=======
    margin: 15px auto;
>>>>>>> 7018c3cd8c2df4fa9b68869e98c1a9c1d634eff2

    a {
        color: inherit;
        text-decoration: none;
    }

    .nav-link {
        background-color: white;
        border: 1px solid white;
        padding: 5px 10px;
        border-radius: 10px;
        color: black;
        box-shadow: 0 1.5px 5px lightgrey;
        font-weight: 500;
        text-decoration: none;
        letter-spacing: 2px;
        font-size: 14px;
    }
`

const CreatorNav = () => {
    return (
        <StyledCreatorNav>
            <NavLink className='nav-link' to='/dashboard'>User Dashboard</NavLink>
            <NavLink className='nav-link' to='/dashboard/creator'>Creator Dashboard</NavLink>
            <NavLink className='nav-link' to='/userList'>Users</NavLink>
        </StyledCreatorNav>
    )
}

export default CreatorNav;