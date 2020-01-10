import React from 'react';

import SignOutButton from './components/SignOutButton'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="container center App">
      <SignIn />

      <br /><br /><br />

      <br />

      <SignOutButton />

      <br /> <br />

      <SignUp />
      
    </div>
  );
}

export default App;
