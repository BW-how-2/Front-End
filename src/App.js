import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { HowToContext } from './contexts/HowToContext';
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from './components/PrivateRoute';
import PrivateCreatorRoute from './components/PrivateCreatorRoute';
import Creator from './components/Creator';
import User from './components/User';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HowToPage from './components/HowToPage'
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import './App.scss'; 
import styled from 'styled-components'
import HowToLogo from './components/HowToLogo.png'

const StyledApp = styled.div`
font-family: 'Khand', sans-serif;
display:flex;
flex-direction: column;
line-height:30px;

img{
  width: 200px;
}

/* nav {
  border: 1px solid grey;
} */

`

const setInitialUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
}

function App() {
  const [user, setUser] = useState(setInitialUser());
  const [howTos, setHowTos] = useState([]);

  const [userToUpdate, setUserToUpdate] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get('/api/auth/howto')
      .then(res => {
        setHowTos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, userToUpdate, setUserToUpdate }}>
      <HowToContext.Provider value={{ howTos, setHowTos }}>
        <StyledApp className='App'>
          <header>
            <div>
              <img id='HowToLogo' src={HowToLogo} alt='Logo'/>
            </div>
            <div>
              <nav>
              <Link to='/login'>Login</Link>
              </nav>
            </div>
          </header>
          
          <Switch>
          
            <PrivateCreatorRoute path='/dashboard/creator' component={Creator} />
            <PrivateRoute path='/dashboard' component={User} />
            <PrivateCreatorRoute path='/userList' component={UserList} />
            <PrivateCreatorRoute path='/updateUserProfile' component={UpdateUser} />

            <Route path='/howtos/:howtoID'>
              <HowToPage />
            </Route>
​
            <Route path="/login">
              <Login user={user}/>
            </Route>
​
            <Route exact path='/signup'>
              <SignUp />
            </Route>
​
            <Route exact path='/'>
              <Redirect to='/dashboard' />
            </Route>
​
          </Switch>

        </StyledApp>
      </HowToContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
