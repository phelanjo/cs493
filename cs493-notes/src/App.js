import React from 'react';
import firebase from './config/firebaseConfig'

import GoogleLoginButton from './components/GoogleLoginButton'
import SignOutButton from './components/SignOutButton'

function App() {
  window.onload = () => {
    let signIn = document.getElementById('login')
    let signup = document.getElementById('signup')

    signIn.addEventListener('click', () => {
      let email = document.getElementById('email').value
      let password = document.getElementById('password').value

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user)
        })
        .catch(err => {
          console.log(err)
        })
    }, false)

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

      <div>
        <form id="signIn">
          <label htmlFor="email">Email</label>
          <input type="email" id="email"/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password"/>
        </form>
        <button className="btn blue" id="login">Sign In</button>
      </div>

      <br />

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
