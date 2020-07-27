import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <h1>How To</h1>
      <User />
    </div>
  );
}

export default App;
