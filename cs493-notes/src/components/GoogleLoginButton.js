import React, { Component } from 'react';
import firebase from 'firebase/app'

class GoogleLoginButton extends Component {
  state = {
    user: {}
  }

  googleLogin = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(googleProvider).then((result) => {
      this.setState({
        user: result.user
      })
      console.log(this.state.user.email)
    }).catch((err) => {
      console.log(err)
    })
  }


  render() {
    return (
      <div>
        <button className="btn red" onClick={this.googleLogin}>Google Sign In</button>
      </div>
    )
  }
}

export default GoogleLoginButton