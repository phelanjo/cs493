import React from 'react';
import firebase from './config/firebaseConfig'

function App() {
  window.onload = () => {
    let googleLogin = document.getElementById('googleLogin');

    let signOut = document.getElementById('signOut')

    googleLogin.addEventListener('click', () => {
      var googleProvider = new firebase.auth.GoogleAuthProvider()
  
      firebase.auth().signInWithPopup(googleProvider).then((result) => {
        var user = result.user;
        console.log(user)
      }).catch((err) => {
        console.log(err)
      })
    })

    signOut.addEventListener('click', (e) => {
      firebase.auth().signOut()
        .then(() => {
          console.log('user signed out successfully')
        })
        .catch(err => {
          console.log(err)
        })
    }, false)
  }

  return (
    <div className="container center App">
        <div>
          <button className="btn red" id="googleLogin">Google Sign In</button>
        </div>
        <br />
        <div>
          <button className="btn red" id="signOut">Sign Out</button>
        </div>
    </div>
  );
}

export default App;
