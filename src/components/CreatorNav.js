import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledCreatorNav = styled.div`
    display: flex;
    justify-content: space-evenly;

    a {
        color: inherit;
    }
`

const CreatorNav = () => {
    return (
        <StyledCreatorNav>
            <NavLink to='/dashboard' activeClassName='active'>User Dashboard</NavLink>
            <NavLink to='/dashboard/creator' activeClassName='active'>Creator Dashboard</NavLink>
            <NavLink to='/userList' activeClassName='active'>Users</NavLink>
        </StyledCreatorNav>
    )
}

export default CreatorNav;