import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Crud from './components/Crud'

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import NoteDetails from './components/NoteDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/crud' component={Crud} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/signup' component={SignUp} />
          <Route path='/notes/:noteId' component={NoteDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
