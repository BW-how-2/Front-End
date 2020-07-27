import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
<<<<<<< HEAD
import SignUp from './components/SignUp'
=======
import { HowToContext } from './contexts/HowToContext';
import { axiosWithAuth } from './utils/axiosWithAuth';
>>>>>>> d4d21e9249c05452c2c4f84f52f9e8de981a2a62

import PrivateRoute from './components/PrivateRoute';
import Creator from './components/Creator';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [howTos, setHowTos] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/api/auth/howto')
      .then(res => {
        console.log(res.data);
        setHowTos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HowToContext.Provider value={{ howTos, setHowTos }}>
        <div className="App">
          <h1>How To</h1>
          <Switch>
            
            <PrivateRoute path='/dashboard/creator' component={Creator} />
            
            <Route exact path='/'>
              <Redirect to='/dashboard' />
            </Route>

<<<<<<< HEAD
          <Route exact path='/signup'>
            <SignUp />
          </Route>

        </Switch>
      </div>
=======
          </Switch>
        </div>
      </HowToContext.Provider>
>>>>>>> d4d21e9249c05452c2c4f84f52f9e8de981a2a62
    </UserContext.Provider>
  );
}

export default App;
