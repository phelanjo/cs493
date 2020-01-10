import React from 'react';
import firebase from './config/firebaseConfig'

import GoogleLoginButton from './components/GoogleLoginButton'
import SignOutButton from './components/SignOutButton'
import SignIn from './components/SignIn'

function App() {
  window.onload = () => {
    let signup = document.getElementById('signup')

    signup.addEventListener('click', (e) => {
      let signUpEmail = document.getElementById('signUpEmail').value
      let signUpPassword = document.getElementById('signUpPassword').value

      firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then(user => {
          console.log(user)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  return (
    <div className="container center App">
      <SignIn />

      <br /><br /><br />

      <GoogleLoginButton />

      <br />

      <SignOutButton />

      <br /> <br />

      <div>
        <form id="signUp">
          <label htmlFor="email">Sign Up Email</label>
          <input type="email" id="signUpEmail"/>
          <label htmlFor="password">Sign Up Password</label>
          <input type="password" id="signUpPassword"/>
        </form>
        <button className="btn green" id="signup">Sign Up</button>
      </div>
      
    </div>
  );
}

export default App;
