import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

import PrivateRoute from './components/PrivateRoute';
import Creator from './components/Creator';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <h1>How To</h1>
        <Switch>
          <PrivateRoute path='/dashboard/creator' component={Creator} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
