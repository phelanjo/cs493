import React from 'react';
import firebase from './config/firebaseConfig'

function App() {
  window.onload = () => {
    let googleLogin = document.getElementById('googleLogin');

    googleLogin.addEventListener('click', () => {
      var googleProvider = new firebase.auth.GoogleAuthProvider()
  
      firebase.auth().signInWithPopup(googleProvider).then((result) => {
        var user = result.user;
        console.log(user)
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  return (
    <div className="container center App">
        <div>
          <button className="btn red" id="googleLogin">Google Sign In</button>
        </div>
    </div>
  );
}

export default App;
