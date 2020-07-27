import React, { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

import PrivateRoute from './components/PrivateRoute';
import Creator from './components/Creator';
import './App.scss';

import Login from './components/login'

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <h1>How To</h1>
        <Link to='/login'>Login</Link>

        <Switch>
          
          <PrivateRoute path='/dashboard/creator' component={Creator} />

          <Route exact path='/'>
            <Redirect to='/dashboard' />
          </Route>

          <Route path="/login">
            <Login user={user}/>
          </Route>

        </Switch>
      </div>
    </UserContext.Provider>

  );
}

export default App;
