import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
