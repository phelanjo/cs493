import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignOutButton from './components/SignOutButton'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
